import Box from "../../../common/Box/Box";
import Popper from "../../../common/Popper/Popper";
import { MenuItem } from "@mui/material";
import Text from "../../../common/Text/Text";

interface HeaderMenuProps {
  anchorEl: HTMLElement | null;
  onArchive: () => void;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function HeaderMenu({
  onArchive,
  onEdit,
  onDelete,
  onClose,
  anchorEl,
}: HeaderMenuProps) {
  const menu = [
    { label: "Archive", onClick: onArchive },
    { label: "Edit", onClick: onEdit },
    { label: "Delete", onClick: onDelete },
  ];

  return (
    <Popper
      arrow
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      placement="bottom-end"
    >
      <Box>
        {menu.map((item) => (
          <MenuItem
            onClick={() => {
              item.onClick();
              onClose();
            }}
          >
            <Text customClass="font-Medium font14">{item.label}</Text>
          </MenuItem>
        ))}
      </Box>
    </Popper>
  );
}
