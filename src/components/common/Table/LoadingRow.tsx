import { TableCell, TableRow } from "@mui/material";
import type { Field } from "../../../types";
import Skeleton from "../Skeleton/Skeleton";

export default function LoadingRow({ columns }: { columns: Field[] }) {
  return (
    <TableRow>
      {columns.map((col) => (
        <TableCell key={col.key}>
          <Skeleton variant="text" customClass="table-skeleton" />
        </TableCell>
      ))}
    </TableRow>
  );
}
