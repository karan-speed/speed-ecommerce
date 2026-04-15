import { TableCell, TableRow } from "@mui/material";
import type { Field } from "../../types";
import { headerCellStyle } from "../constants";

function TableItem({
  row,
  onClick,
  columns,
}: {
  row: any;
  onClick: () => void;
  columns: Field[];
}) {
  const isId = (key: any) => (key === "id" ? headerCellStyle : undefined);
  return (
    <TableRow onClick={onClick}>
      {columns.map((col) => (
        <TableCell sx={isId(col.key)} key={String(col.key)}>
          {col.render ? col.render(row) : row[col.key]}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default TableItem;
