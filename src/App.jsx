// import { ThemeProvider } from "@/components/theme-provider"
// import { ModeToggle } from "./components/mode-toggle"
// import Login from "./components/Signup"
import { Provider } from 'react-redux';
import store from './store/store';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Dashboard";
import SignUpForm from "./components/Signup";
import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
