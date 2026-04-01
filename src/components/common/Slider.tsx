import classNames from "classnames";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/slider.scss";
import { IconButton } from "@mui/material";
import { buttonIcons } from "../images";
interface SliderProps {
  children: React.ReactNode[] | undefined;
  customClass: string;
}

function Slider({ children, customClass }: SliderProps) {
  const classess = classNames("slider-container", customClass);
  return (
    <Carousel
      className={classess}
      showThumbs={false}
      showArrows={true}
      showStatus={false}
      renderArrowPrev={(onclickHandler, hasPrev) =>
        hasPrev && (
          <IconButton onClick={onclickHandler}>{buttonIcons.back}</IconButton>
        )
      }
      renderArrowNext={(onclickHandler, hasNext) =>
        hasNext && (
          <IconButton onClick={onclickHandler}>{buttonIcons.next}</IconButton>
        )
      }
    >
      {children}
    </Carousel>
  );
}

export default Slider;
