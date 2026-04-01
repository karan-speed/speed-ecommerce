import Box from "../../common/Box";
import Text from "../../common/Text";
import { Link } from "react-router-dom";
import {
  doYouAlreadyHaveAnAccount,
  itGreatToHaveYouHere,
  itGreatToHaveYouHereSignup,
  signIn,
  welcomeSignup,
} from "../../messages";
import RegisterForm from "./RegisterForm";
function Register() {
  return (
    <>
      <Box className="common-grid-wrapper signin-signup-container-layout">
        <Text variant="h5" fontSize={30} customClass="font-bold">
          {welcomeSignup}
        </Text>
        <Text
          variant="h6"
          fontWeight={"400"}
          fontSize={18}
          mt={1}
          customClass="font-regular"
          lineHeight={"140%"}
        >
          {itGreatToHaveYouHereSignup}
        </Text>
        <RegisterForm />
        <Text
          textAlign={"center"}
          variant="h5"
          margin={"30px 0 20px 0"}
          customClass="font-SemiBold font16"
        >
          {doYouAlreadyHaveAnAccount}
          <Link className="link font-SemiBold ml-10" to="/">
            {signIn}
          </Link>
        </Text>
      </Box>
    </>
  );
}

export default Register;
