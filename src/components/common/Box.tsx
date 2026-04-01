import { Box as CustomBox } from "@mui/material";
import type { BoxProps } from "@mui/material";
import classNames from "classnames";
import "../styles/Box.scss";
interface IBoxProps extends BoxProps {
  customClass?: string;
}
export default function Box({ customClass, ...props }: IBoxProps) {
  const classes = classNames(`common-box ${customClass}`);
  return (
    <CustomBox className={classes} {...props}>
      {props.children}
    </CustomBox>
  );
}
