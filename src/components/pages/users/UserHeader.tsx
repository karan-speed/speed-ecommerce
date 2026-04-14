import Box from "../../common/Box";
import Text from "../../common/Text";
import { logoName } from "../../messages";
import { handleLogOut } from "../../constants";
import { buttonIcons, logo } from "../../images";
import Button from "../../common/Button";

function UserHeader() {
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
          <Button onClick={handleLogOut} customClass="setting">
            {buttonIcons.settings}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default UserHeader;
