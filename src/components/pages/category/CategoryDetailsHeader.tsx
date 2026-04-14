import { Breadcrumbs } from "@mui/material";
import Box from "../../common/Box";
import Text from "../../common/Text";

import { Link } from "react-router-dom";

interface CategoryHeaderProps {
  previousNavlink?: string;
  data: any;
}
function CategoryDetailsHeader({ previousNavlink, data }: CategoryHeaderProps) {
  return (
    <>
      {" "}
      <>
        {" "}
        <Box component={"nav"}>
          <Breadcrumbs
            sx={{ padding: 0 }}
            component={"ol"}
            separator="›"
            aria-label="breadcrumb"
          >
            <Link
              to={`/${previousNavlink}`}
              style={{
                color: "#2a67ff",
                fontSize: "14px",
                fontFamily: "Outfit-Regular",
                textDecoration: "none",
                textTransform: "capitalize",
              }}
            >
              {previousNavlink}
            </Link>
            <Text customClass="grey-text font14">Details</Text>
          </Breadcrumbs>
        </Box>
        <Box className="header-content">
          <Box display={"flex"} gap={1} flexDirection={"column"}>
            <Text customClass="font24">{data?.title}</Text>
            <Text customClass="font14 grey-text">{data?.description}</Text>
          </Box>
        </Box>
      </>
    </>
  );
}

export default CategoryDetailsHeader;
