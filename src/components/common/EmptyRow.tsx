import { TableCell, TableRow } from "@mui/material";
import { noDataFound } from "../messages";

export default function EmptyRow({ colSpan }: { colSpan: number }) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>{noDataFound}</TableCell>
    </TableRow>
  );
}
