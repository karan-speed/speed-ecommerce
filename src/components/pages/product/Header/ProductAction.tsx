import Box from "../../../common/Box/Box";
import Modal from "../../../common/Modal/Modal";
import Text from "../../../common/Text/Text";

interface IProductAction {
  title: string;
  customClass: string;
  buttonLabel: string;
  open: boolean;
  content: string;
  onSubmit: () => void;
  onClose: () => void;
}
export default function ProductAction({
  title,
  open,
  onSubmit,
  content,
  buttonLabel,
  customClass,
  onClose,
}: IProductAction) {
  return (
    <Modal
      isForm={false}
      customClass={customClass}
      title={title}
      open={open}
      onSubmit={onSubmit}
      onClose={onClose}
      actionButtonLabel={buttonLabel}
    >
      <Box>
        <Text customClass="default-text" fontSize={18}>
          {content}
        </Text>
      </Box>
    </Modal>
  );
}
