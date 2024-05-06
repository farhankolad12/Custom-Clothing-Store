import { Fragment } from "react";

export default function VariationsList({
  variant,
  selectedVariants,
  setSelectedVariants,
}: {
  variant: any;
  selectedVariants: any;
  setSelectedVariants: Function;
}) {
  return (
    <div className="flex flex-wrap border-b-2 last:border-b-0 items-center justify-between pb-4">
      <strong className="uppercase font-bold">{variant.title}</strong>
      <div className="flex flex-wrap gap-3">
        {variant.values.map((val: any) => {
          return (
            <Fragment key={val.id}>
              <input
                type="radio"
                name={variant.title}
                id={val.variant}
                value={val.variant}
                className="hidden"
                onChange={(e) => {
                  setSelectedVariants((prev: any) => {
                    if (
                      prev.some((variants: any) => variants._id === variant._id)
                    ) {
                      return prev.map((variants: any) => {
                        if (variants._id === variant._id) {
                          return { ...variants, values: val };
                        }

                        return variants;
                      });
                    }

                    return [...prev, { ...variant, values: val }];
                  });
                }}
              />
              <label
                className={`border-2 border-black px-6 py-1 hover:bg-black hover:text-white transition cursor-pointer ${
                  selectedVariants.some((variants: any) => {
                    return variants.values.variant === val.variant;
                  })
                    ? "bg-black text-white"
                    : ""
                } `}
                htmlFor={val.variant}
              >
                {val.variant}
              </label>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
