import { useEffect, useState } from "react";
import Box from "../../common/Box";
import TableWithTabs from "../../common/TableWithTabs";
import { useAppDispatch } from "../../../app/hooks";
import {
  hideLoader,
  showLoader,
} from "../../../app/features/loader/loader.slice";
import { CallAPIInterface, commonTabs, productColumns } from "../../constants";
import PageModule from "../../common/PageModule";
import ProductCreate from "./ProductCreate";

export default function Products() {
  const [value, setValue] = useState("all");
  const [isCreateClicked, setisCreateClicked] = useState(false);
  const [tabData, setTabData] = useState<Record<string, any[]>>({});
  const dispatch = useAppDispatch();
  const handleTabChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  const handleCreateClose = () => {
    setisCreateClicked(false);
  };

  const handleGetProduct = async () => {
    try {
      dispatch(showLoader());
      const data = await CallAPIInterface({
        method: "GET",
        url: "/products",
        isPrivate: true,
      });

      const products = Array.isArray(data) ? data : [];

      setTabData({
        all: products,
        available: products.filter((p) => p.visiblity === true),
        archive: products.filter((p) => p.visiblity === false),
      });
    } catch (error) {
      setTabData({
        all: [],
        available: [],
        archive: [],
      });
      console.error(error);
    } finally {
      dispatch(hideLoader());
    }
  };
  const createProductButtonHandler = async () => {
    setisCreateClicked(true);
  };
  useEffect(() => {
    handleGetProduct();
  }, []);
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
        title="Product"
        buttonLable="Add Product"
        onCreate={createProductButtonHandler}
        description="Easily manage products by adding, viewing, updating, or deleting them. Keep your data well-organized and up to date for a better user experience."
      >
        <TableWithTabs
          isNavigate={true}
          key={Math.random()}
          tabs={commonTabs}
          value={value}
          elementForRedirection="products"
          onTabChange={handleTabChange}
          columns={productColumns}
          data={tabData[value] || []}
        />
        {isCreateClicked && (
          <ProductCreate
            isCreateClicked={isCreateClicked}
            handlerCreateClick={handleCreateClose}
          />
        )}
      </PageModule>
    </Box>
  );
}
