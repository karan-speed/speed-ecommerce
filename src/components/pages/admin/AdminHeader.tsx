import { useState } from "react";
import {
  Avatar,
  Container,
  IconButton,
  List,
  MenuItem,
  Paper,
} from "@mui/material";
import Box from "../../common/Box";
import Text from "../../common/Text";
import { buttonIcons, defaultUser, logo } from "../../images";
import { logoNameForAdmin, logoutText, profileText } from "../../messages";
import Popover from "../../common/Popover";
import { handleCategory, handleLogOut } from "../../constants";

function AdminHeader() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box minHeight={0} className="header Mui-fixed">
      <Container maxWidth="xl">
        <Paper component={"header"}>
          <Box className="header-content">
            {" "}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "300px",
              }}
            >
              <img
                src={logo}
                alt="ecommerce-logo"
                style={{ marginRight: "8px" }}
              />
              <Box>
                <Text font="semiBold" customClass="font14">
                  {logoNameForAdmin}
                </Text>
              </Box>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <IconButton className="setting">
                {buttonIcons.settings}
              </IconButton>
              <IconButton onClick={handleProfileClick} className="default-user">
                <Avatar
                  sx={{ width: "34px", height: "34px" }}
                  src={defaultUser}
                  alt="default-user"
                />
              </IconButton>
              <Popover
                customClass="header-popover"
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
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
                  <MenuItem onClick={handleCategory}>
                    <Box
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {buttonIcons.profile}
                      <Text font="regular" marginLeft={"8px"}>
                        {profileText}
                      </Text>
                    </Box>
                  </MenuItem>
                  <MenuItem onClick={handleLogOut}>
                    <Box display={"flex"} alignItems={"center"}>
                      {buttonIcons.logoutPower}
                      <Text font="regular" marginLeft={"8px"}>
                        {logoutText}
                      </Text>
                    </Box>
                  </MenuItem>
                </List>
              </Popover>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default AdminHeader;
