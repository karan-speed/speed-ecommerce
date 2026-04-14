import { memo, useEffect } from "react";
import Text from "../../common/Text";
type State = {
  login: () => void;
};
function Child({ login }: State) {
  console.log("render child");
  useEffect(() => {
    login();
  }, [login]);
  return (
    <>
      <Text mr={4}>{}</Text>
    </>
  );
}
export default memo(Child);
