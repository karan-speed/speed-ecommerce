import { Skeleton, TableCell, TableRow } from "@mui/material";
import Text from "./Text";
import { renderProductField } from "../constants";
import type {
  ProductColumnProps,
  TPartialProductGetResponse,
} from "../../types";
import { TableSkeletonCell } from "./TableSkeletonCell";

interface DetailsSectionProps {
  config: ProductColumnProps["details"];
  data: TPartialProductGetResponse;
  loading: boolean;
}
interface MediaSectionProps {
  config: ProductColumnProps["images"];
  data: TPartialProductGetResponse;
  loading: boolean;
}
interface ThumbnailSectionProps {
  config: ProductColumnProps["thumbnail"];
  data: TPartialProductGetResponse;
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
          <Skeleton variant="text" width="40%" height={32} animation="wave" />
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
            <Skeleton variant="text" width="40%" height={32} animation="wave" />
          ) : (
            <Text>{col.label}</Text>
          )}
        </TableCell>
        <TableCell>
          {loading ? (
            <Skeleton
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
          <Skeleton variant="text" width="40%" height={32} animation="wave" />
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
          <Skeleton variant="text" width="40%" height={32} animation="wave" />
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
