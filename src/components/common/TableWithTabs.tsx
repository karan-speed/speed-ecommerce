import {
  Tab,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableCell,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Box from "./Box";
import "../styles/tab.scss";
import { useNavigate } from "react-router-dom";
interface BaseRow {
  id: string | number;
}

interface TabTableProps<T extends BaseRow> {
  tabs: { label: string; value: string }[];
  value: string;
  isNavigate?: boolean;
  elementForRedirection: string;
  onTabChange: (event: React.SyntheticEvent, newValue: string) => void;
  columns: {
    key: keyof T;
    label: string;
    render?: (row: T) => React.ReactNode;
  }[];
  data: T[];
}
export default function TableWithTabs<T extends BaseRow>({
  tabs,
  value,
  columns,
  isNavigate = false,
  elementForRedirection,
  data,
  onTabChange,
}: TabTableProps<T>) {
  const navigate = useNavigate();
  return (
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
              <TableHead>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell
                      key={String(col.key)}
                      sx={{
                        position: "sticky",
                        top: 0,
                        zIndex: 2,
                        backgroundColor: "#fff",
                        minWidth: "170px",
                        paddingLeft: "38px",
                      }}
                    >
                      {col.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {data.length > 0 ? (
                  data.map((row) => (
                    <TableRow
                      onClick={
                        isNavigate
                          ? () =>
                              navigate(`/${elementForRedirection}/${row.id}`)
                          : undefined
                      }
                      key={row.id}
                    >
                      {columns.map((col) => (
                        <TableCell
                          key={String(col.key)}
                          sx={{
                            minWidth: "170px",
                            paddingLeft: "38px",
                          }}
                        >
                          {col.render
                            ? col.render(row)
                            : (row[col.key] as React.ReactNode)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      Not found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </TabPanel>
    </TabContext>
  );
}
