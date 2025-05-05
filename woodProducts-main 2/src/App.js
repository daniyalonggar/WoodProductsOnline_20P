import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from "./pages/Main";
import Contacts from "./pages/Contacts";
import Products from "./pages/Products";
import Navbar from "./components/navbars/Navbar";
import {Footer} from "./components/footers/Footer";
import Delivery from "./pages/Delivery";
import AboutUs from "./pages/AboutUs";
import {Provider} from 'react-redux';
import {AppContextProvider} from "./contexts/context";
import {store} from "./redux/store";
import CatalogPage from "./pages/Catalog";
import AuthModal from "./components/auth/AuthModal";
import ProfileModal from "./components/auth/ProfileModal";
import ProductDetails from "./pages/ProductDetail";

function App() {
    return (
        <Provider store={store}>
            <AppContextProvider>
                <div className="App">
                    <Router>
                        <Navbar/>
                        <Routes>
                            <Route path="/" element={<Main/>}/>
                            <Route path="/products" element={<Products/>}/>
                            <Route path="/contacts" element={<Contacts/>}/>
                            <Route path="/delivery" element={<Delivery/>}/>
                            <Route path="/about" element={<AboutUs/>}/>
                            <Route path="/catalogs" element={<CatalogPage/>}/>
                            <Route path="/products/:id" element={<ProductDetails/>}/>
                        </Routes>
                        <Footer/>
                    </Router>
                    <AuthModal/>
                    <ProfileModal/>
                </div>
            </AppContextProvider>
        </Provider>
    );
}

export default App;
