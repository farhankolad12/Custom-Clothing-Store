import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import FilterCategoryRow from "./FilterCategoryRow";
import { useSearchParams } from "next/navigation";

function Icon({ id, open }: { id: number; open: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export default function FilterAccordian({
  data,
  handleChange,
  variation,
}: {
  data: any;
  handleChange: Function;
  variation: any;
}) {
  const [open, setOpen] = useState(0);

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <Accordion
      placeholder="accord"
      open={open === 1}
      className="border-b border-gray-300"
      icon={<Icon id={1} open={open} />}
    >
      <AccordionHeader
        placeholder="accord-header"
        onClick={() => handleOpen(1)}
        className="text-md uppercase border-0 text-black p-0 py-5"
      >
        {variation.title}
      </AccordionHeader>
      <AccordionBody>
        <div className="flex flex-col gap-3">
          {variation.options.map((variants: any) => {
            return (
              <div key={variants._id} className="flex justify-between gap-4">
                <label
                  htmlFor={variants.variant}
                  className=" font-bold uppercase text-black text-xs"
                >
                  {variants.variant}
                </label>
                <input
                  checked={params
                    .get("variants")
                    ?.split(",")
                    .some((variant) => variant === variants.variant)}
                  type="checkbox"
                  name="variantions"
                  value={variants.variant}
                  onChange={(e) => handleChange(e, "variants")}
                  id={variants.variant}
                />
              </div>
            );
          })}
        </div>
      </AccordionBody>
    </Accordion>
  );
}
