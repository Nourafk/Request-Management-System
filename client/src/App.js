import Layout from "./components/Layout";
import { Routes as Switch, Route, } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AllRequests from "./pages/AllRequests";
import { AuthContextProvider } from "./context/AuthContext";
import CreateRequest from "./pages/CreateRequest";
import EditRequest from "./pages/EditRequest";



function App() {
  return (


    <AuthContextProvider>

      <Layout>
        <Switch>
          <Route path="/" element={<AllRequests />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Create" element={<CreateRequest />} />
          <Route path="/myRequests" element={<AllRequests />} />
          <Route path="/edit/:id" element={<EditRequest />} />
        </Switch>
      </Layout>

    </AuthContextProvider>
  );
}

export default App;
