import type { EntityListProps } from "../../types";
import Box from "./Box/Box";
import Text from "./Text/Text";
import Button from "./Button/Button";

export default function EntityListPage({
  entity,
  description,
  buttonLabel,
  children,
  onSubmit,
}: EntityListProps) {
  return (
    <>
      <Box customClass="section-wrapper">
        <Box customClass="section-header-wrapper">
          <Text variant="h6" customClass="flex-text font-SemiBold font20">
            {entity}
          </Text>
          <Text
            variant="body1"
            customClass="font14 grey-text"
            marginTop={"5px"}
          >
            {description}
          </Text>
        </Box>
        <Box customClass="entity-content">{children}</Box>
        <Box customClass="action-btn-wrapper">
          <Button
            customClass="button-create"
            variant="outlined"
            size="medium"
            label={buttonLabel}
            onClick={onSubmit}
            iconPosition="start"
            icon={"add"}
          />
        </Box>
      </Box>
    </>
  );
}
