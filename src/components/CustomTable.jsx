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
    <Table>
      <TableBody className="">
        {Object.entries(data).map(([key, value]) => (
          <TableRow key={key}>
            <TableCell className="font-medium">{key.toUpperCase()}</TableCell>
            <TableCell>{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
