import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CustomTable({ data }) {
  return (
    <div className="overflow-auto max-h-96">
      <Table>
        <TableBody className="">
          {Object.entries(data).map(([key, value]) => (
            <TableRow key={key} className="">
              <TableCell className="font-medium">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
