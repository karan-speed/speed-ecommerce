import { forwardRef, useState, type FC } from "react";
import classNames from "classnames";
import Box from "./Box";
import { InputBase, InputAdornment, InputLabel, Alert } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import type { InputProps } from "../../types";
import "../styles/input.scss";
import { iconsForAlert } from "../images";
const Input: FC<InputProps> = forwardRef(
  (
    {
      showLabel,
      fullWidth,
      label,
      type = "text",
      isError,
      isPasswordVisible,
      helperText,
      error,
      value,
      customClass,
      elementClass,
      ...props
    },
    ref,
  ) => {
    const [inputType, setInputType] = useState("password");
    const toggleShowPassword = () => {
      if (inputType === "password") {
        setInputType("text");
      } else {
        setInputType("password");
      }
    };
    const clasess = classNames(`common-input ${customClass}`);
    const elementClasess = classNames(`input-element ${elementClass}`);
    const isPasswordField = type === "password";
    return (
      <Box className={elementClasess}>
        {showLabel && <InputLabel>{label}</InputLabel>}
        <InputBase
          className={clasess}
          error={isError}
          value={value}
          type={isPasswordField ? inputType : type}
          fullWidth={fullWidth}
          {...props}
          inputRef={ref}
          endAdornment={
            props?.endAdornment
              ? props.endAdornment
              : isPasswordVisible && (
                  <InputAdornment
                    className="password-visibility-icon"
                    position="end"
                  >
                    {inputType === "text" ? (
                      <VisibilityOffIcon onClick={toggleShowPassword} />
                    ) : (
                      <VisibilityIcon onClick={toggleShowPassword} />
                    )}
                  </InputAdornment>
                )
          }
        />
        {helperText && (
          <Alert
            sx={{ marginTop: "10px" }}
            severity={"error"}
            variant="standard"
            icon={iconsForAlert["error"]}
          >
            {helperText}
          </Alert>
        )}
      </Box>
    );
  },
);

export default Input;
