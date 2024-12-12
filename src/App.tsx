import { useEffect } from "react";
import { MainRoutes } from "./routes/MainRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppStore } from "./store/useAppStore";

function App() {
  const initializeUser = useAppStore((state) => state.initializeUser);

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  return (
    <>
      <ToastContainer />
      <MainRoutes />
    </>
  );
}

export default App;
