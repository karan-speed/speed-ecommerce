import classNames from "classnames";
import { Select, type BaseSelectProps } from "@mui/material";
import "../styles/select.scss";
interface selectPropsType extends BaseSelectProps {
  customClass: string;
}
export default function SelectData({
  children,
  customClass,

  onChange,
}: selectPropsType) {
  const classes = classNames(`common-select-wrapper ${customClass}`);

  return (
    <Select className={classes} onChange={onChange}>
      {children}
    </Select>
  );
}
