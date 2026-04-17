import "./App.css";
import ToastProvider from "./components/ui/ToastProvider";
import AppRoutes from "./routes/AppRoutes";

function App() {
  window.addEventListener("error", (e) => {
  console.log("GLOBAL ERROR:", e.error);
});

  return <>
  <ToastProvider />
  <AppRoutes />;
  </>

}

export default App;
