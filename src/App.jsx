import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Header from './layouts/header-footer/Header';
import Footer from './layouts/header-footer/Footer';
import Register from './layouts/register/Register';
import SignInPage from './layouts/signin/SignInPage';


import LandingPage from './pages/landingPage/LandingPage';
import AboutUs from './pages/about/AboutUs';
import FavoritesPage from './components/FavouriteButton/FavouritesPage';
import SessionTimerWidget from "./components/Widgets/SessionTimerWidget";

// Blogs
import BlogEditor from './pages/blog/BlogEditor';
import BlogView from './pages/blog/BlogView';
import BlogsPage from './pages/blog/BlogsPage';
import BlogsAdminLayout from './pages/blog/BlogsAdminLayout';
import BlogsDashboard from './pages/blog/BlogsDashboard';

// Admin
import AdminHome from './pages/admin/AdminHome';
import PrivateRoute from './pages/admin/PrivateRoute';
import AdminAvailability from './pages/admin/AdminAvailability';
import ProductForm from './pages/admin/productmanagement/ProductForm';
import ProductAdminLayout from './pages/admin/productmanagement/ProductAdminLayout';
import ProductView from './pages/admin/productmanagement/ProductView';
import ProductDashboard from './pages/admin/productmanagement/ProductDashboard';
import Pricing from './pages/admin/productmanagement/ProductManagement';
import StoreManagementPage from './pages/admin/storemanagement/StoreManagementPage';

// Ecommerce
import { Explore } from './pages/Explore';
import ProductList from './pages/product/ProductList';
import ProductDetailsPage from './pages/product/ProductDetailsPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';

import ShopNow from './pages/ShopNow';
import Cart from './pages/shoppingCart/Cart';
import CheckoutPage from './pages/orderMgmt/CheckoutPage';
import PlaceOrderPage from './pages/orderMgmt/PlaceOrderPage';
import PaymentDashboard from './pages/payments/PaymentDashboard';

// Policies
import TermsAndConditionsPage from './pages/FooterPages/TermsAndConditionsPage';
import CookiePolicyPage from './pages/FooterPages/CookiePolicyPage';
import GrievancesPage from './pages/FooterPages/Greivances';

import CareersPage from './pages/careers/CareersPage';
import ContactUs from './pages/contact/ContactUs';

import ProductListing from './pages/admin/productmanagement/ProductListing';
import CustomBlogEditor from './pages/blog/BlogEditor';
import BlogsListPage from './pages/blog/BlogsListPage';
import ClientManagement from './pages/clientMgmt/ClientManagement';

const App = () => {
    const { darkMode } = useTheme();

    return (
        <div className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}>
            <Router>
                <Header />
                <main className={`container-fluid px-0 py-0`} style={{ backgroundColor: "#FFF" }}>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/home" element={<LandingPage />} />
                        <Route path="/signin" element={<SignInPage />} />
                        <Route path="/login" element={<SignInPage />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/contact" element={<ContactUs />} />

                        {/* Blogs Support */}
                        <Route path="/blog" element={<BlogEditor />} />
                        <Route path="/blog/:id" element={<BlogView />} />
                        <Route path="/blog/list" element={<BlogsListPage />} />

                        <Route path="/blogsdash" element={<BlogsPage />} />

                        {/* ✅ Admin Routes (Protected) */}
                        <Route path="/admin" element={<PrivateRoute><AdminHome /></PrivateRoute>} />
                        <Route path="/admin/payments" element={<PrivateRoute><PaymentDashboard /></PrivateRoute>} />
                        <Route path="/admin/availability" element={<PrivateRoute><AdminAvailability /></PrivateRoute>} />
                        <Route path="/admin/clients" element={<PrivateRoute><ClientManagement /></PrivateRoute>} />
                        <Route path="/admin/stores" element={<PrivateRoute><StoreManagementPage /></PrivateRoute>} />

                        {/* ✅ Product Management Routes (Under ProductAdminLayout) */}
                        <Route path="/admin/productmgmt" element={<PrivateRoute><ProductAdminLayout /></PrivateRoute>}>
                            <Route index element={<ProductDashboard />} />
                            <Route path="products/list" element={<ProductListing />} />
                            <Route path="products/new" element={<ProductForm />} />
                            <Route path="products/edit/:id" element={<ProductForm />} />
                            <Route path="products/view/:id" element={<ProductView />} />
                            <Route path="products/pricing/:id" element={<Pricing />} />
                        </Route>

                        <Route path="/admin/blogsmgmt" element={<PrivateRoute><BlogsAdminLayout /></PrivateRoute>}>
                            <Route index element={<BlogsDashboard />} />
                            <Route path="new" element={<CustomBlogEditor />} />
                            <Route path="list" element={<BlogsListPage />} />
                        </Route>


                        <Route path="/terms" element={<TermsAndConditionsPage />} />
                        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
                        <Route path="/grievances" element={<GrievancesPage />} />
                        <Route path="/careers" element={<CareersPage />} />

                        <Route path="/shop" element={<ShopNow />} />
                        <Route path="/explore" element={<Explore />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/product/:id" element={<ProductDetailsPage />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/favorites" element={<FavoritesPage />} />

                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/place-order" element={<PlaceOrderPage />} />
                        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />

                    </Routes>
                </main>
                <Footer />
            </Router>
            <SessionTimerWidget />

        </div>
    );
};

export default App;
