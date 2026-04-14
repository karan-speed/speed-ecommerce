import React, { useMemo, useReducer } from "react";
import Box from "../../common/Box";
import Text from "../../common/Text";
import Button from "../../common/Button";
type TState = {
  count: number;
};
type TAction = { type: "increment" } | { type: "decrement" };
function Memo() {
  const initialState: TState = { count: 0 };
  const reducer = (state: TState, action: TAction) => {
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
  //   const incrementAction = dispatch({ type: "increment" });
  const heavyCalculation = useMemo(() => {
    console.log("heavy Calculation Rendered");
    let result = 0;
    for (let index = 0; index <= 1000; index++) {
      result += index;
    }
    return result;
  }, []);
  return (
    <Box customClass="section-header-wrapper">
      <Text>
        Counter Count : {state.count} {heavyCalculation}
      </Text>
      <Box width={300} display={"flex"} gap={1}>
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

export default Memo;
