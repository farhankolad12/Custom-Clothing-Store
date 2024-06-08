import { ProductType } from "@/app/definations";
import formatCurrency from "@/app/utils/formatCurrency";
import Link from "next/link";

export default function UserCartRow({
  product,
  i,
}: {
  product: ProductType;
  i: number;
}) {
  return (
    <tr key={product._id + i}>
      <td>{i + 1}</td>
      <td>
        <div className="d-flex flex-column">
          <Link
            className="link-underline-primary"
            target="_blank"
            href={`http://localhost:3000/product/${product._id}`}
          >
            {product.name}
          </Link>
          {product.selectedCombination.combinations.map((combination) => {
            return (
              <span key={combination.id}>
                {combination.parentName}: {combination.variant}
              </span>
            );
          })}
        </div>
      </td>
      <td>{product.quantity}</td>
      <td>{formatCurrency(product.selectedCombination.salePrice)}</td>
      <td>
        {formatCurrency(
          product.selectedCombination.salePrice * product.quantity
        )}
      </td>
    </tr>
  );
}
