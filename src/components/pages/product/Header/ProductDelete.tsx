import Modal from "../../../common/Modal/Modal";
import Box from "../../../common/Box/Box";
import Text from "../../../common/Text/Text";
import { dialogText } from "../../../messages";
interface IProductDelete {
  open: boolean;
  onSubmit: () => void;
  onClose: () => void;
}
export default function ProductDelete({
  open,
  onSubmit,
  onClose,
}: IProductDelete) {
  return (
    <Modal
      isForm={false}
      customClass="product-delete-dialog"
      title="Delete Product"
      open={open}
      onSubmit={onSubmit}
      onClose={onClose}
      submitButtonLabel="Delete Product"
    >
      <Box>
        <Text customClass="default-text" fontSize={18}>
          {dialogText.delete}
        </Text>
      </Box>
    </Modal>
  );
}
