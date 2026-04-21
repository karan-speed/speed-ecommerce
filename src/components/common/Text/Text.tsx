import { Typography, type TypographyProps } from "@mui/material";
import classNames from "classnames";
import "./text.scss";
export interface TextProps extends TypographyProps {
  customClass?: string;
  size?: number;
  font?: "regular" | "semiBold" | "bold";
}
function Text({ customClass, font = "regular", ...props }: TextProps) {
  const classes = classNames(`text ${customClass}`);
  const fontFamilyMap = {
    regular: "Outfit-Regular",
    semiBold: "Outfit-SemiBold",
    bold: "Outfit-Bold",
  };

  return (
    <Typography
      fontSize={props.size}
      fontFamily={fontFamilyMap[font]}
      className={classes}
      {...props}
    >
      {props.children}
    </Typography>
  );
}

export default Text;
