import { useParams } from "react-router-dom";
import Box from "../../common/Box";
import DetailsHeader from "./ProductDetailsHeader";
import { CallAPIInterface, productAllDetailColumns } from "../../constants";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import DataTable from "../../common/DataTable";
import {
  DetailsSection,
  MediaSection,
  ThumbnailSection,
} from "../../common/Section";
import type { TProduct } from "../../../types";
import { setProduct } from "../../../redux/features/product/product.slice";

function ProductDetails() {
  const { id } = useParams();
  if (!id) return;
  const product = useAppSelector((state) => state.product.selectedProduct);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleGetProduct = async () => {
    try {
      if (id) {
        setLoading(true);

        const data = await CallAPIInterface<TProduct>({
          method: "GET",
          url: `/products/${id}`,
        });
        dispatch(setProduct(data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const config = productAllDetailColumns[0];

  const detailsData = {
    visiblity: product?.visiblity ?? false,
    category: {
      name: product?.category?.name || "Not found",
    },
    created_at: product?.created_at,
    updated_at: product?.updated_at,
  };

  const mediaData = {
    images: product?.images || [],
  };

  const thumbnailData = {
    thumbnail: product?.thumbnail || "",
  };
  useEffect(() => {
    if (id) {
      handleGetProduct();
    }
  }, [id]);

  return (
    <>
      <Box customClass="product-detail-wrapper">
        <DetailsHeader loading={loading} previousNavlink="products" />
        <Box customClass="product-detail-content">
          <DataTable customClass="product-details-table">
            <DetailsSection
              loading={loading}
              config={config.details}
              data={detailsData}
            />
            <ThumbnailSection
              loading={loading}
              config={config.thumbnail}
              data={thumbnailData}
            />
            <MediaSection
              loading={loading}
              config={config.images}
              data={mediaData}
            />
          </DataTable>
        </Box>
      </Box>
    </>
  );
}

export default ProductDetails;
