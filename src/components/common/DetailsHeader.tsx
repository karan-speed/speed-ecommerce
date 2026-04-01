import React from "react";
import Box from "./Box";
import Text from "./Text";
import { Link } from "react-router-dom";
import { buttonIcons } from "../images";
import { Breadcrumbs } from "@mui/material";
import type { Product } from "../../types";

interface DataProps {
  previousNavlink: string;
  data: Pick<Product, "id" | "name" | "description"> | null;
}
function DetailsHeader({ previousNavlink, data }: DataProps) {
  return (
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Text customClass="font28 font-SemiBold">{data?.name}</Text>
          <Box
            sx={{
              display: "flex",
              flexFlow: "column",
              alignItems: "flex-end",
            }}
          >
            {buttonIcons.horizontalThreeDots}
            <Box display={"flex"} alignItems={"center"}>
              {" "}
              <Text customClass="detail-id font-regular ">{data?.id}</Text>
              {buttonIcons.copyIcon}
            </Box>
          </Box>
        </Box>
        <Box>
          <Text customClass="font14 grey-text">{data?.description}</Text>
        </Box>
      </Box>
    </>
  );
}

export default DetailsHeader;
