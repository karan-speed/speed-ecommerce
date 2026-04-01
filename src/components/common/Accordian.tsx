import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionDetails,
  AccordionSummary,
  Accordion as CustomAccordian,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import classNames from "classnames";
import type { MenuItem } from "../../types";
import "../styles/Accordian.scss";
import Box from "./Box";

import Text from "./Text";

interface IAccordionProps {
  item: MenuItem;
  customClass?: string;
  expanded: string | false;
  setExpanded: (val: string | false) => void;
}
function Accordian({
  item,
  customClass,
  setExpanded,
  expanded,
}: IAccordionProps) {
  const classes = classNames(`accordian-wrapper ${customClass}`);
  const isOpen = expanded === item.text;

  const handleChange = () => {
    setExpanded(isOpen ? false : item.text);
  };
  return (
    <ListItem className="main-menu-accordian-list" disablePadding>
      <CustomAccordian
        expanded={isOpen}
        onChange={handleChange}
        className={classes}
        slots={{ root: "div" }}
        slotProps={{ heading: { component: "div" } }}
        disableGutters
        elevation={0}
      >
        <ListItemButton>
          <AccordionSummary
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0",
            }}
            expandIcon={<ExpandMoreIcon sx={{ justifySelf: "flex-end" }} />}
          >
            {" "}
            <Box display={"flex"} alignItems={"center"}>
              {item.icon}
              <Text marginLeft={"8px"}>{item.text}</Text>
            </Box>
          </AccordionSummary>
        </ListItemButton>

        <AccordionDetails>
          <List disablePadding>
            {item.children?.map((child) => (
              <ListItem key={child.text} disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary={child.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </CustomAccordian>
    </ListItem>
  );
}

export default Accordian;
