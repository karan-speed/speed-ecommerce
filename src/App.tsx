import { BrowserRouter } from "react-router-dom";
import EcommerceRouter from "./routes/router";
import AlertMessage from "./components/common/AlertMessage";
import BackdropLoader from "./components/common/BackdropLoader";
export default function App() {
  return (
    <BrowserRouter>
      <EcommerceRouter />
      <AlertMessage />
      <BackdropLoader />
    </BrowserRouter>
  );
}
