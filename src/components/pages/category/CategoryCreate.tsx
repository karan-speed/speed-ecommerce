import Input from "../../common/Input";
import { useFormik } from "formik";
import Dialog from "../../common/Dialog";
import { object, string } from "yup";
import { CallAPIInterface } from "../../constants";
import { useAppDispatch } from "../../../redux/hooks";
import {
  hideLoader,
  showLoader,
} from "../../../redux/features/loader/loader.slice";

interface ICreateProps {
  isCreateClicked: boolean;
  handlerCreateClick: () => void;
}
type CategoryFormValues = {
  name: string;
};
export default function CategoryCreate({
  isCreateClicked,
  handlerCreateClick,
}: ICreateProps) {
  const dispatch = useAppDispatch();

  const createHandler = async (values: CategoryFormValues): Promise<void> => {
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
      handlerCreateClick();
      dispatch(hideLoader());
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
