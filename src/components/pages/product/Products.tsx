import { useEffect, useMemo, useState } from "react";
import Box from "../../common/Box/Box";
import TableWithTabs from "../../common/Table/TableWithTabs";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { CallAPIInterface, commonTabs, productColumns } from "../../constants";
import ProductForm from "./ProductForm";
import EntityListPage from "../../common/EntityListPage";
import type { TProductsList } from "../../../types";
import { setProducts } from "../../../redux/product/product.slice";
export default function Products() {
  const [value, setValue] = useState("all");
  const [isCreateClicked, setisCreateClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tabData, setTabData] = useState<Record<string, any[]>>({});
  const products = useAppSelector((state) => state.product.list);
  const dispatch = useAppDispatch();
  const handleTabChange = (_event: any, newValue: any) => {
    setValue(newValue);
  };
  const handleCreateClose = () => {
    setisCreateClicked(false);
  };

  const createProductButtonHandler = async () => {
    setisCreateClicked(true);
  };
  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await CallAPIInterface<TProductsList[]>({
        method: "GET",
        url: "/products",
        isPrivate: true,
      });
      dispatch(setProducts(response));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  const filteredData = useMemo(() => {
    if (value === "available") {
      return products.filter((p) => p.visiblity);
    }
    if (value === "archive") {
      return products.filter((p) => !p.visiblity);
    }
    return products;
  }, [products, value]);

  return (
    <Box customClass="section-wrapper">
      <EntityListPage
        entity="Products"
        buttonLabel="Add Product"
        onSubmit={createProductButtonHandler}
        description="Easily manage products by adding, viewing, updating, or deleting them. Keep your data well-organized and up to date for a better user experience."
      >
        <TableWithTabs
          loading={loading}
          isNavigate={true}
          tabs={commonTabs}
          value={value}
          elementForRedirection="products"
          onTabChange={handleTabChange}
          columns={productColumns}
          data={filteredData}
        />
        <ProductForm
          isOpen={isCreateClicked}
          isEdit={false}
          onSuccess={() => getProducts()}
          onClose={handleCreateClose}
        />
      </EntityListPage>
    </Box>
  );
}
