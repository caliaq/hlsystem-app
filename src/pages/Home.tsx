import { useCallback, useState } from "react";
import Navigation from "../components/Navigation";
import Products from "../components/Products";
import Overview from "../components/Overview";
import Gates from "../components/Gates";
import { Product as ProductType } from "../services/productService";

export default function Home() {
    const [selectedProducts, setSelectedProducts] = useState<ProductType[]>([]);

    // Handle product selection
    const handleSelectProduct = useCallback((product: ProductType) => {
        setSelectedProducts(prev => [...prev, product]);
    }, []);

    // Handle order clearing
    const handleClearOrder = useCallback(() => {
        setSelectedProducts([]);
    }, []);

    return (
        <div className="flex w-full h-dvh">
            <div className="flex flex-1">
                <div className="w-1/2 h-full">
                    <Products onSelectProduct={handleSelectProduct} />
                </div>
                <div className="flex flex-col w-1/2 flex-1">
                    <div className="w-full h-1/2">
                        <Overview 
                            selectedProducts={selectedProducts} 
                            onClearOrder={handleClearOrder}
                        />
                    </div>
                    <div className="w-full h-1/2">
                        <Gates />
                    </div>
                </div>
            </div>
        </div>
    );
}