import React, { useCallback, useMemo, useState } from "react";
import Box from "../../common/Box";
import Text from "../../common/Text";
import { Link, useNavigate } from "react-router-dom";
import { buttonIcons } from "../../images";
import { Breadcrumbs, List, MenuItem, Popper, Tooltip } from "@mui/material";
import { CallAPIInterface } from "../../constants";
import Dialog from "../../common/Dialog";
import { copiedText, dialogText } from "../../messages";
import Button from "../../common/Button";
import CustomSwitch from "../../common/CustomSwitch";
import ProductForm from "./ProductForm";
import type { TProduct } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  deleteProduct,
  updateProduct,
} from "../../../redux/features/product/product.slice";
import CustomSkeleton from "../../common/CustomSkeleton";
import Copy from "../../common/Copy";
import CustomPopper from "../../common/CustomPopper";

interface DataProps {
  previousNavlink: string;
  loading: boolean;
}
function DetailsHeader({ previousNavlink, loading }: DataProps) {
  const navigate = useNavigate();
  const data = useAppSelector((state) => state.product.selectedProduct);
  const dispatch = useAppDispatch();
  const [MoreAnchorEl, setMoreAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [openArchiveDialog, setArchiveDialog] = useState(false);
  const [openDeleteDailog, setDeleteDialog] = useState(false);

  const handleArchiveClick = (event: React.MouseEvent<HTMLElement>) => {
    setMoreAnchorEl((prev) => (prev ? null : event.currentTarget));
  };
  const handleArchiveDailogClose = () => {
    setArchiveDialog(false);
  };
  const handleDeleteDailogClose = () => {
    setDeleteDialog(false);
  };
  const handleEditDailog = () => {
    setSelectedProduct(data);
    setIsOpenEdit(true);
  };

  const handleArchiveProduct = async () => {
    try {
      const response = await CallAPIInterface<TProduct>({
        method: "PUT",
        url: `/products/visiblity/${data?.id}`,
        data: {
          visiblity: !data?.visiblity,
        },
        isPrivate: true,
      });
      if (data?.spotlight) {
        handleSpotlightProduct();
      }

      dispatch(updateProduct(response));
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      handleArchiveDailogClose();
    }
  };
  const handleSpotlightProduct = async () => {
    try {
      const response = await CallAPIInterface<TProduct>({
        method: "PUT",
        url: `/products/spotlight/${data?.id}`,
        data: {
          status: !data?.spotlight,
        },
        isPrivate: true,
      });
      dispatch(updateProduct(response));
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  const deleteProductHandler = async () => {
    try {
      const response = await CallAPIInterface<{ id: string }>({
        method: "DELETE",
        url: `/products/delete/${data?.id}`,
        isPrivate: true,
      });
      dispatch(deleteProduct(response));
    } catch (error) {
      console.error(error);
    } finally {
      handleDeleteDailogClose();
      navigate("/products");
    }
  };
  const CachedProductStatus = useMemo(() => {
    if (data?.visiblity) {
      return (
        <>
          <Box display={"flex"} alignItems={"center"}>
            {" "}
            <Box display={"flex"} gap={1} alignItems={"center"}>
              {data.spotlight ? (
                <Text mr={1} customClass="spotlight">
                  In Spotlight
                </Text>
              ) : (
                <Text mr={1} customClass="unspotlight">
                  Not In Spotlight
                </Text>
              )}
              <CustomSwitch
                checked={data?.spotlight}
                onChange={handleSpotlightProduct}
                customClass="product-spotlight-switch"
              />
            </Box>
            <Box
              sx={{ display: "inline-flex", cursor: "pointer" }}
              onClick={handleArchiveClick}
            >
              {buttonIcons.horizontalThreeDots}
            </Box>
          </Box>
        </>
      );
    }

    return (
      <Box mb={1}>
        <Button
          customClass="button-create-unarchive"
          variant="outlined"
          size="medium"
          label={"Unarchive"}
          icon="unarchive"
          onClick={handleArchiveProduct}
        ></Button>
      </Box>
    );
  }, [data?.visiblity, data?.spotlight]);

  const menuItems = [
    {
      lable: "Archive",
      onClick: () => {
        setArchiveDialog(true);
        setMoreAnchorEl(null);
      },
    },
    {
      lable: "Edit",
      onClick: () => {
        handleEditDailog();
        setMoreAnchorEl(null);
      },
    },
    {
      lable: "Delete",
      onClick: () => {
        setDeleteDialog(true);
        setMoreAnchorEl(null);
      },
    },
  ];
  return (
    <>
      {" "}
      <Box component={"nav"}>
        {loading ? (
          <>
            <CustomSkeleton
              customClass="product-nav-wrapper"
              variant="text"
              width={"40%"}
            />
          </>
        ) : (
          <Breadcrumbs
            sx={{ padding: 0 }}
            component={"ol"}
            separator="›"
            aria-label="breadcrumb"
          >
            <Link
              to={`/${previousNavlink}`}
              style={{
                color: "#2a67ff",
                fontSize: "14px",
                fontFamily: "Outfit-Regular",
                textDecoration: "none",
                textTransform: "capitalize",
              }}
            >
              {previousNavlink}
            </Link>
            <Text customClass="grey-text font14">Details</Text>
          </Breadcrumbs>
        )}
      </Box>
      <Box className="header-content">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {loading ? (
            <CustomSkeleton
              customClass="product-title-wrapper"
              variant="text"
            />
          ) : (
            <Text customClass="font28 font-SemiBold">{data?.name}</Text>
          )}
          <Box
            sx={{
              display: "flex",
              flexFlow: "column",
              alignItems: "flex-end",
            }}
          >
            {loading ? (
              <CustomSkeleton
                customClass="product-status-wrapper"
                variant="rectangular"
              />
            ) : (
              CachedProductStatus
            )}

            <Box display={"flex"} alignItems={"center"} mt={2}>
              {loading ? (
                <CustomSkeleton
                  customClass="copy-text-wrapper"
                  variant="rounded"
                />
              ) : (
                <>
                  <Text customClass="detail-id font-regular">{data?.id}</Text>
                  <Copy value={String(data?.id)} />
                </>
              )}
            </Box>
          </Box>
        </Box>

        <Box>
          {loading ? (
            <CustomSkeleton
              customClass="product-description-wrapper"
              variant="text"
              sx={{ marginBlock: "12px" }}
            />
          ) : (
            <Text customClass="font14 grey-text">{data?.description}</Text>
          )}
        </Box>
      </Box>
      <CustomPopper
        arrow={true}
        open={Boolean(MoreAnchorEl)}
        anchorEl={MoreAnchorEl}
        placement="bottom-end"
      >
        <Box>
          {menuItems.map((menu) => (
            <MenuItem key={menu.lable} onClick={() => menu.onClick()}>
              <Text customClass="font-Medium font14">{menu.lable}</Text>
            </MenuItem>
          ))}
        </Box>
      </CustomPopper>
      <Dialog
        isForm={false}
        customClass="product-archive-dialog"
        title="Archive Product"
        open={openArchiveDialog}
        handleSubmit={handleArchiveProduct}
        handleClose={handleArchiveDailogClose}
        submitButtonLabel="Archive Product"
      >
        <Box>
          <Text customClass="default-text" fontSize={18}>
            {dialogText.archive}
          </Text>
        </Box>
      </Dialog>
      <Dialog
        isForm={false}
        customClass="product-delete-dialog"
        title="Delete Product"
        open={openDeleteDailog}
        handleSubmit={deleteProductHandler}
        handleClose={handleDeleteDailogClose}
        submitButtonLabel="Delete Product"
      >
        <Box>
          <Text customClass="default-text" fontSize={18}>
            {dialogText.delete}
          </Text>
        </Box>
      </Dialog>
      <ProductForm
        onSuccess={() => ""}
        isOpen={isOpenEdit}
        initialData={selectedProduct}
        onClose={() => {
          setSelectedProduct(null);
          setIsOpenEdit(false);
        }}
        isEdit={true}
      />
    </>
  );
}

export default DetailsHeader;
