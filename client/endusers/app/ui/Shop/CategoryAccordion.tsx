import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import FilterCategoryRow from "./FilterCategoryRow";

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

export default function CategoryAccordion({
  data,
  handleChange,
}: {
  data: any;
  handleChange: Function;
}) {
  const [open, setOpen] = useState(0);

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
        className="text-md uppercase border-0 text-black p-0 pb-5"
      >
        Category
      </AccordionHeader>
      <AccordionBody>
        <div className="flex flex-col gap-3">
          {data.categories.map((category: any) => {
            return (
              <FilterCategoryRow
                handleChange={handleChange}
                category={category}
                key={category._id}
              />
            );
          })}
        </div>
      </AccordionBody>
    </Accordion>
  );
}
