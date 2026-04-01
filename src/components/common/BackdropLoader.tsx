import { Backdrop, Card, CardMedia, CardContent } from "@mui/material";

import React from "react";
import type { IloaderProps } from "../../types";
import classNames from "classnames";
import { speedPreloader } from "../images";
import Text from "./Text";
import "../styles/Loader.scss";
import { useAppSelector } from "../../app/hooks";

function BackdropLoader({ text = "Loading...", customClass }: IloaderProps) {
  const state = useAppSelector((state) => state.loader);
  const classes = classNames(`backdrop-loader ${customClass}`);
  return (
    <Backdrop open={state.open} className={classes}>
      <Card>
        <CardMedia component="img" image={speedPreloader} />
        <CardContent>
          <Text variant="h4" fontSize={14} align="center" className="grey-text">
            {text}
          </Text>
        </CardContent>
      </Card>
    </Backdrop>
  );
}

export default BackdropLoader;
