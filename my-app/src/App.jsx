import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import ChildDetail from "../components/ChildDetail";
import Login from "../components/Login";
import Signup from "../components/Signup";
import AddChild from "../components/AddChild";
import ChildList from "../components/ChildList";
import AddParent from "../components/AddParent";
import ParentList from "../components/ParentList";
import AdoptChild from "../components/AdoptChild";
import AdoptionList from "../components/AdoptionList";


function App() {
    return (
        <div>
        <Router >
            <Navbar />
            <Routes>
                <Route path="/" element={<AdoptionList />} />
                <Route path="/child/:id" element={<ChildDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/add-child" element={<AddChild />} />
                <Route path="/children" element={<ChildList />} />
                <Route path="/add-parent" element={<AddParent />} />
                <Route path="/parents" element={<ParentList />} />
                <Route path="/adopt-child" element={<AdoptChild />} />
                {/* <Route path="/adoption-list" element={<AdoptionList />} /> */}
            </Routes>
        </Router>
        </div>        
    );
}

export default App