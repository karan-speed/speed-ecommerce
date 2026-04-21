import { buttonIcons } from "../images";
import Box from "./Box/Box";
import Text from "./Text/Text";

interface FileUploadProps {
  id: string;
  title?: string;
  description?: string;
  accept?: string;
  multiple?: boolean;
  onChange?: (file: File[] | null) => void;
}

function FileUpload({
  id,
  title,
  description,
  accept,
  onChange,
  multiple = false,
}: FileUploadProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = Array.from(e.target.files || []);
    onChange?.(file);
  };

  return (
    <Box my={"20px"} customClass="product-img-box flex items-center">
      <label htmlFor={id} className="cursor-pointer">
        <input
          multiple={multiple}
          id={id}
          type="file"
          className="input-element"
          accept={accept}
          onChange={handleChange}
        />
        <Box customClass="upload-box flex items-center justify-center">
          {buttonIcons.add}
        </Box>
      </label>

      {(title || description) && (
        <Box ml={2} width={212}>
          {title && (
            <Text variant="h5" size={16}>
              {title}
            </Text>
          )}
          {description && (
            <Text customClass="grey-text" variant="h6" size={14}>
              {description}
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
}

export default FileUpload;
