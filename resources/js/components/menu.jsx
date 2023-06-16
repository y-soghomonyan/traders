
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/home';
import About from '../pages/about';
import Contact from '../pages/contact';
import Works from '../pages/works';
import UserProfile from "./user/UserProfile";
import MarketList from "./curencies/marketList";
import Product from "./product/product";
import NotFound from "../NotFound";

import Navbar from "./navbar";
function Menu() {
    return (
        <>
        <Navbar />
        
        <Routes>
            <Route path="/" element={<Home /> } />
            <Route path="/about" element={<About /> } />
            <Route path="/contact" element={<Contact /> } />
            <Route path="/work" element={<Works /> } />
            <Route path="/profile" element={<UserProfile /> } />
            <Route path="/market" element={<MarketList /> } />
            <Route path="/product/:id" element={<Product /> } />
            <Route path="*" element={<NotFound />} />
        </Routes>
        </>
    );
}

export default Menu;