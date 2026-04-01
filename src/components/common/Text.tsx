import { Typography } from "@mui/material";
import type { TextProps } from "../../types";
import classNames from "classnames";
import "../styles/Text.scss";

function Text({ customClass, ...props }: TextProps) {
  const classes = classNames(`common-text ${customClass}`);
  return (
    <Typography className={classes} {...props}>
      {props.children}
    </Typography>
  );
}

export default Text;
