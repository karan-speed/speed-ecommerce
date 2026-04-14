import { Card, type CardProps } from "@mui/material";
import classNames from "classnames";
import "../styles/card.scss";
interface CustomCardTypes extends CardProps {
  customClass: string;
}
function CustomCard({ customClass, children, ...props }: CustomCardTypes) {
  const classess = classNames(`common-card ${customClass}`);
  return (
    <Card className={classess} {...props}>
      {children}
    </Card>
  );
}

export default CustomCard;
