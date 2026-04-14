import { TableCell, TableRow } from "@mui/material";

import type { CategoryColumnProps } from "../../../types";
import Text from "../../common/Text";
import { renderDetailsField } from "../../constants";
type CategorySummeryType = {
  total_products: number;
  total_stock: number;
  average_price: number;
  active_products: number;
  spotlighted_products: number;
};

interface TCategorySats {
  data: CategorySummeryType;
  config: CategoryColumnProps["summery"];
}
export default function CategorySummery({ data, config }: TCategorySats) {
  return (
    <>
      <TableRow>
        <TableCell>
          <Text font="semiBold" customClass="font20">
            {config.title}
          </Text>
        </TableCell>
      </TableRow>

      {config.fields.map((col: any) => (
        <TableRow key={col.key}>
          <TableCell className="table-head">{col.label}</TableCell>
          <TableCell>{renderDetailsField(col, data as any)}</TableCell>
        </TableRow>
      ))}
    </>
  );
}
