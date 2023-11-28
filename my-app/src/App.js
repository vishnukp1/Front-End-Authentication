import { Route, Routes } from "react-router-dom";
import "./styles/offerPedia.css"
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import UsersList from "./pages/UsersList";

function App() {
  return (
    <div className="App">
     <Routes>
     <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/forgotPassword" element={<ForgotPassword />} />
        <Route exact path="/changePassword" element={<ChangePassword />} />
        <Route exact path="/usersList" element={<UsersList />} />
       
     </Routes>
    </div>
  );
}

export default App;
