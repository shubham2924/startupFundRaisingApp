import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PhoneSignUp from "./components/PhoneSignUp";
import Registration from "./components/Registration";
import MyCompany from "./components/MyCompany";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import MyFunds from "./components/MyFunds";
import MyInvestments from "./components/MyInvestments";
import Landing from "./components/Landing";
import AllTransactions from "./components/AllTransactions";

function App() {
  return (
          <UserAuthContextProvider>
            <Routes>
              <Route path="/home" element={<Home />}/>
              <Route path="/" element={<Landing />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/alltransactions" element={<AllTransactions />} />
              <Route path="/login" element={<Login />} />
              <Route path="/mycompany" element={<MyCompany />} />
              <Route path="/myfunds" element={<MyFunds />} />
              <Route path="/myinvestments" element={<MyInvestments />} />
              <Route path="/phonesignup" element={<PhoneSignUp />} />
              <Route path="/registration" element={<Registration />} />
            </Routes>
          </UserAuthContextProvider>
  );
}

export default App;