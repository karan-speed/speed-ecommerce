import { useEffect } from "react";
import { CallAPIInterface, categoryAllSatsColumns } from "../../constants";
import { useParams } from "react-router-dom";
import type { TCategoryDetails } from "../../../types";
import Box from "../../common/Box/Box";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setCategoryDetails } from "../../../redux/category/category.slice";
import Text from "../../common/Text/Text";
import DataTable from "../../common/Table/DataTable";
import CategorySummery from "./CategorySummery";
import CategoryProductList from "./CategoryProductList";
import CategoryDetailsHeader from "./CategoryDetailsHeader";

function CategoryDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const details = useAppSelector((state) => state.category.categoryDetails);
  const getCategoryDetails = async () => {
    try {
      const data = await CallAPIInterface<TCategoryDetails>({
        method: "GET",
        url: `/categories/${id}/details`,
      });

      dispatch(setCategoryDetails(data));
    } catch (error) {
      console.error(error);
    }
  };
  const config = categoryAllSatsColumns[0];

  const satsDetails = {
    total_products: details.total_products,
    total_stock: details.total_stock,
    average_price: details.average_price,
    active_products: details.active_products,
    spotlighted_products: details.spotlighted_products,
  };

  useEffect(() => {
    getCategoryDetails();
  }, []);

  return (
    <Box customClass="category-detail-wrapper">
      <CategoryDetailsHeader data={details.name} previousNavlink="categories" />
      <Box customClass="details-sats-content">
        <Text customClass="font28 font-SemiBold">{details.name}</Text>
        <DataTable customClass="category-details-table">
          <CategorySummery config={config.summery} data={satsDetails} />
        </DataTable>
        <CategoryProductList data={details.products} />
      </Box>
    </Box>
  );
}

export default CategoryDetails;
