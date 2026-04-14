import { Switch, type SwitchProps } from "@mui/material";
import classNames from "classnames";
import "../styles/switch.scss";
interface ISwitchProps extends SwitchProps {
  customClass: string;
}
function CustomSwitch({ customClass, ...props }: ISwitchProps) {
  const classess = classNames(`common-switch ${customClass}`);
  return <Switch {...props} className={classess} />;
}

export default CustomSwitch;
