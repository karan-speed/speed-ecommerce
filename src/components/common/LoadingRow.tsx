import { TableCell, TableRow } from "@mui/material";
import type { Field } from "../../types";
import CustomSkeleton from "./CustomSkeleton";

export default function LoadingRow({ columns }: { columns: Field[] }) {
  return (
    <TableRow>
      {columns.map((col) => (
        <TableCell key={col.key}>
          <CustomSkeleton />
        </TableCell>
      ))}
    </TableRow>
  );
}
