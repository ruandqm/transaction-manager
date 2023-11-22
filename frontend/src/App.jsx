import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import 'react-toastify/dist/ReactToastify.css';
import "./index.css"
import { ToastContainer } from "react-toastify";

export function App() {
  return (<>
    <BrowserRouter>
      <Router />
    </BrowserRouter>

    <ToastContainer />
  </>

  )
}
