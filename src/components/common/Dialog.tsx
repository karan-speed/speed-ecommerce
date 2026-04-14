import * as React from "react";

import "../styles/modal.scss";
import {
  Dialog as CustomDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  type DialogProps,
} from "@mui/material";
import { buttonIcons } from "../images";
import Text from "./Text";
import classNames from "classnames";
import Button from "./Button";

interface IDialogProps extends DialogProps {
  title: string;
  submitButtonLabel: string;
  disabled?: boolean;
  open: boolean;
  customClass: string;
  children: React.ReactNode;
  isForm?: boolean;
  handleClose: () => void;
  handleSubmit?: (e?: React.FormEvent<HTMLFormElement>) => void;
}
export default function Dialog({
  open,
  title,
  children,
  disabled,
  isForm = false,
  customClass,
  submitButtonLabel,
  handleClose,
  handleSubmit,
}: IDialogProps) {
  const classes = classNames(`modal ${customClass}`);
  return (
    <React.Fragment>
      {isForm ? (
        <CustomDialog
          sx={{
            borderRadius: "5px",
          }}
          className={classes}
          onClose={handleClose}
          open={open}
        >
          <form className="form-modal" onSubmit={handleSubmit}>
            <DialogTitle>
              <Text customClass="dialog-title">{title}</Text>
              <IconButton onClick={handleClose}>{buttonIcons.close}</IconButton>
            </DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
            <DialogActions>
              <Button
                disabled={disabled}
                customClass="button-create-submit"
                label={submitButtonLabel}
                autoFocus
                type="submit"
              ></Button>
            </DialogActions>
          </form>
        </CustomDialog>
      ) : (
        <CustomDialog
          sx={{
            borderRadius: "5px",
          }}
          slotProps={{
            paper: {
              sx: {
                backgroundColor: "#fff",
                color: "rgba(0, 0, 0, 0.87)",
                boxShadow:
                  "0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)",
                position: "relative",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                maxHeight: "calc(100% - 64px)",
                maxWidth: "600px",
                width: "calc(100% - 64px)",
                transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                borderRadius: "4px",
                margin: "32px",
              },
            },
          }}
          className={classes}
          onClose={handleClose}
          open={open}
        >
          <DialogTitle>
            <Text customClass="dialog-title">{title}</Text>
            <IconButton onClick={handleClose}>{buttonIcons.close}</IconButton>
          </DialogTitle>
          <DialogContent dividers>{children}</DialogContent>
          <DialogActions>
            <Button
              customClass="button-create-submit"
              label={submitButtonLabel}
              autoFocus
              type="button"
              onClick={() => handleSubmit?.()}
            ></Button>
          </DialogActions>
        </CustomDialog>
      )}
    </React.Fragment>
  );
}
