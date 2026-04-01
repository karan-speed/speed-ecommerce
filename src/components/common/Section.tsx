import { TableCell, TableRow } from "@mui/material";
import Text from "./Text";
import { renderField } from "../constants";
import type { ColumnProps, Product } from "../../types";

interface DetailsSectionProps {
  config: ColumnProps["details"];
  data: Pick<Product, "visiblity" | "createdAt" | "updatedAt">;
}
interface MediaSectionProps {
  config: ColumnProps["images"];
  data: Pick<Product, "images">;
}
interface ThumbnailSectionProps {
  config: ColumnProps["thumbnail"];
  data: Pick<Product, "thumbnail">;
}

export const DetailsSection = ({ config, data }: DetailsSectionProps) => (
  <>
    <TableRow>
      <TableCell className="title">
        <Text customClass="font20 font-SemiBold">{config.title}</Text>
      </TableCell>
    </TableRow>

    {config.fields.map((col: any) => (
      <TableRow key={col.key}>
        <TableCell className="table-head">{col.label}</TableCell>
        <TableCell>{renderField(col, data as any)}</TableCell>
      </TableRow>
    ))}
  </>
);

export const MediaSection = ({ config, data }: MediaSectionProps) => (
  <>
    <TableRow>
      <TableCell className="title">
        <Text customClass="font20 font-SemiBold">{config.title}</Text>
      </TableCell>
    </TableRow>

    <TableRow>
      {config.fields.map((col: any) => (
        <TableCell key={String(col.key)}>{renderField(col, data)}</TableCell>
      ))}
    </TableRow>
  </>
);
export const ThumbnailSection = ({ config, data }: ThumbnailSectionProps) => (
  <>
    <TableRow>
      <TableCell className="title">
        <Text customClass="font20 font-SemiBold">{config.title}</Text>
      </TableCell>
    </TableRow>

    <TableRow>
      {config.fields.map((col: any) => (
        <TableCell key={col.key}>{renderField(col, data)}</TableCell>
      ))}
    </TableRow>
  </>
);
