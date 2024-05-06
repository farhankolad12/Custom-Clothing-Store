import { AttributesType } from "@/app/definations";
import Select from "react-select";

export default function AttributeSelection({
  attr,
  setSelectedAtLast,
  selectedAttribute,
  attributes,
  selectedProduct,
}: {
  selectedProduct: any;
  attr: any;
  setSelectedAtLast: Function;
  selectedAttribute: any;
  attributes: AttributesType[] | undefined;
}) {
  const allAttrOptions = attributes?.find((attr1) => {
    if (attr1.displayName === (attr.label || attr.displayName)) {
      return attr1.options.map((option) => {
        return {
          value: option.variant,
          label: option.variant,
          id: option.id,
          attrDisplayName: attr.value,
          attrTitle: attr.label,
          attrId: attr._id,
        };
      });
    }
  });

  return (
    <div className="d-flex flex-column gap-2">
      <label htmlFor="attributes">
        Select {attr.label || attr.displayName}
      </label>
      <Select
        isMulti={true}
        defaultValue={
          selectedProduct
            ? attr.values.map((option: any) => {
                return {
                  value: option.variant,
                  label: option.variant,
                  id: option.id,
                  attrDisplayName: attr.value,
                  attrTitle: attr.label,
                  attrId: attr._id,
                };
              })
            : null
        }
        options={allAttrOptions?.options.map((option) => {
          return {
            value: option.variant,
            label: option.variant,
            id: option.id,
            attrDisplayName: attr.value,
            attrTitle: attr.label,
            attrId: attr._id,
          };
        })}
        styles={{
          option: (styles) => ({
            ...styles,
            color: "#000",
          }),
        }}
        onChange={async (val: any) => {
          setSelectedAtLast((prev: any) => {
            if (
              prev.some(
                (p: any) =>
                  p._id ===
                  val.filter((v: any) => v.attrId === p._id)[0]?.attrId
              )
            ) {
              return prev.map((p: any) => {
                return p._id ===
                  val.filter((v: any) => v.attrId === p._id)[0]?.attrId
                  ? {
                      ...p,
                      values: attr.values.filter((value: any) => {
                        return val.some((v: any) => v.value === value.variant);
                      }),
                    }
                  : p;
              });
            }

            return [
              ...prev,
              {
                _id: attr._id,
                displayName: attr.value,
                title: attr.label,
                values: attr.values.filter((value: any) => {
                  return val.some((v: any) => v.value === value.variant);
                }),
              },
            ];
          });
        }}
      />
    </div>
  );
}
