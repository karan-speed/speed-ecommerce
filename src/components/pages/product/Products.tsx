import { useEffect, useMemo, useState } from "react";
import Box from "../../common/Box";
import TableWithTabs from "../../common/TableWithTabs";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  hideLoader,
  showLoader,
} from "../../../redux/features/loader/loader.slice";
import { CallAPIInterface, commonTabs, productColumns } from "../../constants";
import PageModule from "../../common/PageModule";
import ProductForm from "./ProductForm";
import { setProducts } from "../../../redux/features/product/product.slice";
import type { IProductGetResponse, Product, Products } from "../../../types";
import PageLoader from "../../common/PageLoader";
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

  const handleGetProduct = async () => {
    try {
      setLoading(true);
      const data = await CallAPIInterface<Products[]>({
        method: "GET",
        url: "/products",
        isPrivate: true,
      });
      dispatch(setProducts(data));
    } catch (error) {
      setTabData({
        all: [],
        available: [],
        archive: [],
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const createProductButtonHandler = async () => {
    setisCreateClicked(true);
  };
  useEffect(() => {
    handleGetProduct();
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
  if (loading || !products) {
    return <PageLoader loading={loading} text="Loading" />;
  }
  return (
    <Box
      sx={{
        width: "100%",
        fontFamily: "Outfit-Regular",
        fontWeight: "400",
        fontSize: "1rem",
        lineHeight: 1.5,
        letterSpacing: "0.00938em",
        minHeight: "unset",
      }}
    >
      <PageModule
        title="Products"
        buttonLable="Add Product"
        onCreate={createProductButtonHandler}
        description="Easily manage products by adding, viewing, updating, or deleting them. Keep your data well-organized and up to date for a better user experience."
      >
        <TableWithTabs
          isNavigate={true}
          key={Math.random().toLocaleString()}
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
          onClose={handleCreateClose}
        />
      </PageModule>
    </Box>
  );
}
