import { AttributesType } from "@/app/definations";
import { useState } from "react";
import Select from "react-select";
import AttributeSelection from "./AttributeSelection";
import { generateCombinations } from "@/app/utils/generateCombinations";
import { toast } from "react-toastify";
import ProductCombinationRow from "./ProductCombinationRow";

export default function ProdutcCombination({
  attributes,
  setVariants,
  variants,
  combinations,
  setCombinations,
  selectedAttribute,
  setSelectedAttribute,
}: {
  attributes: AttributesType[] | undefined;
  setVariants: Function;
  variants: any;
  combinations: any;
  setCombinations: Function;
  selectedAttribute: null | AttributesType[];
  setSelectedAttribute: Function;
}) {
  async function handleVariants() {
    if (variants.length !== selectedAttribute?.length) {
      return toast.error("Please required attributes values!", {
        position: "top-left",
      });
    }

    const combinations1 = await generateCombinations(variants);

    await setCombinations(combinations1);
  }

  return (
    <div className="w-100">
      <div className="d-flex flex-wrap gap-4">
        <div className="d-flex flex-column gap-2">
          <label htmlFor="attributes">Attributes</label>
          {attributes && (
            <Select
              isMulti={true}
              defaultValue={selectedAttribute}
              options={attributes.map((attr) => ({
                value: attr.displayName,
                label: attr.title,
                _id: attr._id,
                type: attr.type,
                values: attr.options,
              }))}
              styles={{
                option: (styles) => ({
                  ...styles,
                  color: "#000",
                }),
              }}
              onChange={(val: any) => setSelectedAttribute(val)}
            />
          )}
        </div>
        {selectedAttribute &&
          selectedAttribute.map((attr: any) => {
            return (
              <AttributeSelection
                attr={attr}
                key={attr._id}
                selectedAttribute={variants}
                setSelectedAtLast={setVariants}
              />
            );
          })}
      </div>
      <div className="d-flex justify-content-end gap-4 my-4">
        <button
          onClick={handleVariants}
          type="button"
          className="btn btn-success px-4 "
        >
          Generate variants
        </button>
        {variants.length ? (
          <button
            onClick={() => {
              setVariants([]);
              setCombinations([]);
              setSelectedAttribute([]);
            }}
            className="btn btn-success px-4"
          >
            Clear variants
          </button>
        ) : (
          ""
        )}
      </div>
      {combinations?.length ? (
        <div className="table-responsive">
          <table
            style={{ backgroundColor: "#1f2937" }}
            className="table border border-secondary table-dark"
          >
            <thead>
              <tr>
                <th className="text-secondary">COMBINATION</th>
                <th className="text-secondary">PRICE</th>
                <th className="text-secondary">SALE PRICE</th>
                {/* <th className="text-secondary">ACTIONS</th> */}
              </tr>
            </thead>
            <tbody>
              {combinations.map((combination: any, i: number) => {
                return (
                  <ProductCombinationRow
                    key={i}
                    setCombinations={setCombinations}
                    combination={combination}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
