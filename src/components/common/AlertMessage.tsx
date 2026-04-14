import { Alert, AlertTitle, Snackbar, Slide } from "@mui/material";
import classNames from "classnames";
import "../styles/alert.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { hideToast } from "../../redux/features/error/error.slice";
import { iconsForAlert } from "../images";
interface IAlertProps {
  customClass?: string;
}
function AlertMessage({ customClass }: IAlertProps) {
  const dispatch = useAppDispatch();
  const { open, severity, message, title } = useAppSelector(
    (state) => state.toast,
  );
  const classes = classNames(`${customClass} common-alert`);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") return;
    dispatch(hideToast());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={1500}
      onClose={handleClose}
      slots={{ transition: Slide }}
      slotProps={{ transition: { direction: "left" } }}
    >
      <Alert
        severity={severity}
        variant="standard"
        icon={iconsForAlert[severity]}
        onClose={handleClose}
        className={classes}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AlertMessage;
