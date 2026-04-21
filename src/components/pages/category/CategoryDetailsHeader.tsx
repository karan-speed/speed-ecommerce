import Breadcrumbs from "../../common/Breadcrumb/Breadcrumb";
import Box from "../../common/Box/Box";
import Text from "../../common/Text/Text";
import Link from "../../common/Link/Link";

interface CategoryHeaderProps {
  previousNavlink: string;
  data: any;
}
function CategoryDetailsHeader({ previousNavlink, data }: CategoryHeaderProps) {
  return (
    <>
      <Box component={"nav"}>
        <Breadcrumbs component={"ol"} separator="›">
          <Link customClass="breadcrumb-link" to={`/${previousNavlink}`}>
            {previousNavlink[0]?.toUpperCase() + previousNavlink.slice(1)}
          </Link>
          <Text customClass="grey-text font14">Details</Text>
        </Breadcrumbs>
      </Box>
      <Box className="header-content">
        <Box display={"flex"} gap={1} flexDirection={"column"}>
          <Text customClass="font24">{data?.title}</Text>
          <Text customClass="font14 grey-text">{data?.description}</Text>
        </Box>
      </Box>
    </>
  );
}

export default CategoryDetailsHeader;
