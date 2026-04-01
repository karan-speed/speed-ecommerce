import { Outlet, Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import Box from "../common/Box";
import { DiagonalDiv } from "../constants";
import { vector } from "../images";
import "../styles/public.scss";
import { logoWhite } from "../images";
import { useAppSelector } from "../../app/hooks";

function PublicRoute() {
  const access_token = useAppSelector((state) => state.auth.access_token);
  if (access_token) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <Box className="main-wrapper-container">
        <DiagonalDiv src={vector}>
          <Container>
            <Box className="ecommerce-root-container">
              <Box component={"main"} className="section-container">
                <Box className="main-logo-login">
                  <img src={logoWhite} alt="logo-white" />
                </Box>
                <Box className="container-layout">
                  <Outlet />
                </Box>
              </Box>
            </Box>
          </Container>
        </DiagonalDiv>
      </Box>
    </>
  );
}

export default PublicRoute;
