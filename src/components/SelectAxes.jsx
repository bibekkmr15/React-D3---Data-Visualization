import CustomSelect from "./CustomSelect";

export default function SelectAxes({ setXAxis, setYAxis }) {
  return (
    <div className="flex mt-3 ">
      <div className="text-l mt-1">Select X and Y Axis</div>
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
