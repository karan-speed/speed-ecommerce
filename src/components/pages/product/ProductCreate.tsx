import Input from "../../common/Input";
import { useFormik } from "formik";
import Dialog from "../../common/Dialog";
import { array, number, object, string } from "yup";
import { CallAPIInterface } from "../../constants";
import Button from "../../common/Button";
import { addImages } from "../../messages";
import { useEffect, useState } from "react";
import Box from "../../common/Box";
import { IconButton, MenuItem } from "@mui/material";
import { buttonIcons } from "../../images";
import SelectData from "../../common/SelectData";

interface ICreateProps {
  isCreateClicked: boolean;
  handlerCreateClick: () => void;
}
type Category = {
  id: string;
  name: string;
  visiblity: boolean;
  createdAt: string;
  updatedAt: string;
};
interface ProductImages {
  url: string;
}
interface Iproduct {
  category_id: string;
  name: string;
  description: string;
  price: string;
  stock: string;
  thumbnail: string;
  images: ProductImages[];
}
interface IproductForm {
  category_id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  thumbnail: string;
  images: ProductImages[];
}
function ProductCreate({ isCreateClicked, handlerCreateClick }: ICreateProps) {
  const [addImagesClicked, setAddImagesClicked] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState("");
  const handleGetCategory = async () => {
    try {
      const data = await CallAPIInterface<Category[]>({
        method: "GET",
        url: "/categories",
        isPrivate: true,
      });

      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createHandler = async (values: Iproduct): Promise<void> => {
    try {
      const product: IproductForm = {
        category_id: values.category_id,
        name: values.name,
        description: values.description,
        price: parseFloat(values.price),
        stock: parseInt(values.stock),
        thumbnail: values.thumbnail,
        images: values.images,
      };
      const data = await CallAPIInterface({
        method: "POST",
        url: "/products",
        data: product,
        isPrivate: true,
      });

      // window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      handlerCreateClick();
    }
  };

  const productSchema = object({
    category_id: string().required("Category  is required"),
    thumbnail: string().required("Thumbnail is required"),
    name: string().required("Name is required"),
    price: string().required("Price is required"),
    stock: string().required("Stock is required"),
    description: string().required("Description is required"),
    images: array(),
  });

  const { values, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik<Iproduct>({
      initialValues: {
        name: "",
        price: "",
        description: "",
        thumbnail: "",
        category_id: "",
        stock: "",
        images: [],
      },
      validationSchema: productSchema,
      onSubmit: (values) => {
        console.log("FORM SUBMITTED ✅", values);
        createHandler(values);
      },
    });
  const addImageHandler = () => {
    setAddImagesClicked(true);
    setFieldValue("images", [...values.images, { url: "" }]);
  };
  const removeImageHandler = (index: number) => {
    const newImages = values.images.filter((_, i) => i !== index);
    setFieldValue("images", newImages);
  };
  const setCategoryValue = (e: any) => {
    const value = String(e.target.value);
    setCategory(value);
    setFieldValue("category_id", value);
  };
  useEffect(() => {
    if (isCreateClicked) {
      handleGetCategory();
    }
  }, [isCreateClicked]);

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
          <Box>
            <SelectData
              variant="outlined"
              onChange={setCategoryValue}
              customClass="category-select-wrapper"
            >
              {categories.length > 0 &&
                categories.map((data, index) => (
                  <MenuItem
                    sx={{
                      fontFamily: "Outfit-Regular",
                      color: "#848b9e",
                      fontSize: "15px",
                    }}
                    value={data.id}
                    key={data.id}
                  >
                    {data.name}
                  </MenuItem>
                ))}
            </SelectData>
          </Box>
          {categories && (
            <>
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
                name="stock"
                id="stock"
                value={values.stock}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Product Stock"
                placeholder="Enter Product Stock"
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
                name="thumbnail"
                id="thumbnail"
                value={values.thumbnail}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Product Thumbnail"
                placeholder="Enter Product Thumbnail"
                showLabel
              />

              <Button
                onClick={addImageHandler}
                customClass="button-create"
                variant="outlined"
                size="medium"
                label={addImages}
                iconPosition="start"
                icon={"add"}
              />
              {addImagesClicked &&
                values.images.map((image, index) => (
                  <Box key={index} customClass="image-input-wrapper">
                    <Input
                      elementClass="mt-15"
                      name={`images[${index}].url`}
                      id={`images[${index}].url`}
                      value={image.url}
                      onChange={(e) => {
                        const newImages = [...values.images];
                        newImages[index].url = e.target.value;
                        setFieldValue("images", newImages);
                      }}
                      onBlur={handleBlur}
                      label={`Product Image ${index + 1}`}
                      placeholder="Enter Product Images URL"
                      showLabel
                    />
                    {values.images.length > 0 && (
                      <IconButton
                        onClick={() => removeImageHandler(index)}
                        sx={{
                          border: "1px solid #e4e9ee",
                          marginBottom: "-8px",
                        }}
                      >
                        {buttonIcons.close}
                      </IconButton>
                    )}
                  </Box>
                ))}
            </>
          )}
        </Dialog>
      )}
    </>
  );
}

export default ProductCreate;
// const obj = {
//   name: "H&M Derby Shoes",
//   price: 2999,
//   description:
//     "Derby shoes with open lacing at the front. Canvas linings and soles that are patterned underneath.",
//   thumbnail:
//     "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSV3b06gbecLSLjCApk7HFmzZYV1IIk0guN9nuvPOfVZqRIVUicLaHCF-wk69YX7CKTpRK0tOVb2f8dskbnwoJ6gwHo2GMSUU1xFkT-CCP5hJksf8eX3n-X5FY",
//   productImage1:
//     "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ49KZc0IvjyPQgJfv1HvlYTF2rp_Yw2rjqEfNDiRnhPD5BD-T36e-hJNzDUv7ePRpQtbPCw0pEJ2fObmIKvyspIh1CW88agVJvwWULhWQfi4ju5VdhMw",
//   productImage2:
//     "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR44UUhjtZVEdnQEnubvwBYEicTqc9GYIxPaY8Dac5ME2kqWHyO8rOVppn59r_aFUMF-cw3lFYAvnv2cbc99VXvWlDaONAWoOUcug8hoooG7Vp4pJ-Z0p0",
// };
