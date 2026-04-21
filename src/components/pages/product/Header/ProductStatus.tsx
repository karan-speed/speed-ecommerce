import Box from "../../../common/Box/Box";
import Text from "../../../common/Text/Text";
import Switch from "../../../common/Switch/Switch";
import type { TProduct } from "../../../../types";
import { buttonIcons } from "../../../images";
import Button from "../../../common/Button/Button";
interface IProductStatus {
  product: TProduct | null;
  onToggleSpotlight: () => void;
  onOpenMenu: (event: React.MouseEvent<HTMLElement>) => void;
  onUnarchive: () => void;
}
export default function ProductStatus({
  product,
  onToggleSpotlight,
  onOpenMenu,
  onUnarchive,
}: IProductStatus) {
  if (product?.visiblity) {
    return (
      <Box customClass="flex items-center">
        {" "}
        <Box gap={1} customClass="flex items-center">
          <Text fontSize={14} color="primary" font="semiBold">
            {product.spotlight ? "In Spotlight" : "Not In Spotlight"}
          </Text>
          <Switch
            checked={product?.spotlight}
            onChange={onToggleSpotlight}
            customClass="product-spotlight-switch"
          />
        </Box>
        <Box width={24} height={24} customClass="flex" onClick={onOpenMenu}>
          {buttonIcons.horizontalThreeDots}
        </Box>
      </Box>
    );
  }
  return (
    <Box mb={1}>
      <Button
        customClass="button-create-unarchive"
        variant="outlined"
        size="medium"
        label={"Unarchive"}
        icon="unarchive"
        onClick={onUnarchive}
      ></Button>
    </Box>
  );
}
