import { useParams } from "react-router-dom";
import Box from "../../common/Box";
import DetailsHeader from "../../common/DetailsHeader";
import { CallAPIInterface, productAllDetailColumns } from "../../constants";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import {
  hideLoader,
  showLoader,
} from "../../../app/features/loader/loader.slice";
import type { Product, ProductImage } from "../../../types";
import DataTable from "../../common/DataTable";
import {
  DetailsSection,
  MediaSection,
  ThumbnailSection,
} from "../../common/Section";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  const dispatch = useAppDispatch();
  const handleGetProduct = async () => {
    try {
      dispatch(showLoader());
      const data = await CallAPIInterface<Product>({
        method: "GET",
        url: `/products/${id}`,
      });

      setProduct(data);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(hideLoader());
    }
  };
  useEffect(() => {
    if (id) {
      handleGetProduct();
    }
  }, [id]);
  const config = productAllDetailColumns[0];
  const detailsData = {
    visiblity: product?.visiblity as boolean,
    createdAt: product?.createdAt as string,
    updatedAt: product?.updatedAt as string,
  };
  const mediaData = {
    images: product?.images as ProductImage[],
  };
  const thumbnailData = {
    thumbnail: product?.thumbnail as string,
  };
  return (
    <>
      <Box customClass="detail-wrapper">
        {product && <DetailsHeader previousNavlink="products" data={product} />}
        <Box customClass="detail-content">
          <DataTable customClass="details-table">
            <DetailsSection config={config.details} data={detailsData} />
            <ThumbnailSection config={config.thumbnail} data={thumbnailData} />
            <MediaSection config={config.images} data={mediaData} />
          </DataTable>
        </Box>
      </Box>
    </>
  );
}

export default ProductDetails;
