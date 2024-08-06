import CustomSelect from "./CustomSelect";

export default function SelectAxes({ setXAxis, setYAxis }) {
  return (
    <div className="flex mt-3 ">
      <h3 className="mt-1 text-lg font-semibold">Select X and Y Axis</h3>
      <CustomSelect
        options={["published", "added"]}
        placeholder="Select X Axis"
        setValue={setXAxis}
      />
      <CustomSelect
        options={["intensity", "likelihood", "impact", "relevance"]}
        placeholder="Select Y Axis"
        setValue={setYAxis}
      />
    </div>
  );
}
