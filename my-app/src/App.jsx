import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import ChildDetail from "../components/ChildDetail";
import Login from "../components/Login";
import Signup from "../components/Signup";
import AdoptionForm from "../components/AdoptionForm";
import AdoptedChildren from "../components/AdoptedChildren";
import AddChild from "../components/AddChild";


function App() {
    return (
        <div>
        <Router >
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/child/:id" element={<ChildDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/adopted-children" element={<AdoptedChildren />} />
                <Route path="/adopt" element={<AdoptionForm />} />
                <Route path="/add-child" element={<AddChild />} />
            </Routes>
        </Router>
        {/* <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Child Adoption Application</h1>
        <p className="mt-2 text-gray-600">
          Thank you for considering adoption. Please fill out the form below.
        </p>
      </header> */}
        </div>        
    );
}

export default App