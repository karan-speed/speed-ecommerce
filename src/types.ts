import type { BoxProps, ButtonProps, InputBaseProps } from "@mui/material";
import { buttonIcons } from "./components/images";
export type TCategorySummery = {
  total_products: number;
  total_stock: number;
  average_price: number;
  active_products: number;
  spotlighted_products: number;
};
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

export interface ProductColumnProps {
  details: Section;
  thumbnail: Section;
  images: Section;
}
export interface CategoryColumnProps {
  summery: Section;
}
export type TCategoryDetailProduct = {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  price: number;
  stock: number;
  spotlight: string;
  created_at: string;
  updated_at: string;
};
export type TCategoryDetails = {
  id: string;
  name: string;
  total_products: number;
  total_stock: number;
  average_price: number;
  active_products: number;
  spotlighted_products: number;
  products: TCategoryDetailProduct[];
};

export type TCategoryList = {
  id: string;
  name: string;
  visiblity: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface ProductImages {
  url: string;
}

export interface InputProps extends InputBaseProps {
  customClass?: string;
  elementClass?: string;
  showLabel?: boolean;
  label?: string;
  type?: string;
  isError?: boolean;
  isPasswordVisible?: boolean;
  error?: boolean;
  helperText?: string | boolean | undefined;
  value?: string | number;
}

export interface DiagonalProps extends BoxProps {
  src: string;
  customClass?: string;
}

export interface TUserRegister {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}
export interface TUserLogin {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    created_at: string;
  };
  access_token: string;
}

export type TLoginForm = {
  email: string;
  password: string;
};
export type TRegisterForm = {
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

export interface ProductImage {
  url: string;
}
export interface TProduct {
  id: string;
  name: string;
  category: {
    id?: string;
    name: string;
  };
  description: string;
  price: number;
  stock: number;
  category_id: string;
  created_at: number;
  updated_at: number;
  thumbnail: string;
  visiblity: boolean;
  spotlight: boolean;
  images: ProductImage[];
}
export type TPartialProduct = Partial<TProduct>;
export interface IProductForm {
  category_id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  thumbnail: string;
  images: ProductImage[];
}

export type productSchema = {
  category_id: string;
  name: string;
  price: string;
  stock: string;
  description: string;
  thumbnail: string;
  images: ProductImage[];
};

export type TProductsList = {
  id: string;
  name: string;
  price: number;
  visiblity: boolean;
  created_at: number;
  updated_at: number;
};
export const mapProductResponseToForm = (values: TProduct): productSchema => {
  return {
    category_id: values.category_id as string,

    name: values.name,
    description: values.description,
    thumbnail: values.thumbnail,
    price: String(values.price),
    stock: String(values.stock),
    images: values.images,
  };
};
