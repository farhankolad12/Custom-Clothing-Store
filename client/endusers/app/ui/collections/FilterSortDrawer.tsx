import { Drawer, Option, Select } from "@material-tailwind/react";
import { onClose } from "@material-tailwind/react/types/components/alert";
import { useRouter } from "next/navigation";
import React, { Ref } from "react";

export default function FilterSortDrawer({
  open,
  closeDrawer,
  filters,
  minPriceRef,
  debouned,
  maxPriceRef,
  searchParams,
  params,
  handleSorting,
  handleChange,
  slug,
}: {
  open: boolean;
  closeDrawer: onClose;
  filters: any;
  minPriceRef: Ref<HTMLInputElement>;
  debouned: any;
  maxPriceRef: Ref<HTMLInputElement>;
  searchParams: any;
  params: any;
  handleSorting: Function;
  handleChange: Function;
  slug: any;
}) {
  const router = useRouter();

  return (
    <Drawer
      placeholder=""
      placement="right"
      className="flex flex-col justify-between"
      open={open}
      onClose={closeDrawer}
    >
      <div>
        <div className="border-b p-4">
          <span>Filter & Sort</span>
        </div>
        <div className="flex flex-col gap-5 p-4">
          <Select placeholder="" label="Price">
            <div className="w-full">
              <div className="border-b pb-3">
                <span>The Highest price is ₹4999</span>
              </div>
              <div className="flex flex-col gap-4 my-5">
                <div>
                  <label htmlFor="lte">From ₹</label>
                  <input
                    ref={minPriceRef}
                    defaultValue={searchParams?.get("min") || ""}
                    onChange={debouned}
                    type="number"
                    className="border-2"
                    id="lte"
                  />
                </div>
                <div>
                  <label htmlFor="gte">To ₹</label>
                  <input
                    ref={maxPriceRef}
                    onChange={debouned}
                    defaultValue={searchParams?.get("max") || ""}
                    type="number"
                    className="border-2"
                    id="gte"
                  />
                </div>
              </div>
            </div>
          </Select>
          {filters?.attributes?.map((attr: any) => {
            return (
              <Select placeholder="" label={attr.title}>
                <div className="text-black flex flex-col gap-4">
                  {attr.options.map((val: any) => {
                    return (
                      <div className="flex items-center gap-4">
                        <input
                          checked={params
                            .get("variants")
                            ?.split(",")
                            .some((variant: any) => variant === val.variant)}
                          onChange={(e) => handleChange(e, "variants")}
                          type="checkbox"
                          name={attr.title}
                          id={val.variant}
                          value={val.variant}
                        />
                        <label htmlFor={val.variant}>{val.variant}</label>
                      </div>
                    );
                  })}
                </div>
              </Select>
            );
          })}
          <Select
            placeholder=""
            onChange={(e) => handleSorting(e)}
            defaultValue={searchParams.get("sort-by") || "default"}
            label="Sort By"
          >
            <Option value="default">Default</Option>
            <Option value="latest">Latest</Option>
            <Option value="new-old">Date new to old</Option>
            <Option value="old-new">Date old to new</Option>
            <Option value="high-low">Price High to low</Option>
            <Option value="low-high">Price Low to High</Option>
          </Select>
        </div>
      </div>
      <div className="flex justify-between gap-4 p-4 items-center border-t">
        <button
          onClick={() => {
            router.push(`/collections/${slug}`);
            closeDrawer();
          }}
          className="underline w-full"
        >
          Remove all
        </button>
        <button
          onClick={closeDrawer}
          className="w-full py-3 bg-black text-white"
        >
          Apply
        </button>
      </div>
    </Drawer>
  );
}
