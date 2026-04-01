import Input from "../../common/Input";
import { useFormik } from "formik";
import Dialog from "../../common/Dialog";
import { object, string } from "yup";
import { CallAPIInterface } from "../../constants";
import { useDispatch } from "react-redux";
import {
  hideLoader,
  showLoader,
} from "../../../app/features/loader/loader.slice";
interface ICreateProps {
  isCreateClicked: boolean;
  handlerCreateClick: () => void;
}
type CategoryFormValues = {
  name: string;
};
function CategoryCreate({ isCreateClicked, handlerCreateClick }: ICreateProps) {
  const createHandler = async (values: CategoryFormValues): Promise<void> => {
    try {
      const data = await CallAPIInterface({
        method: "POST",
        url: "/categories",
        data: values,
        isPrivate: true,
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      handlerCreateClick();
    }
  };
  const categorySchema = object({
    name: string().required("Category is required"),
  });
  const { values, handleBlur, handleChange, handleSubmit, dirty, isValid } =
    useFormik({
      initialValues: {
        name: "",
      },
      validationSchema: categorySchema,
      onSubmit: createHandler,
    });
  return (
    <>
      {isCreateClicked && (
        <Dialog
          title="Add New Category"
          customClass="category-create-modal"
          open={isCreateClicked}
          submitButtonLabel="Create"
          isForm={true}
          handleSubmit={handleSubmit}
          handleClose={handlerCreateClick}
        >
          <Input
            name="name"
            id="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Category Name"
            placeholder="Enter Category Name"
            showLabel
          />
        </Dialog>
      )}
    </>
  );
}

export default CategoryCreate;
