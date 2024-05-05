import Select from "react-select";

export default function AttributeSelection({
  attr,
  setSelectedAtLast,
  selectedAttribute,
}: {
  attr: any;
  setSelectedAtLast: Function;
  selectedAttribute: any;
}) {
  return (
    <div className="d-flex flex-column gap-2">
      <label htmlFor="attributes">Select {attr.displayName}</label>
      <Select
        isMulti={true}
        defaultValue={
          attr.values.map((option: any) => {
            selectedAttribute.some((attr: any) =>
              attr.values.find((val: any) => val.id == option.id)
            )
              ? {
                  value: option.variant,
                  label: option.variant,
                  id: option.id,
                  attrDisplayName: attr.value,
                  attrTitle: attr.label,
                  attrId: attr._id,
                }
              : {};
          }) || null
        }
        options={attr.values.map((option: any) => ({
          value: option.variant,
          label: option.variant,
          id: option.id,
          attrDisplayName: attr.value,
          attrTitle: attr.label,
          attrId: attr._id,
        }))}
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
