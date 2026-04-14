import Input from "../../common/Input";
import { useFormik } from "formik";
import Dialog from "../../common/Dialog";
import { array, object, string } from "yup";
import { CallAPIInterface } from "../../constants";
import Button from "../../common/Button";
import {
  addImages,
  CATEGORY_REQUIRED_MESSAGE,
  DESCRIPTION_REQUIRED_MESSAGE,
  NAME_REQUIRED_MESSAGE,
  PRICE_REQUIRED_MESSAGE,
  STOCK_REQUIRED_MESSAGE,
  THUMBNAIL_REQUIRED_MESSAGE,
} from "../../messages";
import { useEffect, useState } from "react";
import Box from "../../common/Box";
import { IconButton, MenuItem } from "@mui/material";
import { buttonIcons } from "../../images";
import SelectData from "../../common/SelectData";
import {
  mapProductResponseToForm,
  type IProductForm,
  type TCategoryList,
  type TProduct,
  type productSchema,
} from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  addProduct,
  updateProduct,
} from "../../../redux/features/product/product.slice";
import {
  hideLoader,
  showLoader,
} from "../../../redux/features/loader/loader.slice";
import { setCategories } from "../../../redux/features/category/category.slice";

interface IProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: TProduct | null;
  isEdit?: boolean;
}

export default function ProductForm({
  isOpen,
  onClose,
  onSuccess,
  initialData,
  isEdit = false,
}: IProductFormProps) {
  const [addImagesClicked, setAddImagesClicked] = useState(false);

  const categories = useAppSelector((state) => state.category.categories);
  const dispatch = useAppDispatch();
  const handleGetCategory = async () => {
    try {
      dispatch(showLoader());
      const data = await CallAPIInterface<TCategoryList[]>({
        method: "GET",
        url: "/categories",
        isPrivate: true,
      });

      dispatch(setCategories(data));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(hideLoader());
    }
  };

  const createHandler = async () => {
    try {
      dispatch(showLoader());
      const product: IProductForm = {
        category_id: String(values.category_id),
        name: values.name,
        description: values.description,
        price: parseFloat(values.price),
        stock: parseInt(values.stock),
        thumbnail: values.thumbnail,
        images: values.images,
      };
      const data = await CallAPIInterface<TProduct>({
        method: "POST",
        url: "/products",
        data: product,
        isPrivate: true,
      });
      dispatch(addProduct(data));
      onSuccess();
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
      dispatch(hideLoader());
    }
  };
  const updateHandler = async () => {
    try {
      dispatch(showLoader());
      const product: IProductForm = {
        category_id: String(values.category_id),
        name: values.name,
        description: values.description,
        price: parseFloat(values.price),
        stock: parseInt(values.stock),
        thumbnail: values.thumbnail,
        images: values.images,
      };
      const data = await CallAPIInterface<TProduct>({
        method: "PATCH",
        url: `/products/${initialData?.id}`,
        data: product,
        isPrivate: true,
      });

      dispatch(updateProduct(data));
      onSuccess();
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
      dispatch(hideLoader());
    }
  };

  const productSchema = object({
    category_id: string().required(CATEGORY_REQUIRED_MESSAGE),
    thumbnail: string().required(THUMBNAIL_REQUIRED_MESSAGE),
    name: string().required(NAME_REQUIRED_MESSAGE),
    price: string().required(PRICE_REQUIRED_MESSAGE),
    stock: string().required(STOCK_REQUIRED_MESSAGE),
    description: string().required(DESCRIPTION_REQUIRED_MESSAGE),
    images: array(),
  });
  const defaultValues: productSchema = {
    category_id: "",
    name: "",
    price: "",
    description: "",
    stock: "",
    thumbnail: "",
    images: [],
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
    dirty,
    isValid,
  } = useFormik({
    enableReinitialize: true,
    initialValues:
      isEdit && initialData
        ? mapProductResponseToForm(initialData)
        : defaultValues,
    validationSchema: productSchema,
    onSubmit: isEdit ? updateHandler : createHandler,
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
    setFieldValue("category_id", String(e.target.value));
  };
  useEffect(() => {
    if (isOpen) {
      handleGetCategory();
    }
  }, [isOpen]);
  const disabled = isEdit ? !isValid : !dirty || !isValid;
  useEffect(() => {
    if (isEdit && initialData?.images?.length) {
      setAddImagesClicked(true);
    }
  }, [isEdit, initialData]);
  useEffect(() => {
    if (isEdit && initialData && categories.length > 0) {
      setFieldValue("category_id", initialData.category?.id || "");
    }
  }, [categories, initialData]);
  return (
    <>
      <Dialog
        disabled={disabled}
        title={isEdit ? "Edit Product" : "Add New Product"}
        customClass={isEdit ? "product-edit-modal" : "product-create-modal"}
        open={isOpen}
        submitButtonLabel={"Save"}
        isForm={true}
        handleSubmit={handleSubmit}
        handleClose={onClose}
      >
        <Box>
          <SelectData
            name="category_id"
            onBlur={handleBlur}
            error={touched.category_id && Boolean(errors.category_id)}
            helperText={touched.category_id && errors.category_id}
            placeholder="Select Product Category"
            value={values.category_id}
            onChange={setCategoryValue}
            variant="outlined"
            autoWidth
            customClass="category-select-wrapper"
          >
            {categories.length > 0 &&
              categories.map((data) => (
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

        <Input
          name="name"
          id="name"
          value={values.name}
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
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
          error={touched.price && Boolean(errors.price)}
          helperText={touched.price && errors.price}
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
          error={touched.stock && Boolean(errors.stock)}
          helperText={touched.stock && errors.stock}
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
          error={touched.description && Boolean(errors.description)}
          helperText={touched.description && errors.description}
          onChange={handleChange}
          onBlur={handleBlur}
          label="Product Description"
          placeholder="Enter Product Description"
          showLabel
        />
        <Input
          name="thumbnail"
          id="thumbnail"
          error={touched.thumbnail && Boolean(errors.thumbnail)}
          helperText={touched.thumbnail && errors.thumbnail}
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
        {(addImagesClicked || isEdit) &&
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
      </Dialog>
    </>
  );
}
