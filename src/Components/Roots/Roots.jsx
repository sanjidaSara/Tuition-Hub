
import { Outlet } from "react-router-dom";

import Header from "../Pages/Header";
import Footer from "../Pages/Footer";


const Roots = () => {
    return (
        <div className="max-auto">
            <div className="max-w-6xl mx-auto">
            <Header></Header>
            <Outlet></Outlet>
            </div>
           <Footer></Footer>
        </div>
    );
};

export default Roots;