import { TableCell, TableHead, TableRow } from "@mui/material";
import type { Field } from "../../types";
import { headerCellStyle } from "../constants";

function TableHeader({ columns }: { columns: Field[] }) {
  const isId = (key: any) => (key === "id" ? headerCellStyle : undefined);
  return (
    <TableHead>
      <TableRow>
        {columns.map((col) => (
          <TableCell sx={isId(col.key)} key={String(col.key)}>
            {col.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
