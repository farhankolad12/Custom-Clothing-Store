import React, { useEffect, useRef, useState } from "react";

export default function ProductCombinationRow({
  combination,
  setCombinations,
}: {
  combination: any;
  setCombinations: Function;
}) {
  const [price, setPrice] = useState(
    combination.price ? combination.price : ""
  );
  const [salePrice, setSalePrice] = useState(
    combination.salePrice ? combination.salePrice : ""
  );

  useEffect(() => {
    setCombinations((prev: any) => {
      return prev.map((p: any) => {
        return p?.id === combination.id
          ? { ...p, price: +price, salePrice: +salePrice }
          : p;
      });
    });
  }, [salePrice, price]);

  // console.log(combination);

  return (
    <tr>
      <td>
        {combination.combinations.map((comb: any) => {
          return (
            <span key={comb.id} className="mx-1">
              {comb.variant}
            </span>
          );
        })}
      </td>
      <td>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          id="price"
          className="form-control bg-transparent text-light w-50"
        />
      </td>
      <td>
        <input
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value)}
          type="number"
          id="sale-price"
          className="form-control bg-transparent text-light w-50"
        />
      </td>
    </tr>
  );
}
