import { useEffect, useMemo, useState } from "react";
import Box from "../../common/Box";
import TableWithTabs from "../../common/TableWithTabs";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { CallAPIInterface, categoryColumns, commonTabs } from "../../constants";
import PageModule from "../../common/PageModule";
import CategoryCreate from "./CategoryCreate";
import type { TCategory } from "../../../types";
import { setCategories } from "../../../redux/features/category/category.slice";
import PageLoader from "../../common/PageLoader";

function Categories() {
  const [value, setValue] = useState("all");
  const [isCreateClicked, setisCreateClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.category.categories);
  const handleTabChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  const handleCreateClose = () => {
    setisCreateClicked(false);
  };

  const handleGetCategory = async () => {
    try {
      setLoading(true);
      const data = await CallAPIInterface<TCategory[]>({
        method: "GET",
        url: "/categories",
        isPrivate: true,
      });
      dispatch(setCategories(data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createCategoryButtonHandler = async () => {
    setisCreateClicked(true);
  };
  const filteredData = useMemo(() => {
    if (value === "available") {
      return categories.filter((p) => p.visiblity);
    }
    if (value === "archive") {
      return categories.filter((p) => !p.visiblity);
    }
    return categories;
  }, [categories, value]);
  useEffect(() => {
    handleGetCategory();
  }, []);
  if (loading || !categories) {
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
        title="Categories"
        buttonLable="Add Category"
        onCreate={createCategoryButtonHandler}
        description="Easily manage categories by adding, viewing, updating, or deleting them. Keep your data well-organized and up to date for a better user experience."
      >
        <TableWithTabs
          isNavigate={true}
          elementForRedirection="categories"
          tabs={commonTabs}
          value={value}
          onTabChange={handleTabChange}
          columns={categoryColumns}
          data={filteredData}
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

export default Categories;
