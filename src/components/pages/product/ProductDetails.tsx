import { useParams } from "react-router-dom";
import Box from "../../common/Box";
import DetailsHeader from "./ProductDetailsHeader";
import { CallAPIInterface, productAllDetailColumns } from "../../constants";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  hideLoader,
  showLoader,
} from "../../../redux/features/loader/loader.slice";

import DataTable from "../../common/DataTable";
import {
  DetailsSection,
  MediaSection,
  ThumbnailSection,
} from "../../common/Section";
import type { IProductGetResponse } from "../../../types";
import { setProduct } from "../../../redux/features/product/product.slice";
import PageLoader from "../../common/PageLoader";

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
        dispatch(showLoader());
        const data = await CallAPIInterface<IProductGetResponse>({
          method: "GET",
          url: `/products/${id}`,
        });
        dispatch(setProduct(data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      dispatch(hideLoader());
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
  if (loading || !product) {
    return <PageLoader loading={loading} text="Loading" />;
  }
  return (
    <>
      <Box customClass="product-detail-wrapper">
        {product && (
          <DetailsHeader loading={loading} previousNavlink="products" />
        )}
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
