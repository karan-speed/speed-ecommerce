import type { TCategoryDetailProduct } from "../../../types";
import ListCard from "../product/ListCard";
import CustomGrid from "../../common/CustomGrid";
import Text from "../../common/Text";
import { list } from "../../messages";

interface CategoryProductList {
  data: TCategoryDetailProduct[];
}

function CategoryProductList({ data }: CategoryProductList) {
  return (
    <CustomGrid
      rowSpacing={1}
      size={{ md: 12 }}
      columnSpacing={{ xs: 1, sm: 2, md: 2 }}
      flexDirection={"column"}
      container
      spacing={2}
    >
      {data.length > 0 && (
        <Text paddingBlock={2} customClass="font-SemiBold font20">
          {list}
        </Text>
      )}
      {data.map((product) => (
        <CustomGrid size={6} key={product.id}>
          <ListCard product={product} />
        </CustomGrid>
      ))}
    </CustomGrid>
  );
}

export default CategoryProductList;
