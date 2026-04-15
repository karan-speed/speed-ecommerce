import { Tab, TableContainer, Table, TableBody } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Box from "./Box";
import "../styles/tab.scss";
import { useNavigate } from "react-router-dom";
import type { Field, TCategoryList, TProductsList } from "../../types";
import TableItem from "./TableItem";
import TableHeader from "./TableHeader";
import LoadingRow from "./LoadingRow";
import EmptyRow from "./EmptyRow";
interface TabTableProps {
  tabs: { label: string; value: string }[];
  value: string;
  isNavigate?: boolean;
  loading: boolean;
  elementForRedirection: string;
  onTabChange: (event: React.SyntheticEvent, newValue: string) => void;
  columns: Field[];
  data: TProductsList[] | TCategoryList[];
}
export default function TableWithTabs({
  tabs,
  value,
  columns,
  isNavigate = false,
  elementForRedirection,
  data,
  loading,
  onTabChange,
}: TabTableProps) {
  const navigate = useNavigate();
  const handleRowClick = (id: string) => {
    if (!isNavigate) return;
    navigate(`/${elementForRedirection}/${id}`);
  };
  const renderTableBody = () => {
    if (loading) return <LoadingRow columns={columns} />;

    if (!data.length) return <EmptyRow colSpan={columns.length} />;

    return data.map((row) => (
      <TableItem
        key={String(row.id)}
        row={row}
        columns={columns}
        onClick={() => handleRowClick(row.id)}
      />
    ));
  };

  return (
    <>
      <TabContext value={value}>
        <TabList onChange={onTabChange}>
          {tabs.map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </TabList>

        <TabPanel value={value}>
          <Box className="main-content">
            <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
              <Table>
                <TableHeader columns={columns} />
                <TableBody>{renderTableBody()}</TableBody>
              </Table>
            </TableContainer>
          </Box>
        </TabPanel>
      </TabContext>
    </>
  );
}
