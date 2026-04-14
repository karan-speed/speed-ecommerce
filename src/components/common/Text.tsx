import { Typography, type TypographyProps } from "@mui/material";
import classNames from "classnames";
import "../styles/Text.scss";
export interface TextProps extends TypographyProps {
  customClass?: string;
  font?: "regular" | "semiBold" | "bold";
}
function Text({ customClass, font = "regular", ...props }: TextProps) {
  const classes = classNames(`common-text ${customClass}`);
  const fontFamilyMap = {
    regular: "Outfit-Regular",
    semiBold: "Outfit-SemiBold",
    bold: "Outfit-Bold",
  };

  return (
    <Typography fontFamily={fontFamilyMap[font]} className={classes} {...props}>
      {props.children}
    </Typography>
  );
}

export default Text;
