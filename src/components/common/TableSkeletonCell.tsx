import { TableCell } from "@mui/material";
import CustomSkeleton from "./CustomSkeleton";

interface TableSkeletonCellProps {
  type?: "text" | "image";
  width?: string | number;
  height?: string | number;
}

export const TableSkeletonCell = ({
  type = "text",
  width,
  height,
}: TableSkeletonCellProps) => {
  if (type === "image") {
    return (
      <TableCell>
        <CustomSkeleton
          variant="rectangular"
          width={width || 150}
          height={height || 150}
          animation="wave"
        />
      </TableCell>
    );
  }

  return (
    <TableCell>
      <CustomSkeleton
        variant="text"
        width={width || "70%"}
        height={height}
        animation="wave"
      />
    </TableCell>
  );
};
