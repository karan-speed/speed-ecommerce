import Box from "../../common/Box";
import Text from "../../common/Text";
import { Link } from "react-router-dom";
import {
  dontHaveAnAccount,
  itGreatToHaveYouHere,
  signInYourAccount,
  signUp,
} from "../../messages";

import LoginForm from "./LoginForm";

function Login() {
  return (
    <>
      <Box className="common-grid-wrapper signin-signup-container-layout">
        <Text variant="h5" fontSize={30} customClass="font-bold">
          {signInYourAccount}
        </Text>
        <Text
          variant="h6"
          fontWeight={"400"}
          fontSize={18}
          mt={1}
          customClass="font-regular"
          lineHeight={"140%"}
        >
          {itGreatToHaveYouHere}
        </Text>
        <LoginForm />
        <Text
          textAlign={"center"}
          variant="h5"
          margin={"30px 0 20px 0"}
          customClass="font-SemiBold font16"
        >
          {dontHaveAnAccount}
          <Link className="link font-SemiBold ml-10" to="/register">
            {signUp}
          </Link>
        </Text>
      </Box>
    </>
  );
}

export default Login;
