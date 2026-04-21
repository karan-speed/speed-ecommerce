import Box from "../../common/Box/Box";
import Text from "../../common/Text/Text";
import { logoName } from "../../messages";
import { logOut } from "../../../redux/thunks";
import { buttonIcons, logo } from "../../images";
import Button from "../../common/Button/Button";
import { useAppDispatch } from "../../../redux/hooks";

function UserHeader() {
  const dispatch = useAppDispatch();
  return (
    <Box className="ecommerce-header">
      <Box className="ecommerce-header-container">
        <Box sx={{ display: "flex", alignItems: "center", width: "300px" }}>
          <img src={logo} alt="ecommerce-logo" style={{ marginRight: "8px" }} />
          <Box>
            <Text customClass="font-SemiBold">{logoName}</Text>
          </Box>
        </Box>
        <Box>
          <Button onClick={() => dispatch(logOut())} customClass="setting">
            {buttonIcons.settings}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default UserHeader;
