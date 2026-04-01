import Input from "../../common/Input";
import { useFormik } from "formik";
import Dialog from "../../common/Dialog";
import { array, number, object, string } from "yup";
import { CallAPIInterface } from "../../constants";

interface ICreateProps {
  isCreateClicked: boolean;
  handlerCreateClick: () => void;
}

function ProductCreate({ isCreateClicked, handlerCreateClick }: ICreateProps) {
  const createHandler = async (values: IproductForm): Promise<void> => {
    try {
      const data = await CallAPIInterface({
        method: "POST",
        url: "/products",
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
  const productSchema = object({
    category: string().required("Category is required"),
    thumbnail: string().required("Thumbnail is required"),
    name: string().required("Name is required"),
    price: number().required("Price is required"),
    description: string().required("Description is required"),
    stock: number().required("Stock is required"),
    images: array().required("images are required"),
  });
  interface ProductImages {
    url: string;
  }
  interface IproductForm {
    name: string;
    price: number;
    description: string;
    thumbnail: string;
    category: string;
    stock: number;
    images: ProductImages[];
  }
  const { values, handleBlur, handleChange, handleSubmit, dirty, isValid } =
    useFormik<IproductForm>({
      initialValues: {
        name: "",
        price: 0,
        description: "",
        thumbnail: "",
        category: "",
        stock: 0,
        images: [{ url: "" }],
      },
      validationSchema: productSchema,
      onSubmit: createHandler,
    });
  return (
    <>
      {isCreateClicked && (
        <Dialog
          title="Add New Product"
          customClass="category-create-modal"
          open={isCreateClicked}
          submitButtonLabel="Add"
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
            label="Product Name"
            placeholder="Enter Product Name"
            showLabel
          />
          <Input
            name="price"
            id="price"
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Product Price"
            placeholder="Enter Product Price"
            showLabel
          />
          <Input
            name="description"
            id="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Product Description"
            placeholder="Enter Product Description"
            showLabel
          />
          <Input
            name="name"
            id="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Product Thumbnail"
            placeholder="Enter Product Thumbnail"
            showLabel
          />
        </Dialog>
      )}
    </>
  );
}

export default ProductCreate;
