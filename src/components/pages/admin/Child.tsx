import { memo } from "react";
import Text from "../../common/Text";
type State = {
  count: number;
};
function Child() {
  console.log("render child");
  return (
    <>
      <Text mr={4}>Child</Text>
    </>
  );
}
export default memo(Child);
