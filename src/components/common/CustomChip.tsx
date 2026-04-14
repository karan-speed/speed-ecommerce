import { Chip, type ChipProps } from "@mui/material";
import classNames from "classnames";
import "../styles/chip.scss";
interface CustomChipTypes extends ChipProps {
  customClass: string;
}
function CustomChip({ label, customClass, ...props }: CustomChipTypes) {
  const classess = classNames(`${customClass} common-chip`);
  return <Chip className={classess} label={label} {...props} />;
}

export default CustomChip;
