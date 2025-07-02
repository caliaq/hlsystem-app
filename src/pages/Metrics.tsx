import { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { orderService, OrderFilterParams } from '../services/orderService';
import { productService } from '../services/productService';
import { printerService } from '../services/printerService';
import { ProductMetric, MetricItem, DateFilter } from '../types/metrics';

export default function Metrics() {
  // Granularity control
  const [dateFilter, setDateFilter] = useState<DateFilter>('day');
  
  // Always visible date range controls
  const [startDate, setStartDate] = useState<string>(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1); // Default to last month
    return date.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<MetricItem[]>([]);
  const [productTotals, setProductTotals] = useState<Record<string, ProductMetric>>({});
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [isPrinting, setIsPrinting] = useState(false);
  
  // Fetch orders and products on component mount
  useEffect(() => {
    fetchMetricsData();
  }, []);

  // Combined function to fetch products and orders
  const fetchMetricsData = async () => {
    try {
      setLoading(true);
      
      // Always use the selected date range
      const params: OrderFilterParams = { startDate, endDate };
      
      // Get products data to ensure we have product names
      const productsData = await productService.getProducts();
      const productsMap = productsData.reduce((map, product) => {
        map[product._id] = product;
        return map;
      }, {} as Record<string, any>);
      
      // Get filtered orders
      const orders = await orderService.getFilteredOrders(params);
      
      // Aggregate data based on the selected granularity
      const metricsMap: Record<string, MetricItem> = {};
      const productMetrics: Record<string, ProductMetric> = {};
      let totalRev = 0;
      
      orders.forEach(order => {
        // Get order date and create key based on selected granularity
        const orderDate = new Date(order.createdAt);
        let periodKey: string;
        
        if (dateFilter === 'day') {
          periodKey = orderDate.toISOString().split('T')[0]; // YYYY-MM-DD
        } else if (dateFilter === 'month') {
          periodKey = `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, '0')}`; // YYYY-MM
        } else { // year
          periodKey = `${orderDate.getFullYear()}`; // YYYY
        }
        
        // Initialize period metrics if it doesn't exist
        if (!metricsMap[periodKey]) {
          metricsMap[periodKey] = {
            label: periodKey,
            totalRevenue: 0,
            products: {}
          };
        }
        
        // Process each item in the order
        order.items?.forEach(item => {
          const productId = typeof item.product === 'string' 
            ? item.product 
            : (item.product?._id || 'unknown');
            
          const product = productsMap[productId] || 
            (typeof item.product === 'object' ? item.product : { name: 'Unknown Product', price: 0 });
            
          const productName = product.name || 'Unknown Product';
          const price = typeof product === 'object' ? (product.price || 0) : 0;
          const quantity = item.quantity || 0;
          const itemRevenue = price * quantity;
          
          // Update period metrics
          if (!metricsMap[periodKey].products[productId]) {
            metricsMap[periodKey].products[productId] = {
              _id: productId,
              name: productName,
              quantity: 0,
              revenue: 0
            };
          }
          metricsMap[periodKey].products[productId].quantity += quantity;
          metricsMap[periodKey].products[productId].revenue += itemRevenue;
          metricsMap[periodKey].totalRevenue += itemRevenue;
          
          // Update overall product metrics
          if (!productMetrics[productId]) {
            productMetrics[productId] = {
              _id: productId,
              name: productName,
              quantity: 0,
              revenue: 0
            };
          }
          productMetrics[productId].quantity += quantity;
          productMetrics[productId].revenue += itemRevenue;
          
          // Update total revenue
          totalRev += itemRevenue;
        });
      });
      
      // Convert metrics map to array and sort by period
      const metricsArray = Object.values(metricsMap).sort((a, b) => a.label.localeCompare(b.label));
      
      setMetrics(metricsArray);
      setProductTotals(productMetrics);
      setTotalRevenue(totalRev);
      setError(null);
    } catch (err) {
      console.error('Error fetching metrics data:', err);
      setError('Failed to load metrics data. Please try again later.');
      setMetrics([]);
      setProductTotals({});
      setTotalRevenue(0);
    } finally {
      setLoading(false);
    }
  };

  // Apply date filter or range changes
  useEffect(() => {
    // Clear existing metrics when changing granularity to prevent format mismatches
    setMetrics([]);
    fetchMetricsData();
  }, [dateFilter, startDate, endDate]);

  // Handle printing metrics summary
  const handlePrintMetrics = async () => {
    try {
      setIsPrinting(true);
      
      // Get all products sorted by revenue (highest first)
      const productsSorted = Object.values(productTotals)
        .filter(product => product.quantity > 0) // Only products that were sold
        .sort((a, b) => b.revenue - a.revenue);
      
      // Format period for display
      const formatPeriodForPrint = () => {
        const start = new Date(startDate).toLocaleDateString('cs-CZ');
        const end = new Date(endDate).toLocaleDateString('cs-CZ');
        return `${start} - ${end}`;
      };
      
      // Prepare receipt data for metrics summary - simple format
      const receiptData = {
        orderNumber: `PŘEHLED-${Date.now()}`,
        date: new Date().toLocaleString('cs-CZ'),
        items: productsSorted.map(product => ({
          name: product.name,
          quantity: product.quantity,
          price: product.revenue / product.quantity, // Average price per unit
          total: product.revenue
        })),
        totalAmount: totalRevenue,
        storeName: 'Hradišťský Vrch',
        storeAddress: `Období: ${formatPeriodForPrint()}`
      };

      // Print receipt
      const printResult = await printerService.printReceipt(receiptData);
      
      if (printResult.success) {
        alert('Přehled prodejů byl úspěšně vytisknut!');
      } else {
        alert(`Tisk přehledu selhal: ${printResult.error}`);
      }
    } catch (error) {
      console.error('Failed to print metrics:', error);
      alert('Nepodařilo se vytisknout přehled. Zkuste to znovu.');
    } finally {
      setIsPrinting(false);
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK'
    }).format(amount);
  };

  // Format period label for display
  const formatPeriodLabel = (label: string) => {
    try {
      if (dateFilter === 'day') {
        // Format YYYY-MM-DD
        const date = new Date(label);
        if (isNaN(date.getTime())) {
          return label; // Fallback if date is invalid
        }
        return new Intl.DateTimeFormat('cs-CZ', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).format(date);
      } else if (dateFilter === 'month') {
        // Format YYYY-MM as Month YYYY
        const parts = label.split('-');
        if (parts.length !== 2) {
          return label; // Return original label if not in YYYY-MM format
        }
        const [year, month] = parts;
        const yearNum = parseInt(year);
        const monthNum = parseInt(month) - 1;
        
        if (isNaN(yearNum) || isNaN(monthNum) || monthNum < 0 || monthNum > 11) {
          return label; // Return original if parsing fails
        }
        
        return new Intl.DateTimeFormat('cs-CZ', {
          year: 'numeric',
          month: 'long'
        }).format(new Date(yearNum, monthNum, 1));
      } else {
        // Just return year
        return label;
      }
    } catch (err) {
      console.error("Error formatting date label:", label, err);
      return label; // Fallback to original label on error
    }
  };

  // Prepare chart data
  const chartData = metrics.map(metric => {
    const data: any = {
      period: formatPeriodLabel(metric.label),
      "Celkem": metric.totalRevenue
    };
    
    // Add top products data (optional: can limit to top 3-5 products if needed)
    Object.values(metric.products)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 3) // Include only top 3 products in chart
      .forEach(product => {
        data[product.name] = product.revenue;
      });
    
    return data;
  });

  // Get top selling products
  const topProducts = Object.values(productTotals)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  return (
    <div className="flex w-full h-screen">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with title and filters - fixed position */}
        <div className="p-4 bg-primary flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-text-secondary/10 gap-2 z-10">
          <h1 className="text-2xl font-bold text-text-primary">Metriky</h1>

          <div className="flex flex-wrap gap-4 items-center">
            {/* Date range inputs - always visible */}
            <div className="flex items-center space-x-2">
              <span className="text-text-secondary text-sm">Od:</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-2 py-1 bg-secondary text-text-primary rounded-md text-sm"
              />
              <span className="text-text-secondary text-sm">Do:</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-2 py-1 bg-secondary text-text-primary rounded-md text-sm"
              />
            </div>
            
            {/* Granularity controls */}
            <div className="flex items-center">
              <span className="text-text-secondary text-sm mr-2">Zobrazit po:</span>
              <div className="flex space-x-1">
                <button
                  onClick={() => setDateFilter('day')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    dateFilter === 'day'
                      ? 'bg-link text-text-primary'
                      : 'bg-primary text-text-secondary hover:bg-secondary'
                  }`}
                >
                  Dnech
                </button>
                <button
                  onClick={() => setDateFilter('month')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    dateFilter === 'month'
                      ? 'bg-link text-text-primary'
                      : 'bg-primary text-text-secondary hover:bg-secondary'
                  }`}
                >
                  Měsících
                </button>
                <button
                  onClick={() => setDateFilter('year')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    dateFilter === 'year'
                      ? 'bg-link text-text-primary'
                      : 'bg-primary text-text-secondary hover:bg-secondary'
                  }`}
                >
                  Letech
                </button>
              </div>
            </div>

            <button
              onClick={() => fetchMetricsData()}
              className="px-3 py-1 bg-link text-text-primary rounded-md text-sm hover:bg-link/80 transition-colors"
            >
              Obnovit
            </button>

            {/* Print Metrics Button */}
            <button
              onClick={handlePrintMetrics}
              disabled={isPrinting || loading || totalRevenue === 0}
              className={`px-3 py-1 rounded-md text-sm transition-colors flex items-center ${
                isPrinting || loading || totalRevenue === 0
                  ? 'bg-secondary text-text-secondary cursor-not-allowed'
                  : 'bg-success text-text-primary hover:bg-success/80'
              }`}
            >
              {isPrinting ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-text-secondary border-t-transparent rounded-full mr-2"></div>
                  Tiskne...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                  </svg>
                  Tisknout přehled
                </>
              )}
            </button>
          </div>
        </div>

        {/* Metrics content - scrollable */}
        <div className="flex-1 overflow-auto p-4">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-link"></div>
            </div>
          ) : error ? (
            <div className="bg-primary border border-error text-error px-4 py-3 rounded mb-4">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Summary Card */}
              <div className="bg-primary rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-text-primary mb-4">Souhrn</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-secondary/50 rounded-md p-4">
                    <div className="text-text-secondary text-sm">Celková tržba</div>
                    <div className="text-2xl font-bold text-text-primary">{formatCurrency(totalRevenue)}</div>
                  </div>
                  <div className="bg-secondary/50 rounded-md p-4">
                    <div className="text-text-secondary text-sm">Produktů celkem</div>
                    <div className="text-2xl font-bold text-text-primary">{Object.keys(productTotals).length}</div>
                  </div>
                  <div className="bg-secondary/50 rounded-md p-4">
                    <div className="text-text-secondary text-sm">Prodaných kusů</div>
                    <div className="text-2xl font-bold text-text-primary">
                      {Object.values(productTotals).reduce((sum, product) => sum + product.quantity, 0)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Products Card */}
              <div className="bg-primary rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-text-primary mb-4">Top 5 produktů</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-xs uppercase bg-secondary/30">
                      <tr>
                        <th className="px-3 py-2 text-left">#</th>
                        <th className="px-3 py-2 text-left">Produkt</th>
                        <th className="px-3 py-2 text-right">Množství</th>
                        <th className="px-3 py-2 text-right">Tržba</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topProducts.map((product, index) => (
                        <tr key={product._id} className="border-b border-secondary/20">
                          <td className="px-3 py-2 text-text-secondary">{index + 1}</td>
                          <td className="px-3 py-2 text-text-primary">{product.name}</td>
                          <td className="px-3 py-2 text-right text-text-primary">{product.quantity}</td>
                          <td className="px-3 py-2 text-right text-text-primary font-medium">
                            {formatCurrency(product.revenue)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="bg-primary rounded-lg p-6 shadow-sm lg:col-span-2">
                <h2 className="text-xl font-semibold text-text-primary mb-4">
                  {dateFilter === 'day' 
                    ? 'Vývoj tržeb po dnech' 
                    : dateFilter === 'month' 
                      ? 'Vývoj tržeb po měsících'
                      : 'Vývoj tržeb po letech'
                  }
                </h2>
                <div className="h-80">
                  {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#36393e" />
                        <XAxis 
                          dataKey="period" 
                          stroke="#d1d1d1" 
                          fontSize={12}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis 
                          stroke="#d1d1d1" 
                          fontSize={12}
                          tickFormatter={(value) => `${Math.round(value / 1000)}k`}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#36393e', 
                            border: '1px solid #d1d1d1',
                            borderRadius: '6px',
                            color: '#fff'
                          }}
                          formatter={(value: any) => [formatCurrency(value), 'Tržba']}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="Celkem" 
                          stroke="#2563EB" 
                          strokeWidth={2}
                          dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, stroke: '#2563EB', strokeWidth: 2, fill: '#fff' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-text-secondary">
                      Žádná data pro graf
                    </div>
                  )}
                </div>
              </div>

              {/* Period Data Table */}
              <div className="bg-primary rounded-lg p-6 shadow-sm lg:col-span-2">
                <h2 className="text-xl font-semibold text-text-primary mb-4">
                  {dateFilter === 'day' 
                    ? 'Detaily po dnech' 
                    : dateFilter === 'month' 
                      ? 'Detaily po měsících'
                      : 'Detaily po letech'
                  }
                </h2>
                {metrics.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-text-primary">
                      <thead className="text-xs uppercase bg-secondary/30">
                        <tr>
                          <th className="px-4 py-3 text-left">Období</th>
                          <th className="px-4 py-3 text-left">Nejprodávanější</th>
                          <th className="px-4 py-3 text-right">Celková tržba</th>
                        </tr>
                      </thead>
                      <tbody>
                        {metrics.map((metric) => {
                          const topProduct = Object.values(metric.products)
                            .sort((a, b) => b.revenue - a.revenue)[0];
                          
                          return (
                            <tr key={metric.label} className="border-b border-secondary/20">
                              <td className="px-4 py-3 font-medium">
                                {formatPeriodLabel(metric.label)}
                              </td>
                              <td className="px-4 py-3">
                                {topProduct ? `${topProduct.name} (${topProduct.quantity}ks)` : 'Žádné prodeje'}
                              </td>
                              <td className="px-4 py-3 text-right font-medium">
                                {formatCurrency(metric.totalRevenue)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="bg-secondary/20 border border-text-secondary/10 text-text-secondary px-4 py-8 rounded text-center">
                    Žádná data za vybrané období
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}