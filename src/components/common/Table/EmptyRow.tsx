import { TableCell, TableRow } from "@mui/material";
import { noDataFound } from "../../messages";

export default function EmptyRow({ colSpan }: { colSpan: number }) {
  return (
    <TableRow sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <TableCell colSpan={colSpan}>{noDataFound}</TableCell>
    </TableRow>
  );
}
