import type { AxiosRequestConfig, Method } from "axios";
import type {
  ColumnProps,
  DiagonalProps,
  Product,
  RegisterFormValues,
  UserRegisterResponseData,
} from "../types";
import classNames from "classnames";
import "./styles/Diagonal.scss";
import "./styles/Input.scss";
import { store } from "../app/store";
import Box from "./common/Box";
import axios from "axios";
import { setCredentials } from "../app/features/persisted/auth/auth.slice";
import { showToast } from "../app/features/error/error.slice";
import { logout, setJwtToken } from "../app/features/persisted/auth/auth.slice";
import { hideLoader, showLoader } from "../app/features/loader/loader.slice";
import { history } from "../utils";
import type { UserLoginResponseData, LoginFormValues } from "../types";
import Input from "./common/Input";
import Slider from "./common/Slider";

type ExecuteApiRequestOptions = {
  method: Method;
  url: string;
  data?: unknown;
  params?: Record<string, unknown>;
  isPrivate?: boolean;
  headers?: Record<string, string>;
};

const OpenApiEndpoints = ["/register", "/login", "/generate-token"];

export const getHeaders = (
  url: string,
  isPrivate: boolean = true,
  additionalHeaders: Record<string, string> = {},
) => {
  const state = store.getState();
  const token = state.auth.access_token;

  const isOpenApi = OpenApiEndpoints.some((endpoint) =>
    url.startsWith(endpoint),
  );

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...additionalHeaders,
  };

  if (!isOpenApi && isPrivate && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};
export const CallAPIInterface = async <T = unknown,>({
  method,
  url,
  data,
  params,
  isPrivate = true,
  headers = {},
}: ExecuteApiRequestOptions): Promise<T> => {
  const jwtOptions = getHeaders(url, isPrivate, headers);
  const config: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL as string,
    method,
    url,
    data,
    params,
    headers: jwtOptions,
    withCredentials: true,
  };

  try {
    const response = await axios(config);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data.message === "Session token expired") {
        generateToken().then(async (resp) => {
          jwtOptions.Authorization = `Bearer ${resp?.access_token}`;
          config.headers = jwtOptions;
          await axios(config).then(() => window.location.reload());
        });
      }
      if (error.response?.data.message === "Session Expired") {
        console.log("called from callApiInterface in refresh token not found");
        store.dispatch(logout());
        history.push("/login");
      }
      store.dispatch(
        showToast({
          message: error?.response?.data?.message || error?.message,
          severity: "error",
        }),
      );
    }
    return Promise.reject(error);
  }
};

export const generateToken = async () => {
  try {
    const data = await CallAPIInterface<{ access_token: string }>({
      method: "POST",
      url: "/generate-token",
    });
    store.dispatch(setJwtToken(data.access_token));
    return data;
  } catch (error) {
    handleLogOut();
    console.error(error);
  }
};
export const handleLogin = async (values: LoginFormValues) => {
  try {
    store.dispatch(showLoader());
    const data = await CallAPIInterface<UserLoginResponseData>({
      method: "POST",
      data: values,
      url: "/login",
      isPrivate: false,
    });

    store.dispatch(
      setCredentials({ user: data.user, access_token: data.access_token }),
    );
  } catch (error) {
    console.error(error);
  } finally {
    store.dispatch(hideLoader());
  }
};
export const handleCategory = async () => {
  store.dispatch(showLoader());

  try {
    const data = await CallAPIInterface<{
      message: string;
      category: unknown;
    }>({
      method: "GET",
      url: "/categories",
      isPrivate: true,
    });
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    store.dispatch(hideLoader());
  }
};
export const handleRegister = async (values: RegisterFormValues) => {
  try {
    store.dispatch(showLoader());
    const data = await CallAPIInterface<UserRegisterResponseData>({
      method: "POST",
      data: values,
      url: "/register",
      isPrivate: false,
    });
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    store.dispatch(hideLoader());
  }
};

export const handleLogOut = async () => {
  store.dispatch(showLoader());

  try {
    const data = await CallAPIInterface<{ message: string }>({
      method: "POST",
      url: "/logout",
      isPrivate: false,
    });
    store.dispatch(logout());
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    store.dispatch(hideLoader());
  }
};
export const DiagonalDiv = ({
  src,
  children,
  customClass,
  ...props
}: DiagonalProps) => {
  const classes = classNames(`overlay-container ${customClass}`);
  return (
    <>
      <Box
        className="vector-diagonal-div"
        sx={{ backgroundImage: `url(${src})` }}
      />
      <Box className="vector-diagonal-sub-div" />
      <Box {...props} className={classes}>
        {children}
      </Box>
    </>
  );
};
export const commonTabs = [
  { label: "All", value: "all" },
  { label: "Available", value: "available" },
  { label: "Archive", value: "archive" },
];

export const categoryColumns = [
  {
    key: "id",
    label: "Category ID",
    render: (row: any) => (
      <Input
        elementClass="category-input-element"
        customClass="table-input"
        value={row.id}
        readOnly
      />
    ),
  },
  { key: "name", label: "Category Name" },
  {
    key: "visiblity",
    label: "Status",
    render: (row: any) => (row.visiblity ? "Available" : "Archived"),
  },
  {
    key: "createdAt",
    label: "Created on",
    render: (row: any) => new Date(row.createdAt).toLocaleDateString(),
  },
  {
    key: "updatedAt",
    label: "Updated on",
    render: (row: any) => new Date(row.updatedAt).toLocaleDateString(),
  },
];

export const renderField = (col: any, data: any) => {
  if (col.render) return col.render(data);

  return data[col.key as keyof Product] as any;
};

export const productAllDetailColumns: ColumnProps[] = [
  {
    details: {
      title: "Details",
      fields: [
        {
          label: "Status",
          key: "visiblity",
          render: (row: any) => (row.visiblity ? "Available" : "Archived"),
        },
        {
          label: "Date Created",
          key: "createdAt",
          render: (row: any) => new Date(row.createdAt).toLocaleDateString(),
        },
        {
          label: "Date Updated",
          key: "updatedAt",
          render: (row: any) => new Date(row.updatedAt).toLocaleDateString(),
        },
      ],
    },
    thumbnail: {
      title: "Thumbnail",
      fields: [
        {
          label: "Thumbnail",
          key: "thumbnail",
          render: (row: any) => (
            <img
              src={row.thumbnail}
              alt="Thumbnail"
              style={{ width: "150px", height: "150px" }}
            />
          ),
        },
      ],
    },
    images: {
      title: "Images",
      fields: [
        {
          label: "Images",
          key: "images",
          render: (row: any) => (
            <Box display={"flex"} gap={"10px"} flexDirection={"column"}>
              {row.images?.map((img: any, index: number) => (
                <img
                  key={index}
                  src={img.url}
                  alt={`Product Image ${index + 1}`}
                  style={{
                    width: "250px",
                    height: "250px",
                  }}
                />
              ))}
            </Box>
          ),
        },
      ],
    },
  },
];
export const productColumns = [
  {
    key: "id",
    label: "Product ID",
    render: (row: any) => (
      <Input
        elementClass="product-input-element"
        customClass="table-input"
        value={row.id}
        readOnly
      />
    ),
  },
  { key: "name", label: "Product Name" },
  { key: "price", label: "Price " },
  {
    key: "visiblity",
    label: "Status",
    render: (row: any) => (row.visibility ? "Available" : "Archived"),
  },
  {
    key: "createdAt",
    label: "Created on",
    render: (row: any) => new Date(row.createdAt).toLocaleDateString(),
  },
  {
    key: "updatedAt",
    label: "Updated on",
    render: (row: any) => new Date(row.updatedAt).toLocaleDateString(),
  },
];

export const DashboardIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <path
          d="M14.8345 10.3146L12.0678 8.6521V5.83012C12.0673 5.34217 11.8731 4.87436 11.5279 4.52955L9.43596 2.43146C9.37893 2.37396 9.31108 2.32833 9.23632 2.29718C9.16157 2.26604 9.08138 2.25 9.00039 2.25C8.91941 2.25 8.83922 2.26604 8.76446 2.29718C8.68971 2.32833 8.62186 2.37396 8.56483 2.43146L6.47288 4.52955C6.12763 4.87436 5.93345 5.34217 5.93302 5.83012V8.6521L3.16625 10.3146C3.07467 10.3689 2.9988 10.4461 2.9461 10.5386C2.89339 10.6311 2.86566 10.7357 2.86565 10.8422V12.6826C2.86565 12.8453 2.93028 13.0014 3.04533 13.1164C3.16038 13.2315 3.31642 13.2961 3.47912 13.2961H14.5217C14.6844 13.2961 14.8404 13.2315 14.9554 13.1164C15.0705 13.0014 15.1351 12.8453 15.1351 12.6826V10.8422C15.1351 10.7357 15.1074 10.6311 15.0547 10.5386C15.002 10.4461 14.9261 10.3689 14.8345 10.3146ZM7.15997 9.00178V5.83012C7.1595 5.74938 7.17498 5.66934 7.20551 5.59459C7.23604 5.51985 7.28102 5.45187 7.33787 5.39455L8.47007 4.26236C8.76296 3.96947 9.23783 3.96947 9.53072 4.26236L10.6629 5.39455C10.7198 5.45187 10.7647 5.51985 10.7952 5.59459C10.8258 5.66934 10.8413 5.74938 10.8408 5.83012V11.3191C10.8408 11.7334 10.505 12.0691 10.0908 12.0691H7.90997C7.49576 12.0691 7.15997 11.7334 7.15997 11.3191V9.00178ZM8.38692 7.16135C8.38692 6.82254 8.66158 6.54788 9.00039 6.54788C9.3392 6.54788 9.61387 6.82254 9.61387 7.16135V8.3883C9.61387 8.72712 9.3392 9.00178 9.00039 9.00178C8.66158 9.00178 8.38692 8.72711 8.38692 8.3883V7.16135ZM5.93302 14.5231C5.93302 14.1842 6.20768 13.9096 6.5465 13.9096C6.88531 13.9096 7.15997 14.1842 7.15997 14.5231V15.1365C7.15997 15.4753 6.88531 15.75 6.5465 15.75C6.20768 15.75 5.93302 15.4753 5.93302 15.1365V14.5231ZM8.38692 14.5231C8.38692 14.1842 8.66158 13.9096 9.00039 13.9096C9.3392 13.9096 9.61387 14.1842 9.61387 14.5231V15.1365C9.61387 15.4753 9.3392 15.75 9.00039 15.75C8.66158 15.75 8.38692 15.4753 8.38692 15.1365V14.5231ZM10.8408 14.5231C10.8408 14.1842 11.1155 13.9096 11.4543 13.9096C11.7931 13.9096 12.0678 14.1842 12.0678 14.5231V15.1365C12.0678 15.4753 11.7931 15.75 11.4543 15.75C11.1155 15.75 10.8408 15.4753 10.8408 15.1365V14.5231Z"
          fill="#667085"
        ></path>
      </svg>
    </>
  );
};
export const ProductIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <path
          d="M10.1733 11.9078C10.4601 11.9078 10.6926 12.1403 10.6926 12.4271C10.6926 12.7139 10.4601 12.9464 10.1733 12.9464H8.3042C8.01749 12.9464 7.78496 12.7139 7.78491 12.4271C7.78491 12.1403 8.01746 11.9078 8.3042 11.9078H10.1733Z"
          fill="#667085"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.0852 2.25012C15.1365 2.25027 15.9886 3.10244 15.9888 4.15369V5.12341C15.9887 6.16318 15.155 7.00626 14.1196 7.02478V13.1537C14.1196 14.5897 12.9592 15.7501 11.5232 15.7501H6.95435C5.51836 15.7501 4.35791 14.5897 4.35791 13.1537V7.02478C3.32254 7.00625 2.48888 6.16318 2.48877 5.12341V4.15369C2.48892 3.10245 3.34109 2.25027 4.39233 2.25012H14.0852ZM5.39648 13.1537C5.39648 14.0161 6.09188 14.7115 6.95435 14.7115H11.5232C12.3857 14.7115 13.0811 14.0161 13.0811 13.1537V7.02698H5.39648V13.1537Z"
          fill="#667085"
        ></path>
      </svg>
    </>
  );
};

{
  /* <Table className={classes}>
      <TableBody>
        <TableRow>
          <TableCell>
            <Text customClass="font20  font-SemiBold mb-10">
              {productAllDetailColumns[0].details.title}
            </Text>
          </TableCell>
        </TableRow>
        {productAllDetailColumns[0].details.fields.map((col) => (
          <TableRow key={col.key}>
            <TableCell className="table-head">{col.label}</TableCell>

            <TableCell key={col.key}>
              {col.render
                ? col.render(data)
                : Object.values(data[col.key as keyof Product])}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableBody>
        <TableRow>
          <TableCell>
            {" "}
            <Text customClass="font20  font-SemiBold mb-10">
              {productAllDetailColumns[0].thumbnail.title}
            </Text>
          </TableCell>
        </TableRow>
        <TableRow>
          {productAllDetailColumns[0].thumbnail.fields.map((col) => (
            <TableCell key={col.key}>
              {col.render
                ? col.render(data)
                : Object.values(data[col.key as keyof Product])}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>
            <Text customClass="font20  font-SemiBold mb-10">
              {productAllDetailColumns[0].images.title}
            </Text>
          </TableCell>
        </TableRow>
        <TableRow>
          {productAllDetailColumns[0].images.fields.map((col) => (
            <TableCell key={col.key}>
              {col.render
                ? col.render(data)
                : Object.values(data[col.key as keyof Product])}
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table> */
}
