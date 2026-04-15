import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  ListItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import "../styles/Item.scss";
import Accordian from "./Accordian";
import type { MenuItem } from "../../types";
interface ItemProps {
  item: MenuItem;
  onClick: () => void;
  expanded: string | boolean;
  setExpanded: (val: string | boolean) => void;
}
export default function Item({ item, expanded, setExpanded }: ItemProps) {
  const navigate = useNavigate();

  if (item.type === "accordion") {
    return (
      <List>
        <Accordian setExpanded={setExpanded} expanded={expanded} item={item} />
      </List>
    );
  }

  return (
    <List>
      <ListItem>
        <ListItemButton onClick={() => navigate(item.path || "/")}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
