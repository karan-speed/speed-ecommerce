import { useNavigate } from "react-router-dom";
import type { PageModuleProps } from "../../types";
import Box from "./Box";
import Text from "./Text";
import Button from "./Button";

export default function PageModule({
  title,
  description,
  buttonLable,
  children,
  onCreate,
  onUpdate,
  renderDetails,
}: PageModuleProps) {
  const navigate = useNavigate();
  return (
    <>
      <Box customClass="section-wrapper">
        <Box customClass="section-header-wrapper">
          <Text variant="h6" customClass="flex-text font-SemiBold font20">
            {title}
          </Text>
          <Text
            variant="body1"
            customClass="font14 grey-text"
            marginTop={"5px"}
          >
            {description}
          </Text>
        </Box>
        <Box>{children}</Box>
        <Box customClass="action-btn-wrapper">
          <Button
            customClass="button-create"
            variant="outlined"
            size="medium"
            label={buttonLable}
            onClick={onCreate}
            iconPosition="start"
            icon={"add"}
          />
        </Box>
      </Box>
    </>
  );
}
