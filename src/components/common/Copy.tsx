import { useState } from "react";
import { buttonIcons } from "../images";
import CustomTooltip from "./CustomTooltip";

function Copy({ value }: { value: string }) {
  const [open, setOpen] = useState(false);
  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 500);
  };
  return (
    <CustomTooltip
      open={open}
      disableHoverListener
      placement="top"
      onClick={(e) => handleCopy(e, value)}
      label="Copied"
      icon={buttonIcons.checked}
    >
      {buttonIcons.copyIcon}
    </CustomTooltip>
  );
}

export default Copy;
