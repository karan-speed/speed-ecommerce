import { Outlet, Navigate } from "react-router-dom";
import Container from "../common/Container/Container";
import Box from "../common/Box/Box";
import { DiagonalDiv } from "../constants";
import { vector } from "../images";
import "../../styles/public.scss";
import { logoWhite } from "../images";
import { useAppSelector } from "../../redux/hooks";

function PublicRoute() {
  const access_token = useAppSelector((state) => state.auth.access_token);
  if (access_token) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <Box customClass="main-wrapper-container">
        <DiagonalDiv src={vector}>
          <Container customClass="ecommerce-container">
            <Box customClass="ecommerce-root-container">
              <Box component={"main"} customClass="section-container">
                <Box customClass="main-logo-login">
                  <img src={logoWhite} alt="logo-white" />
                </Box>
                <Box customClass="container-layout">
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
