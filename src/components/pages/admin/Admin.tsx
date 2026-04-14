import { useReducer } from "react";
import Box from "../../common/Box";
import Button from "../../common/Button";
import Child from "./Child";
import Text from "../../common/Text";

function Admin() {
  type State = {
    count: number;
  };
  type ActionType = { type: "increment" } | { type: "decrement" };
  const initialState: State = { count: 0 };
  const reducer = (state: State, action: ActionType) => {
    switch (action.type) {
      case "increment":
        return { count: state.count + 1 };
      case "decrement":
        return { count: state.count - 1 };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("render parent");

  return (
    <Box customClass="section-header-wrapper">
      <Box display={"flex"}>
        <Child />
        <Text>Counter Count = {state.count}</Text>
      </Box>
      <Box width={300} mt={"20px"} display={"flex"} gap={2}>
        {" "}
        <Button onClick={() => dispatch({ type: "increment" })}>
          Increase
        </Button>
        <Button onClick={() => dispatch({ type: "decrement" })}>
          Decrease
        </Button>
      </Box>
    </Box>
  );
}

export default Admin;
