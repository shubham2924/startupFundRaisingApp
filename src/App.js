import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreatePost from "./components/CreatePost";
import PhoneSignUp from "./components/PhoneSignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import MyFunds from "./components/MyFunds";
import MyInvestments from "./components/MyInvestments";

function App() {
  return (
    // <Container style={{ width: "400px" }}>
    //   <Row>
    //     <Col>
          <UserAuthContextProvider>
            <Routes>
              <Route
                path="/home"
                element={
                  // <ProtectedRoute>
                    <Home />
                  // </ProtectedRoute>
                }
              />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/myfunds" element={<MyFunds />} />
              <Route path="/myinvestments" element={<MyInvestments />} />
              <Route path="/phonesignup" element={<PhoneSignUp />} />
              <Route path="/createpost" element={
              // <ProtectedRoute>
              <CreatePost />
              // </ProtectedRoute>
            } />
            </Routes>
          </UserAuthContextProvider>
    //     </Col>
    //   </Row>
    // </Container>
  );
}

export default App;