import { Skeleton, type SkeletonProps } from "@mui/material";
import classNames from "classnames";
import "../styles/skeleton.scss";
interface ISkeletonProps extends SkeletonProps {
  customClass?: string;
}
function CustomSkeleton({ customClass, ...props }: ISkeletonProps) {
  const classess = classNames(`common-skeleton ${customClass}`);
  return <Skeleton className={classess} {...props} />;
}

export default CustomSkeleton;
