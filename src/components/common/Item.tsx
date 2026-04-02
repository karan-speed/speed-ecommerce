import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  ListItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { ItemProps } from "../../types";
import "../styles/Item.scss";
import Accordian from "./Accordian";

export default function Item({ item, expanded, setExpanded }: ItemProps) {
  const navigate = useNavigate();

  if (item.type === "accordion") {
    return (
      <List>
        {/* <Accordian setExpanded={setExpanded} expanded={expanded} item={item} /> */}
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
