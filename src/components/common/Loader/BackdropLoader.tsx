import { Backdrop, Card, CardMedia, CardContent } from "@mui/material";
import type { IloaderProps } from "../../../types";
import classNames from "classnames";
import { speedPreloader } from "../../images";
import Text from "../Text/Text";
import "./loader.scss";
import { useAppSelector } from "../../../redux/hooks";

function BackdropLoader({ customClass }: IloaderProps) {
  const state = useAppSelector((state) => state.loader);

  const classes = classNames(`backdrop-loader ${customClass}`);
  return (
    <Backdrop open={state.open} className={classes}>
      <Card>
        <CardMedia component="img" image={speedPreloader} />
        <CardContent>
          <Text variant="h4" fontSize={14} align="center" className="grey-text">
            {state.text}
          </Text>
        </CardContent>
      </Card>
    </Backdrop>
  );
}

export default BackdropLoader;
