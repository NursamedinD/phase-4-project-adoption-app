import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import ChildDetail from "../components/ChildDetail";
import Login from "../components/Login";
import Signup from "../components/Signup";
import AdoptedChildren from "../components/AdoptedChildren";
import PrivateRoute from "../components/PrivateRoute";


function App() {
    return (
        <Router >
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/child/:id" element={<ChildDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/adopted-children" element={<PrivateRoute><AdoptedChildren /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App