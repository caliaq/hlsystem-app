import { useEffect, useState } from "react";
import { Product as ProductType, productService } from "../services/productService";
import Product from "./Product";

interface ProductsProps {
    onSelectProduct?: (product: ProductType) => void;
}

export default function Products({ onSelectProduct }: ProductsProps) {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await productService.getProducts();
                setProducts(Array.isArray(data) ? data : []);
                setError(null);
            } catch (err) {
                setError("Failed to load products. Please try again later.");
                console.error(err);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = (product: ProductType) => {
        if (onSelectProduct) {
            onSelectProduct(product);
        }
    };

    return (
        <div className="w-full h-screen bg-secondary flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 sm:p-4 mb-2 gap-2 bg-secondary sticky top-0 z-10">
                <h2 className="text-xl font-bold text-text-primary">Produkty</h2>
                <button className="w-full sm:w-auto px-4 py-2 bg-link text-text-primary rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Přidat produkt
                </button>
            </div>

            <div className="flex-1 overflow-auto p-2 sm:px-4">
                {loading ? (
                    <div className="flex-1 flex justify-center items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-link"></div>
                    </div>
                ) : error ? (
                    <div className="bg-primary border border-error text-error px-4 py-3 rounded">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center bg-primary border border-link/30 text-text-secondary px-4 py-8 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 opacity-50" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd" />
                        </svg>
                        <p>No products found.</p>
                        <button className="mt-4 px-4 py-2 bg-link text-text-primary rounded-md hover:bg-blue-700 transition-colors text-sm">
                            Add your first product
                        </button>
                    </div>
                ) : (
                    <div className="flex-1 grid grid-cols-4 gap-2">
                        {products.map((product) => (
                            <div key={product._id} onClick={() => handleProductClick(product)}>
                                <Product product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}