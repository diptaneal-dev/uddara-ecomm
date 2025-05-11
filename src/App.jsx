import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Footer from './layouts/header-footer/Footer';
import Register from './layouts/register/Register';
import SignInPage from './layouts/signin/SignInPage';
import UddaraBanner from './components/Banner/UddaraBanner';

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
import AdminLayout from './pages/admin/AdminLayout';
import AdminHome from './pages/admin/AdminHome';
import PrivateRoute from './pages/admin/PrivateRoute';
import AdminAvailability from './pages/admin/AdminAvailability';
import ProductAdminLayout from './pages/admin/productmanagement/ProductAdminLayout';
import ProductDashboard from './pages/admin/productmanagement/ProductDashboard';
import StoreManagementPage from './pages/admin/storemanagement/StoreManagementPage';

// Ecommerce
import { Explore } from './pages/Explore';
import ProductDetailsPage from './pages/product/detailspage/ProductDetails';
import OrderConfirmationPage from './pages/OrderConfirmationPage';

import ShopNow from './pages/ShopNow';
import Cart from './pages/shoppingCart/Cart';
import CheckoutPage from './pages/orderMgmt/CheckoutPage';
import PlaceOrderPage from './pages/orderMgmt/PlaceOrderPage';
import PaymentDashboard from './pages/payments/PaymentDashboard';

// stores
import StoreDetailsPage from './pages/admin/storemanagement/StoreDetailsPage';

// Policies
import TermsAndConditionsPage from './pages/FooterPages/TermsAndConditionsPage';
import CookiePolicyPage from './pages/FooterPages/CookiePolicyPage';
import GrievancesPage from './pages/FooterPages/Greivances';

import CareersPage from './pages/careers/CareersPage';
import ContactUs from './pages/contact/ContactUs';

import ProductListing from './pages/admin/productmanagement/ProductListing';
import CustomBlogEditor from './pages/blog/BlogEditor';
import BlogsListPage from './pages/blog/BlogsListPage';

// Admin Functions
import ClientManagement from './pages/clientMgmt/ClientManagement';
import UserAdminLayout from './pages/admin/usermanagement/UserAdminLayout';
import UserDirectory from './pages/admin/usermanagement/UserDirectory';
import InviteUserScreen from './pages/admin/usermanagement/InviteUserScreen';

// PIM
import CreateProductPage from './pages/admin/productmanagement/createproduct/CreateProductPage';

// Ref Data
import ReferenceAdminLayout from './pages/admin/refdatamanagement/ReferenceAdminLayout';
import CategoryList from './pages/admin/refdatamanagement/CategoryList';
import BulkUploadCategories from './pages/admin/refdatamanagement/BulkUploadCategories';
import CreateUserForm from './pages/admin/usermanagement/CreateUserForm';
import UserContextView from './hooks/UserContextView';
import UddaraHeader from './layouts/header-footer/UddaraHeader';
import CreateBlog from './components/Blogs/CreateBlog';
import ProductList from './pages/product/product_display/pages/ProductList';
import StaticBlogDetails from './pages/blogstatic/pages/StaticBlogDetails';
import StaticBlogsSummarySection from './pages/blogstatic/StaticBlogsSummarySection';

const App = () => {
    const { darkMode } = useTheme();
    const location = useLocation(); // Get the current location (URL path)

    const isAdminLayout = location.pathname.includes('/admin');

    return (
        <div className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}>
            <UddaraBanner />
            <UddaraHeader />
            <main className={`container-fluid px-0 py-0`} style={{ backgroundColor: "#FFF" }}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={<LandingPage />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/login" element={<SignInPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<ContactUs />} />

                    <Route path="/usercontext" element={<UserContextView />} />

                    <Route path="/create-blog" element={<CreateBlog />} />
                    {/* Blogs Support */}
                    <Route path="/blog" element={<BlogEditor />} />
                    <Route path="/blog/:id" element={<BlogView />} />
                    <Route path="/blog/list" element={<BlogsListPage />} />

                    <Route path="/blogsdash" element={<BlogsPage />} />

                    <Route path="/admin" element={<PrivateRoute />}>
                        {/* Admin routes that use the AdminLayout sidebar */}
                        <Route element={<AdminLayout />}>
                            <Route index element={<AdminHome />} />
                            <Route path="clients" element={<ClientManagement />} />
                            <Route path="stores" element={<StoreManagementPage />} />
                            <Route path="blogs" element={<BlogsAdminLayout />}>
                                <Route index element={<BlogsDashboard />} />
                                <Route path="new" element={<CustomBlogEditor />} />
                            </Route>
                            <Route path="payments" element={<PaymentDashboard />} />
                            <Route path="availability" element={<AdminAvailability />} />
                        </Route>

                        {/* Separate module-specific layouts (no double sidebars) */}
                        <Route path="products" element={<ProductAdminLayout />}>
                            <Route index element={<ProductDashboard />} />
                            <Route path="list" element={<ProductListing />} />
                            <Route path="new" element={<CreateProductPage />} />
                        </Route>

                        <Route path="usermgmt" element={<UserAdminLayout />}>
                            <Route index element={<UserDirectory />} />
                            <Route path="inviteUser" element={<InviteUserScreen />} />
                            <Route path="createUser" element={<CreateUserForm />} />
                        </Route>

                        <Route path="reference" element={<ReferenceAdminLayout />}>
                            <Route path="categories" element={<CategoryList />} />
                            <Route path="categories/bulk-upload" element={<BulkUploadCategories />} />
                        </Route>

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

                    <Route path="/sblog/:id" element={<StaticBlogDetails />} />
                    <Route path="/sblog/list" element={<StaticBlogsSummarySection />} />

                    <Route path="/store/:id" element={<StoreDetailsPage />} />

                </Routes>
            </main>

            {/* Conditionally render Footer based on the current route */}
            {!isAdminLayout && (
                <Footer />
            )}

            <SessionTimerWidget />

        </div>
    );
};

export default App;
