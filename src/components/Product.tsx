import { Product as ProductType } from "../services/productService";

interface ProductProps {
  product: ProductType;
}

export default function Product({ product }: ProductProps) {
  const formattedPrice = new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
  }).format(product.price);

  return (
    <div className="aspect-square bg-primary rounded-lg shadow-md overflow-hidden transition-all cursor-pointer hover:shadow-lg hover:scale-[1.02] flex">
      <div className="p-3 flex flex-col justify-center items-center w-full">
        <h3 className="text-base font-medium text-text-primary line-clamp-2 text-center">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-text-secondary line-clamp-2 overflow-hidden text-center max-w-full">
          {product.description}
        </p>
        <div className="mt-2 text-center">
          <span className="text-base font-bold text-text-primary">
            {formattedPrice}
          </span>
        </div>
      </div>
    </div>
  );
}
