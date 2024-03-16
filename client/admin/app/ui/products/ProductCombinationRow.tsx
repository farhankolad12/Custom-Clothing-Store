import React, { useRef } from "react";

export default function ProductCombinationRow({
  combination,
  setCombinations,
}: {
  combination: any;
  setCombinations: Function;
}) {
  const priceRef = useRef<HTMLInputElement>(null!);
  const salePriceRef = useRef<HTMLInputElement>(null!);

  return (
    <tr>
      <td>img</td>
      <td>
        {combination.map((comb: any) => {
          return (
            <span key={comb.id} className="mx-1">
              {comb.variant}
            </span>
          );
        })}
      </td>
      <td>
        <input
          ref={priceRef}
          type="number"
          id="price"
          className="form-control bg-transparent text-light w-50"
        />
      </td>
      <td>
        <input
          ref={salePriceRef}
          type="number"
          id="sale-price"
          className="form-control bg-transparent text-light w-50"
        />
      </td>
    </tr>
  );
}
