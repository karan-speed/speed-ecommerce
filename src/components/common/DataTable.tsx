import { Table, TableBody } from "@mui/material";
import "../styles/table.scss";
import classNames from "classnames";
interface DataTableProps {
  customClass?: string;
  children?: React.ReactNode;
}

function DataTable({ children, customClass }: DataTableProps) {
  const classes = classNames(`common-table ${customClass}`);

  return (
    <Table className={classes}>
      <TableBody>{children}</TableBody>
    </Table>
  );
}

export default DataTable;
