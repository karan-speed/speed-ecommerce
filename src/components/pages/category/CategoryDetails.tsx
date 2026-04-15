import { useEffect } from "react";
import { CallAPIInterface, categoryAllSatsColumns } from "../../constants";
import { useParams } from "react-router-dom";
import type { TCategoryDetails } from "../../../types";
import Box from "../../common/Box";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setCategoryDetails } from "../../../redux/features/category/category.slice";
import Text from "../../common/Text";
import DataTable from "../../common/DataTable";
import CategorySummery from "./CategorySummery";
import CategoryProductList from "./CategoryProductList";
import { list } from "../../messages";

function CategoryDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const details = useAppSelector((state) => state.category.categoryDetails);
  const categoryListHandler = async () => {
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
    categoryListHandler();
  }, []);

  return (
    <Box customClass="category-detail-wrapper">
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
