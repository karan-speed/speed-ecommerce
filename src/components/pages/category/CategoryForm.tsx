import Input from "../../common/Input/Input";
import { useFormik } from "formik";
import Modal from "../../common/Modal/Modal";
import { object, string } from "yup";
import { CallAPIInterface } from "../../constants";
import { useAppDispatch } from "../../../redux/hooks";
import { hideLoader, showLoader } from "../../../redux/loader/loader.slice";
import type { TCategoryForm } from "../../../types";

interface ICreateProps {
  open: boolean;
  onClose: () => void;
}

export default function CategoryForm({ open, onClose }: ICreateProps) {
  const dispatch = useAppDispatch();

  const createHandler = async (values: TCategoryForm): Promise<void> => {
    try {
      dispatch(showLoader());
      const data = await CallAPIInterface({
        method: "POST",
        url: "/categories",
        data: values,
        isPrivate: true,
      });
      await CallAPIInterface({
        method: "GET",
        url: "/categories",
        isPrivate: true,
      });
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
      dispatch(hideLoader());
    }
  };
  const categorySchema = object({
    name: string().required("Category is required"),
  });
  const {
    values,
    handleBlur,
    errors,
    touched,
    handleChange,
    handleSubmit,
    dirty,
    isValid,
  } = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: categorySchema,
    onSubmit: createHandler,
  });
  const disabled = !dirty || !isValid;
  const renderCreateBody = () => {
    if (open)
      return (
        <Modal
          disabled={disabled}
          title="Add New Category"
          customClass="category-create-modal"
          open={open}
          actionButtonLabel="Create"
          isForm={true}
          onSubmit={handleSubmit}
          onClose={onClose}
        >
          <Input
            name="name"
            id="name"
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name ? errors.name : undefined}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Category Name"
            placeholder="Enter Category Name"
            showLabel
          />
        </Modal>
      );
  };
  return <>{renderCreateBody()}</>;
}
