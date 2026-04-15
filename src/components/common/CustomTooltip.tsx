import { Tooltip, type TooltipProps } from "@mui/material";
import classNames from "classnames";
import Box from "./Box";
import type { ReactNode } from "react";
import Text from "./Text";
import "../styles/tooltip.scss";
interface ICustomTooltip extends Omit<TooltipProps, "title"> {
  customClass?: string;
  icon?: ReactNode;
  label?: string;
}
function CustomTooltip({
  customClass,
  icon,
  label,
  children,
  ...props
}: ICustomTooltip) {
  const classess = classNames("common-tooltip", customClass);
  const tooltipContent = (
    <Box display="flex" alignItems="center" gap={0.5}>
      {icon && icon}
      <Text customClass="font14">{label}</Text>
    </Box>
  );
  return (
    <Tooltip title={tooltipContent} classes={{ popper: classess }} {...props}>
      {children}
    </Tooltip>
  );
}

export default CustomTooltip;
