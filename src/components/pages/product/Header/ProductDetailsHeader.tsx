import { useState, type MouseEvent } from "react";
import Box from "../../../common/Box/Box";
import Text from "../../../common/Text/Text";
import Breadcrumbs from "../../../common/Breadcrumb/Breadcrumb";
import { dialogText } from "../../../messages";
import ProductForm from "../ProductForm";
import type { TProduct } from "../../../../types";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { deleteProduct } from "../../../../redux/product/product.slice";
import CustomSkeleton from "../../../common/Skeleton/Skeleton";
import Copy from "../../../common/Copy/Copy";
import Link from "../../../common/Link/Link";
import {
  toggleArchiveProduct,
  toggleSpotlightProduct,
} from "../../../../redux/thunks";
import ProductStatus from "./ProductStatus";
import HeaderMenu from "./HeaderMenu";
import ProductAction from "./ProductAction";
import RenderWithFallBack from "../../../common/RenderWithFallBack";

interface DataProps {
  previousNavlink: string;
  loading: boolean;
}
function DetailsHeader({ previousNavlink, loading }: DataProps) {
  const data = useAppSelector((state) => state.product.selectedProduct);
  const dispatch = useAppDispatch();
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const openMenu = (e: MouseEvent<HTMLElement>) => {
    setMenuAnchorEl((prev) => (prev ? null : e.currentTarget));
  };
  const openArchive = () => setIsArchiveOpen(true);
  const openDelete = () => setIsDeleteOpen(true);
  const openEdit = () => {
    setSelectedProduct(data);
    setIsEditOpen(true);
  };
  const closeMenu = () => setMenuAnchorEl(null);
  const closeArchive = () => setIsArchiveOpen(false);
  const closeDelete = () => setIsDeleteOpen(false);
  const closeEdit = () => {
    setSelectedProduct(null);
    setIsEditOpen(false);
  };
  const handleArchiveProduct = async () => {
    if (data) dispatch(toggleArchiveProduct(data));
    setIsArchiveOpen(false);
  };
  const handleSpotlightProduct = async () => {
    if (data) dispatch(toggleSpotlightProduct(data));
  };
  const handleDeleteProduct = async () => {
    if (data) dispatch(deleteProduct(data));
  };
  const renderDetailsHeader = () => {
    return (
      <>
        <Box component={"nav"}>
          <RenderWithFallBack
            loading={loading}
            skeleton={
              <CustomSkeleton
                customClass="product-nav-wrapper"
                variant="text"
                width={"40%"}
              />
            }
          >
            <Breadcrumbs component={"ol"} separator="›">
              <Link customClass="breadcrumb-link" to={`/${previousNavlink}`}>
                {previousNavlink[0]?.toUpperCase() + previousNavlink.slice(1)}
              </Link>
              <Text customClass="grey-text font14">Details</Text>
            </Breadcrumbs>
          </RenderWithFallBack>
        </Box>
        <Box className="header-content">
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <RenderWithFallBack
              loading={loading}
              skeleton={
                <CustomSkeleton
                  customClass="product-title-wrapper"
                  variant="text"
                />
              }
            >
              <Text customClass="font28 font-SemiBold">{data?.name}</Text>
            </RenderWithFallBack>

            <Box customClass="flex flex-col items-end">
              <RenderWithFallBack
                loading={loading}
                skeleton={
                  <CustomSkeleton
                    customClass="product-status-wrapper"
                    variant="rectangular"
                  />
                }
              >
                <ProductStatus
                  product={data}
                  onOpenMenu={openMenu}
                  onToggleSpotlight={handleSpotlightProduct}
                  onUnarchive={handleArchiveProduct}
                />
              </RenderWithFallBack>

              <RenderWithFallBack
                loading={loading}
                skeleton={
                  <CustomSkeleton
                    customClass="copy-text-wrapper"
                    variant="rounded"
                  />
                }
              >
                <Box mt={1} gap={1} customClass="flex items-center">
                  <Text customClass="detail-id font-regular">{data?.id}</Text>
                  <Copy value={String(data?.id)} />
                </Box>
              </RenderWithFallBack>
            </Box>
          </Box>
        </Box>
        <Box>
          <RenderWithFallBack
            loading={loading}
            skeleton={
              <CustomSkeleton
                customClass="product-description-wrapper"
                variant="text"
                sx={{ marginBlock: "12px" }}
              />
            }
          >
            <Text customClass="font14 grey-text">{data?.description}</Text>
          </RenderWithFallBack>
        </Box>

        <HeaderMenu
          anchorEl={menuAnchorEl}
          onDelete={openDelete}
          onClose={closeMenu}
          onEdit={openEdit}
          onArchive={openArchive}
        />
      </>
    );
  };

  return (
    <>
      {renderDetailsHeader()}
      <ProductAction
        title="Delete Product"
        customClass="product-delete-dialog"
        buttonLabel="Delete Product"
        content={dialogText.delete}
        open={isDeleteOpen}
        onSubmit={handleDeleteProduct}
        onClose={closeDelete}
      />

      <ProductAction
        title="Archive Product"
        customClass="product-archive-dialog"
        buttonLabel="Archive Product"
        content={dialogText.archive}
        open={isArchiveOpen}
        onSubmit={handleArchiveProduct}
        onClose={closeArchive}
      />
      <ProductForm
        onSuccess={() => ""}
        isOpen={isEditOpen}
        initialData={selectedProduct}
        onClose={closeEdit}
        isEdit={true}
      />
    </>
  );
}

export default DetailsHeader;
