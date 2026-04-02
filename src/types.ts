import type {
  BoxProps,
  ButtonProps,
  InputBaseProps,
  TypographyProps,
} from "@mui/material";
import { buttonIcons } from "./components/images";
export interface AlertMessageProps {
  open: boolean;
  onClose: () => void;
  severity?: "error" | "warning" | "info" | "success";
  title?: string;
  children: React.ReactNode;
  customClass?: string;
  variant?: "standard" | "filled" | "outlined";
}
export interface ProductImage {
  url: string;
}
export interface TButtonProps extends ButtonProps {
  label?: string;
  icon?: keyof typeof buttonIcons;
  iconPosition?: string;
  customClass?: string;
}

export interface Field {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
}

export interface Section {
  title: string;
  fields: Field[];
}

export interface ColumnProps {
  details: Section;
  thumbnail: Section;
  images: Section;
}

export interface InputProps extends InputBaseProps {
  customClass?: string;
  elementClass?: string;
  showLabel?: boolean;
  label?: string;
  type?: string;
  isError?: boolean;
  isPasswordVisible?: boolean;
  value?: string | number;
}
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: ProductImage[];
  thumbnail: string;
  spotlight: boolean;
  visiblity: boolean;
  created_at: string;
  updated_at: string;
}

export interface TextProps extends TypographyProps {
  customClass?: string;
}

export interface DiagonalProps extends BoxProps {
  src: string;
  customClass?: string;
}

export interface UserRegisterResponseData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}
export interface UserLoginResponseData {
  message?: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    created_at: string;
  };
  access_token: string;
}
export interface UserRegisterResponseData {
  message?: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
  };
}
export interface UserAdressResponse {
  id: string;
  full_name?: string;
  phone?: string;
  address_line?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
}

export type LoginFormValues = {
  email: string;
  password: string;
};
export type RegisterFormValues = {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
};

export interface IloaderProps {
  text?: string;
  customClass?: string;
}
export type MenuItem = {
  type: "item" | "accordion";
  text: string;
  icon?: React.ReactNode;
  path?: string;
  children?: MenuItem[];
};
export interface ItemProps {
  item: MenuItem;
  expanded?: string | false;
  setExpanded?: (val: string | false) => void;
}
export interface IProtectRoute {
  allowRoles: "USER" | "ADMIN";
}
export interface PageModuleProps {
  title?: string;
  description?: string;
  buttonLable?: string;
  children?: React.ReactNode;
  columns?: any[];
  onCreate?: () => void;
  onUpdate?: (item: any) => void;
  renderDetails?: (item: any) => void;
}
export interface CategoryResponse {
  id: string;
  name: string;
  visiblity: boolean;
  createdAt: string;
  updatedAt: string;
}
