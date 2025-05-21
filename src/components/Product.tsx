import { Product as ProductType } from "../services/productService";

interface ProductProps {
  product: ProductType;
}

export default function Product({ product }: ProductProps) {
  const formattedPrice = new Intl.NumberFormat('cs-CZ', { 
    style: 'currency', 
    currency: 'CZK' 
  }).format(product.price);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      {product.imageUrl ? (
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">No image</span>
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">{formattedPrice}</span>
          <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Detail
          </button>
        </div>
      </div>
    </div>
  );
}