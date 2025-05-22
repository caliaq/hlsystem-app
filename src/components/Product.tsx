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
    <div className="aspect-square bg-primary rounded-lg shadow-md overflow-hidden transition-all cursor-pointer hover:shadow-lg hover:scale-[1.02] flex flex-col">
      <div className="p-3 flex flex-col h-full">
        <h3 className="text-base font-medium text-text-primary line-clamp-2">{product.name}</h3>
        <p className="mt-1 text-xs text-text-secondary line-clamp-2 overflow-hidden flex-grow">{product.description}</p>
        <div className="flex justify-between items-center mt-auto pt-1 border-t border-text-secondary/10">
          <span className="text-base font-bold text-text-primary">{formattedPrice}</span>
          <button className="p-1 rounded-full hover:bg-text-secondary/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-link" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}