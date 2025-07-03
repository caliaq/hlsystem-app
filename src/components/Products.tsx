import { useEffect, useState } from "react";
import { Product as ProductType } from "../types/product";
import { productService } from "../services/productService";
import Product from "./Product";

interface ProductsProps {
    onSelectProduct?: (product: ProductType) => void;
}

export default function Products({ onSelectProduct }: ProductsProps) {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0
    });
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

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

    const handleProductClick = (product: ProductType) => {
        if (isEditMode) {
            // In edit mode, clicking opens the edit modal
            setSelectedProduct(product);
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price
            });
            setIsModalOpen(true);
        } else if (onSelectProduct) {
            // In normal mode, pass the product to the parent component
            onSelectProduct(product);
        }
    };

    const handleEditModeToggle = () => {
        setIsEditMode(!isEditMode);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || 0 : value
        }));
    };

    const handleSaveProduct = async () => {
        if (!selectedProduct) return;

        try {
            await productService.updateProduct(selectedProduct._id, formData);
            fetchProducts();
            setIsModalOpen(false);
            setSelectedProduct(null);
        } catch (err) {
            console.error("Failed to update product:", err);
            alert("Failed to update product. Please try again.");
        }
    };

    const handleDeleteClick = () => {
        setIsDeleteConfirmOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedProduct) return;

        try {
            await productService.deleteProduct(selectedProduct._id);
            fetchProducts();
            setIsDeleteConfirmOpen(false);
            setIsModalOpen(false);
            setSelectedProduct(null);
        } catch (err) {
            console.error("Failed to delete product:", err);
            alert("Failed to delete product. Please try again.");
        }
    };

    const handleAddNewProduct = () => {
        setSelectedProduct(null);
        setFormData({
            name: '',
            description: '',
            price: 0
        });
        setIsModalOpen(true);
    };

    const handleCreateProduct = async () => {
        try {
            await productService.createProduct(formData);
            fetchProducts();
            setIsModalOpen(false);
        } catch (err) {
            console.error("Failed to create product:", err);
            alert("Failed to create product. Please try again.");
        }
    };

    return (
        <div className="w-full h-screen flex flex-col overflow-y-scroll">
            <div className="p-4 bg-primary flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-text-secondary/10 gap-2">
                <h2 className="text-2xl font-bold text-text-primary">Produkty</h2>
                <div className="flex gap-2 w-full sm:w-auto">
                    {isEditMode && (
                        <button 
                            onClick={handleAddNewProduct}
                            className="w-full sm:w-auto px-4 py-2 bg-success text-text-primary rounded-md hover:bg-success/80 transition-colors flex items-center justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Přidat produkt
                        </button>
                    )}
                    <button 
                        onClick={handleEditModeToggle}
                        className={`w-full sm:w-auto px-4 py-2 ${isEditMode ? 'bg-error' : 'bg-link'} text-text-primary rounded-md hover:opacity-90 transition-colors flex items-center justify-center`}
                    >
                        {isEditMode ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Ukončit úpravy
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                                Režim úprav
                            </>
                        )}
                    </button>
                </div>
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
                        <button 
                            onClick={handleAddNewProduct}
                            className="mt-4 px-4 py-2 bg-link text-text-primary rounded-md hover:bg-blue-700 transition-colors text-sm"
                        >
                            Add your first product
                        </button>
                    </div>
                ) : (
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                        {products.map((product) => (
                            <div 
                                key={product._id} 
                                onClick={() => handleProductClick(product)}
                                className={isEditMode ? "cursor-pointer relative group" : ""}
                            >
                                {isEditMode && (
                                    <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-10 rounded-lg">
                                        <button className="bg-link text-text-primary px-3 py-1 rounded-md text-sm">
                                            Upravit
                                        </button>
                                    </div>
                                )}
                                <Product product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Edit/Create Product Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-primary rounded-lg p-2 w-full max-w-md mx-4">
                        <h3 className="text-lg font-bold mb-4 text-text-primary">
                            {selectedProduct ? 'Upravit produkt' : 'Přidat nový produkt'}
                        </h3>
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">
                                    Název
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-secondary border border-text-secondary/20 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-link"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-1">
                                    Popis
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-secondary border border-text-secondary/20 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-link"
                                />
                            </div>
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-text-secondary mb-1">
                                    Cena (CZK)
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    min="0"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-secondary border border-text-secondary/20 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-link"
                                    required
                                />
                            </div>
                            <div className="flex justify-between pt-4">
                                {selectedProduct && (
                                    <button
                                        type="button"
                                        onClick={handleDeleteClick}
                                        className="px-4 py-2 bg-error text-text-primary rounded-md hover:bg-error/80 transition-colors"
                                    >
                                        Smazat
                                    </button>
                                )}
                                <div className="flex gap-2 ml-auto">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 bg-secondary text-text-primary rounded-md hover:bg-secondary/80 transition-colors"
                                    >
                                        Zrušit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={selectedProduct ? handleSaveProduct : handleCreateProduct}
                                        className="px-4 py-2 bg-success text-text-primary rounded-md hover:bg-success/80 transition-colors"
                                    >
                                        {selectedProduct ? 'Uložit' : 'Vytvořit'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteConfirmOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-primary rounded-lg p-2 w-full max-w-md mx-4">
                        <h3 className="text-lg font-bold mb-4 text-text-primary">Potvrdit smazání</h3>
                        <p className="text-text-secondary mb-6">
                            Opravdu chcete smazat produkt "{selectedProduct?.name}"? Tato akce je nevratná.
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsDeleteConfirmOpen(false)}
                                className="px-4 py-2 bg-secondary text-text-primary rounded-md hover:bg-secondary/80 transition-colors"
                            >
                                Zrušit
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="px-4 py-2 bg-error text-text-primary rounded-md hover:bg-error/80 transition-colors"
                            >
                                Smazat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}