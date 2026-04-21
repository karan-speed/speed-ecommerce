import Input from "../../common/Input/Input";
import { useFormik } from "formik";
import { array, object, string } from "yup";
import { CallAPIInterface } from "../../constants";
import {
  CATEGORY_REQUIRED_MESSAGE,
  DESCRIPTION_REQUIRED_MESSAGE,
  NAME_REQUIRED_MESSAGE,
  PRICE_REQUIRED_MESSAGE,
  STOCK_REQUIRED_MESSAGE,
  THUMBNAIL_REQUIRED_MESSAGE,
} from "../../messages";
import { useEffect } from "react";
import Box from "../../common/Box/Box";
import { MenuItem } from "@mui/material";
import SelectData from "../../common/Select/Select";
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
} from "../../../redux/product/product.slice";
import { hideLoader, showLoader } from "../../../redux/loader/loader.slice";
import { setCategories } from "../../../redux/category/category.slice";
import Modal from "../../common/Modal/Modal";
import FileUpload from "../../common/FileUpload";

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
  const categories = useAppSelector((state) => state.category.categories);
  const dispatch = useAppDispatch();
  const productImages = useAppSelector(
    (state) => state.product.selectedProduct?.images,
  );
  const getCategories = async () => {
    try {
      dispatch(showLoader({}));
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
      dispatch(showLoader({}));
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
      dispatch(showLoader({}));
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

  const setCategoryValue = (e: any) => {
    setFieldValue("category_id", String(e.target.value));
  };
  useEffect(() => {
    if (isOpen) {
      getCategories();
    }
  }, [isOpen]);
  const disabled = isEdit ? !isValid : !dirty || !isValid;
  useEffect(() => {
    if (isEdit && initialData && categories.length > 0) {
      setFieldValue("category_id", initialData.category?.id || "");
    }
  }, [categories, initialData]);
  return (
    <>
      <Modal
        isForm={true}
        disabled={disabled}
        variant={isEdit ? "default" : "fullscreen"}
        title={isEdit ? "Edit Product" : "Add New Product"}
        customClass={
          isEdit
            ? "product-edit-modal"
            : "product-create-modal fullscreen-modal"
        }
        open={isOpen}
        actionButtonLabel={isEdit ? "Save" : "Create"}
        onSubmit={handleSubmit}
        onClose={onClose}
      >
        <Box>
          {!isEdit && (
            <FileUpload
              title="Product Photo"
              description="Upload JPEG or PNG Image should be less than 2 mb"
              id="image_upload"
            />
          )}
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
            customClass={`category-select-wrapper ${!isEdit ? " modal-select" : ""}`}
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
          elementClass={`${!isEdit && "modal-input"}`}
          value={values.name}
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name ? errors.name : undefined}
          onChange={handleChange}
          onBlur={handleBlur}
          customClass="modal-input"
          label="Product Name"
          placeholder="Enter Product Name"
          showLabel={true}
        />
        <Input
          name="price"
          elementClass={`${!isEdit && "modal-input"}`}
          id="price"
          value={values.price}
          error={touched.price && Boolean(errors.price)}
          helperText={touched.price ? errors.price : undefined}
          onChange={handleChange}
          onBlur={handleBlur}
          label="Product Price"
          placeholder="Enter Product Price"
          showLabel
        />
        <Input
          name="stock"
          id="stock"
          elementClass={`${!isEdit && "modal-input"}`}
          value={values.stock}
          error={touched.stock && Boolean(errors.stock)}
          helperText={touched.stock ? errors.stock : undefined}
          onChange={handleChange}
          onBlur={handleBlur}
          label="Product Stock"
          placeholder="Enter Product Stock"
          showLabel
        />
        <Input
          name="description"
          elementClass={`${!isEdit && "modal-input"}`}
          id="description"
          value={values.description}
          error={touched.description && Boolean(errors.description)}
          helperText={touched.description ? errors.description : undefined}
          onChange={handleChange}
          onBlur={handleBlur}
          label="Product Description"
          placeholder="Enter Product Description"
          showLabel
        />
        <Input
          name="thumbnail"
          elementClass={`${!isEdit && "modal-input"}`}
          id="thumbnail"
          error={touched.thumbnail && Boolean(errors.thumbnail)}
          helperText={touched.thumbnail ? errors.thumbnail : undefined}
          value={values.thumbnail}
          onChange={handleChange}
          onBlur={handleBlur}
          label="Product Thumbnail"
          placeholder="Enter Product Thumbnail"
          showLabel
        />
      </Modal>
    </>
  );
}
