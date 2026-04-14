import type { Product } from "../../../types";
import ListCard from "../product/ListCard";
import CustomGrid from "../../common/CustomGrid";

interface CategoryProductList {
  data: Product[];
}

function CategoryProductList({ data }: CategoryProductList) {
  return (
    <CustomGrid
      rowSpacing={1}
      size={{ md: 12 }}
      columnSpacing={{ xs: 1, sm: 2, md: 2 }}
      container
      spacing={2}
    >
      {data.map((product) => (
        <CustomGrid size={6} key={product.id}>
          <ListCard product={product} />
        </CustomGrid>
      ))}
    </CustomGrid>
  );
}

export default CategoryProductList;
