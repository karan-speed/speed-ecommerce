import { useState, type MouseEvent } from "react";
import { Avatar, IconButton, Paper } from "@mui/material";
import Container from "../../common/Container/Container";
import Box from "../../common/Box/Box";
import Text from "../../common/Text/Text";
import { buttonIcons, defaultUser, logo } from "../../images";
import { logoNameForAdmin, logoutText, profileText } from "../../messages";

import AdminMenu from "./AdminMenu";
import { logOut } from "../../../redux/thunks";
import { useAppDispatch } from "../../../redux/hooks";
function AdminHeader() {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const openMenu = (e: MouseEvent<HTMLElement>) =>
    setMenuAnchorEl(e.currentTarget);
  const closeMenu = () => setMenuAnchorEl(null);
  const ADMIN_MENU_ITEMS = [
    {
      key: "profile",
      icon: buttonIcons.profile,
      label: profileText,
    },
    {
      key: "logout",
      icon: buttonIcons.logoutPower,
      label: logoutText,
    },
  ];
  const MenuActions = (key: string) => {
    switch (key) {
      case "logout":
        dispatch(logOut());
        break;
      default:
        break;
    }
  };
  return (
    <Box className="header Mui-fixed">
      <Container maxWidth="xl">
        <Paper component={"header"}>
          <Box className="header-content">
            {" "}
            <Box customClass="flex items-center">
              <img src={logo} alt="ecommerce-logo" />
              <Box>
                <Text font="semiBold" ml={1} customClass="font14">
                  {logoNameForAdmin}
                </Text>
              </Box>
            </Box>
            <Box customClass="flex items-center">
              <IconButton className="setting">
                {buttonIcons.settings}
              </IconButton>
              <IconButton onClick={openMenu} className="default-user">
                <Avatar
                  sx={{ width: "34px", height: "34px" }}
                  src={defaultUser}
                  alt="default-user"
                />
              </IconButton>
              <AdminMenu
                items={ADMIN_MENU_ITEMS}
                anchorEl={menuAnchorEl}
                onClose={closeMenu}
                onAction={MenuActions}
              />
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default AdminHeader;
