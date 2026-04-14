import "../../styles/Sidebar.scss";
import Box from "../../common/Box";
import { Drawer, CardContent } from "@mui/material";
import classNames from "classnames";
import Item from "../../common/Item";
import type { MenuItem } from "../../../types";
import { DashboardIcon, ProductIcon } from "../../constants";
import { buttonIcons } from "../../images";
import { useState } from "react";

interface ISidebarProps {
  customClass: string;
}
function Sidebar({ customClass }: ISidebarProps) {
  const classess = classNames(`sidebar-wrapper ${customClass}`);
  const [expanded, setExpanded] = useState<string | false>(false);
  const menuItems: MenuItem[] = [
    {
      type: "item",
      text: "Admin",
      icon: buttonIcons.admin,
      path: "/admin",
    },
    {
      type: "item",
      text: "Memo",
      path: "/temperory",
    },
    {
      type: "item",
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
    },
    {
      type: "item",
      text: "Categories",
      icon: buttonIcons.category,
      path: "/categories",
    },
    {
      type: "item",
      text: "Products",
      icon: <ProductIcon />,
      path: "/products",
    },
  ];
  return (
    <>
      <Box className="sidebar-container" component={"nav"} width={"250px"}>
        <Drawer variant="permanent" className={classess}>
          <Box sx={{ padding: "10px 12px", height: "100%" }}>
            {menuItems.map((item) => (
              <CardContent key={item.text} className="main-menu-item">
                <Item
                  item={item}
                  expanded={expanded}
                  setExpanded={setExpanded}
                />
              </CardContent>
            ))}
          </Box>
        </Drawer>
      </Box>
    </>
  );
}

export default Sidebar;
