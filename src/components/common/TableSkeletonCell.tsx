import { TableCell } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

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
        <Skeleton
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
      <Skeleton
        variant="text"
        width={width || "70%"}
        height={height || 24}
        animation="wave"
      />
    </TableCell>
  );
};
