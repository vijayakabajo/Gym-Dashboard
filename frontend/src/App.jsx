import Layout from "./Layout/Layout";
import AddCustomer from "./Pages/AddCustomer";
import Customers from "./Pages/Customers";
import DashBoard from "./Pages/DashBoard";
import Employess from "./Pages/Employess";
import Login from "./Pages/Login";
import Mapping from "./Pages/Mapping";
import Revenue from "./Pages/Revenue";
import Role from "./Pages/Role";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import Expiration from "./Pages/Expiration"
import ProtectedRoute from "./Layout/Components/ProtectedRoute";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/*ProtectedRoutes */}
        <Route path="/" element={<ProtectedRoute Component={() => <Layout Maincontent={DashBoard} />} />} />
        <Route path="/customers" element={<ProtectedRoute Component={() => <Layout Maincontent={Customers} />} />} />
        <Route path="/employees" element={<ProtectedRoute Component={() => <Layout Maincontent={Employess} />} />} />
        <Route path="/revenue" element={<ProtectedRoute Component={() => <Layout Maincontent={Revenue} />} />} />
        <Route path="/addcustomer" element={<ProtectedRoute Component={() => <Layout Maincontent={AddCustomer} />} />} />
        <Route path="/mapping" element={<ProtectedRoute Component={() => <Layout Maincontent={Mapping} />} />} />
        <Route path="/profile" element={<ProtectedRoute Component={() => <Layout Maincontent={Profile} />} />} />
        <Route path="/role" element={<ProtectedRoute Component={Role} />} />
        <Route path="/expiration" element={<ProtectedRoute Component={() => <Layout Maincontent={Expiration} />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;