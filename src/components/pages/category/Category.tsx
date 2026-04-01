import { useEffect, useState } from "react";
import Box from "../../common/Box";
import TableWithTabs from "../../common/TableWithTabs";
import { useAppDispatch } from "../../../app/hooks";
import {
  hideLoader,
  showLoader,
} from "../../../app/features/loader/loader.slice";
import { CallAPIInterface, categoryColumns, commonTabs } from "../../constants";
import PageModule from "../../common/PageModule";
import CategoryCreate from "./CategoryCreate";

function Category() {
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

  const handleGetCategory = async () => {
    try {
      dispatch(showLoader());
      const data = await CallAPIInterface({
        method: "GET",
        url: "/categories",
        isPrivate: true,
      });

      const categories = Array.isArray(data) ? data : [];

      setTabData({
        all: categories,
        available: categories.filter((c) => c.visiblity === true),
        archive: categories.filter((c) => c.visiblity === false),
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
  const createCategoryButtonHandler = async () => {
    setisCreateClicked(true);
  };
  useEffect(() => {
    handleGetCategory();
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
        title="Category"
        buttonLable="Add Category"
        onCreate={createCategoryButtonHandler}
        description="Easily manage categories by adding, viewing, updating, or deleting them. Keep your data well-organized and up to date for a better user experience."
      >
        <TableWithTabs
          elementForRedirection="categories"
          tabs={commonTabs}
          value={value}
          onTabChange={handleTabChange}
          columns={categoryColumns}
          data={tabData[value] || []}
        />
        {isCreateClicked && (
          <CategoryCreate
            isCreateClicked={isCreateClicked}
            handlerCreateClick={handleCreateClose}
          />
        )}
      </PageModule>
    </Box>
  );
}

export default Category;
