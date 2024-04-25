import { useSearchParams } from "next/navigation";
import React from "react";

export default function FilterCategoryRow({
  category,
  handleChange,
}: {
  category: any;
  handleChange: Function;
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const prevCategory = params.get("category")?.split(",");

  return (
    <div key={category._id} className="flex justify-between gap-4">
      <label
        htmlFor={category.name}
        className=" font-bold uppercase text-black text-xs"
      >
        {category.name}
      </label>
      <input
        type="checkbox"
        name="category"
        checked={prevCategory?.some((prevCat) => prevCat === category.name)}
        value={category.name}
        onChange={(e) => handleChange(e, "category")}
        id={category.name}
      />
    </div>
  );
}
