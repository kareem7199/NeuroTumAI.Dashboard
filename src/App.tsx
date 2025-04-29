import Routes from "./routes/index.routes";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <RecoilRoot>
      <Toaster position="bottom-center" />
      <Routes />
    </RecoilRoot>
  );
}

export default App;
