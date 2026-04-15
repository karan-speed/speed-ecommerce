import { TableCell, TableRow } from "@mui/material";
import type { CategoryColumnProps, TCategorySummery } from "../../../types";
import Text from "../../common/Text";
import { renderDetailsField } from "../../constants";

interface TCategorySats {
  data: TCategorySummery;
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
