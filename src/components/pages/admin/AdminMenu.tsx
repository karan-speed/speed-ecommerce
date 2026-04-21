import { List, MenuItem } from "@mui/material";
import Popover from "../../common/Popover/Popover";
import Box from "../../common/Box/Box";
import Text from "../../common/Text/Text";

interface MenuItemType {
  key: string;
  icon: React.ReactNode;
  label: string;
}

interface IMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  items: MenuItemType[];
  onAction: (key: string) => void;
}

export default function AdminMenu({
  anchorEl,
  onClose,
  onAction,
  items,
}: IMenuProps) {
  return (
    <Popover
      customClass="header-popover"
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <List>
        {items.map((item) => (
          <MenuItem
            onClick={() => {
              onAction(item.key);
              onClose();
            }}
          >
            <Box gap={1} customClass="flex items-center">
              {item.icon}
              <Text font="semiBold" size={14}>
                {item.label}
              </Text>
            </Box>
          </MenuItem>
        ))}
      </List>
    </Popover>
  );
}
