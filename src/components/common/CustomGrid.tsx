import type { GridProps } from "@mui/material";
import classNames from "classnames";
import { Grid } from "@mui/material";

interface CustomGridTypes extends GridProps {
  customClass?: string;
}
export default function CustomGrid({
  customClass,
  children,
  ...props
}: CustomGridTypes) {
  const classess = classNames(`common-grid ${customClass}`);
  return (
    <Grid className={classess} {...props}>
      {children}
    </Grid>
  );
}
