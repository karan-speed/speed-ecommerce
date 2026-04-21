import { useEffect, useMemo, useState } from "react";
import Box from "../../common/Box/Box";
import TableWithTabs from "../../common/Table/TableWithTabs";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { CallAPIInterface, categoryColumns, commonTabs } from "../../constants";
import EntityListPage from "../../common/EntityListPage";
import CategoryForm from "./CategoryForm";
import type { TCategoryList } from "../../../types";
import { setCategories } from "../../../redux/category/category.slice";

function Categories() {
  const [value, setValue] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.category.categories);
  const handleTabChange = (_event: any, newValue: any) => {
    setValue(newValue);
  };
  const openCreate = () => setIsCreateOpen(true);
  const closeCreate = () => setIsCreateOpen(false);

  const getCategories = async () => {
    setLoading(true);
    try {
      const response = await CallAPIInterface<TCategoryList[]>({
        method: "GET",
        url: "/categories",
        isPrivate: true,
      });
      dispatch(setCategories(response));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
    getCategories();
  }, []);

  return (
    <Box customClass="section-wrapper">
      <EntityListPage
        entity="Categories"
        buttonLabel="Add Category"
        onSubmit={openCreate}
        description="Easily manage categories by adding, viewing, updating, or deleting them. Keep your data well-organized and up to date for a better user experience."
      >
        <TableWithTabs
          loading={loading}
          isNavigate={true}
          elementForRedirection="categories"
          tabs={commonTabs}
          value={value}
          onTabChange={handleTabChange}
          columns={categoryColumns}
          data={filteredData}
        />

        <CategoryForm open={isCreateOpen} onClose={closeCreate} />
      </EntityListPage>
    </Box>
  );
}

export default Categories;
