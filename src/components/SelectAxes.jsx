import CustomSelect from "./CustomSelect";

export default function SelectAxes({ setXAxis, setYAxis }) {
  return (
    <>
      <CustomSelect
        options={["intensity", "likelihood", "impact", "relevance"]}
        placeholder="Select Y Axis"
        setValue={setYAxis}
      />
      <CustomSelect
        options={["published", "added"]}
        placeholder="Select X Axis"
        setValue={setXAxis}
      />
    </>
  );
}
