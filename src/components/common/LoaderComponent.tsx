import { Skeleton, type SkeletonProps } from "@mui/material";
import classNames from "classnames";

interface LoaderComponentTypes extends SkeletonProps {
  customClass: string;
}
function LoaderComponent({ customClass, children }: LoaderComponentTypes) {
  const classess = classNames(`${customClass} loader-componet`);
  return <Skeleton className={classess}>{children}</Skeleton>;
}

export default LoaderComponent;
