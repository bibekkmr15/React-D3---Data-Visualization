import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CustomSelect({ options, setValue, placeholder }) {
  return (
    <>
      <Select onValueChange={setValue} className="">
        <SelectTrigger className="w-[120px] mx-2">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => {
            const displayValue = isNaN(Number(option))
              ? `${option?.charAt(0).toUpperCase()}${option.slice(1)}`
              : Number(option);

            return (
              <SelectItem key={option} value={option}>
                {displayValue}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
}
