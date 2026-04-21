import "../../../styles/Sidebar.scss";
import Box from "../../common/Box/Box";
import { Drawer, CardContent } from "@mui/material";
import classNames from "classnames";
import Item from "../../common/Item/Item";
import type { MenuItem } from "../../../types";
import { DashboardIcon, ProductIcon } from "../../constants";
import { buttonIcons } from "../../images";
import { useState } from "react";

interface ISidebarProps {
  customClass: string;
}
function Sidebar({ customClass }: ISidebarProps) {
  const classess = classNames(`sidebar-wrapper ${customClass}`);
  const [expanded, setExpanded] = useState<string | boolean>(false);
  const menuItems: MenuItem[] = [
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
    {
      type: "item",
      text: "Ref",
      path: "/ref",
    },
  ];
  return (
    <>
      <Box className="sidebar-container" component={"nav"} width={250}>
        <Drawer variant="permanent" className={classess}>
          <Box customClass="sidebar-content">
            {menuItems.map((item) => (
              <CardContent key={item.text} className="main-menu-item">
                <Item
                  item={item}
                  expanded={expanded}
                  setExpanded={() => setExpanded(!expanded)}
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
