import { Skeleton, TableCell, TableRow } from "@mui/material";
import Text from "./Text";
import { renderProductField } from "../constants";
import type { ProductColumnProps, TPartialProduct } from "../../types";
import { TableSkeletonCell } from "./TableSkeletonCell";
import CustomSkeleton from "./CustomSkeleton";

interface DetailsSectionProps {
  config: ProductColumnProps["details"];
  data: TPartialProduct;
  loading: boolean;
}
interface MediaSectionProps {
  config: ProductColumnProps["images"];
  data: TPartialProduct;
  loading: boolean;
}
interface ThumbnailSectionProps {
  config: ProductColumnProps["thumbnail"];
  data: TPartialProduct;
  loading: boolean;
}

export const DetailsSection = ({
  config,
  data,
  loading,
}: DetailsSectionProps) => (
  <>
    <TableRow>
      <TableCell className="title">
        {loading ? (
          <CustomSkeleton customClass="table-title-wrapper" animation="wave" />
        ) : (
          <Text font="semiBold" customClass="font20">
            {config.title}
          </Text>
        )}
      </TableCell>
    </TableRow>

    {config.fields.map((col: any) => (
      <TableRow key={col.key}>
        <TableCell className="table-head">
          {loading ? (
            <CustomSkeleton
              customClass="table-head-wrapper"
              variant="text"
              animation="wave"
            />
          ) : (
            <Text>{col.label}</Text>
          )}
        </TableCell>
        <TableCell>
          {loading ? (
            <CustomSkeleton
              variant="text"
              width="100%"
              height={20}
              animation="wave"
            />
          ) : (
            <Text>{renderProductField(col, data as any)}</Text>
          )}
        </TableCell>
      </TableRow>
    ))}
  </>
);

export const MediaSection = ({ config, data, loading }: MediaSectionProps) => (
  <>
    <TableRow>
      <TableCell className="title">
        {loading ? (
          <CustomSkeleton
            customClass="table-title-wrapper"
            variant="text"
            animation="wave"
          />
        ) : (
          <Text font="semiBold" customClass="font20">
            {config.title}
          </Text>
        )}
      </TableCell>
    </TableRow>

    {config.fields.map((col: any) => (
      <TableRow key={col.key}>
        {loading ? (
          <TableSkeletonCell type="image" />
        ) : (
          <TableCell>{renderProductField(col, data as any)}</TableCell>
        )}
      </TableRow>
    ))}
  </>
);
export const ThumbnailSection = ({
  config,
  data,
  loading,
}: ThumbnailSectionProps) => (
  <>
    <TableRow>
      <TableCell className="title">
        {loading ? (
          <CustomSkeleton
            customClass="table-title-wrapper"
            variant="text"
            animation="wave"
          />
        ) : (
          <Text font="semiBold" customClass="font20">
            {config.title}
          </Text>
        )}
      </TableCell>
    </TableRow>

    {config.fields.map((col: any) => (
      <TableRow key={col.key}>
        {loading ? (
          <TableSkeletonCell type="image" />
        ) : (
          <TableCell>{renderProductField(col, data as any)}</TableCell>
        )}
      </TableRow>
    ))}
  </>
);
