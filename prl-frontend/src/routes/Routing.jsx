import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// Layouts
import AppLayout from "../layout/AppLayout";
import AdminLayout from "../layout/AdminLayout";

// Frontend Pages
import Home from "../pages/Home/Home";
import Blogs from "../pages/Blogs/Blogs";
import Contact from "../pages/Contact-Us/Contact";
import AllProducts from "../pages/Products/AllProducts";
import Windowmachine from "../pages/Products/UpvcWindowMachine";
import AluminumWindowMachine from "../pages/Products/AluminumWindowMachine";
import CaseStudiesPage from "../casestudies/Casestudies";
import UpvcDetail from "../pages/Products/ProductDetailuPVC";
import AluminiumDetail from "../pages/Products/ProductDetailAluminium";
import ProductSlugPage from "../pages/Products/ProductSlugPage";
import LegacyProductRedirect from "../pages/Products/LegacyProductRedirect";

// Services Pages
import Services from "../pages/services/Services";
import MachineCustomization from "../pages/services/MachineCustomization";
import Installation from "../pages/services/Installation";
import Maintenance from "../pages/services/Maintenance";
import Training from "../pages/services/Training";
import BlogDetails from "../pages/Blogs/Blogdetails";
import FAQ from "../pages/ourcompany/FAQ";
import OurTeam from "../pages/ourcompany/OurTeam";
import News from "../pages/ourcompany/News";
import MissionVision from "../pages/ourcompany/Mission-vission";
import AboutPage from "../pages/ourcompany/AboutPage";
import OurCompanyPage from "../pages/ourcompany/OurCompany";
import Blogspage from "../pages/ourcompany/OurBlogs";

// 🛠️ Admin Pages
import DashboardPage from "../admin/sidebarpages/DashboardPage";
import Adminblog from "../admin/sidebarpages/Adminblog";
import AdminContact from "../admin/sidebarpages/AdminContact";
import AdminFooter from "../admin/sidebarpages/AdminFooter";
import AdminNarbar from "../admin/sidebarpages/AdminNarbar";
import AdminProducts from "../admin/sidebarpages/AdminProducts";
import AdminUpvcProducts from "../admin/sidebarpages/AdminProductspages/AdminUpvcProducts";
import AdminAluminumProducts from "../admin/sidebarpages/AdminProductspages/AdminAluminumProducts";
import AdminSeoManager from "../admin/sidebarpages/AdminSeoManager";
import AdminProfile from "../admin/adminnavorfootersidebar/AdminProfile";
import AdminSettings from "../admin/adminnavorfootersidebar/AdminSettings";

// 🔑 Admin Login Page
import AdminLogin from "../admin/AdminLogin";
import MakinoPage from "../pages/turnkey/TurnKey";
import TurnkeyPage from "../pages/turnkey/TurnKey";
import TurnkeyDetailPage from "../pages/turnkey/TurnkeyDetailPage";
import Admintestimonial from "../admin/sidebarpages/Admintestimonial";
import PrivacyPolicy from "../components/Privacy-policy";
import TermsAndConditions from "../components/Term-conditiom";
import EnquiryForm from "../components/EnquiryForm";
import MachinePage from "../pages/Products/AluminumWindowMachine";
import ProductDetailPage from "../pages/Products/ProductDetailuPVC";
// import Product from "../Product";

// ✅ Auth check function
const isAuthenticated = () => {
  return localStorage.getItem("token") ? true : false;
};

// ✅ Protect Route wrapper
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
};

const router = createBrowserRouter([
  // 🌐 Frontend Routes
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "blogs", element: <Blogs /> },
      { path: "products", element: <AllProducts /> },
      {
        path: "products/uPVC-window-making-machine-price",
        element: <Windowmachine />,
      },
      {
        path: "products/:categorySlug",
        element: <MachinePage />,
      },
      {
        path: "products/:categorySlug",
        element: <Windowmachine />,
      },
      {
        path: "products/aluminum-window-machines",
        element: <AluminumWindowMachine />,
      },

      {
        path: "products/:categorySlug/:productSlug",
        element: <LegacyProductRedirect />,
      },
      // {
      //   path: "product/:productSlug",
      //   element: <Product />,
      // },
      { path: "products/:productSlug", element: <ProductSlugPage /> },
      { path: "contact-us", element: <Contact /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms-and-conditions", element: <TermsAndConditions /> },
      { path: "case-studies", element: <CaseStudiesPage /> },
      { path: "product-detail/:id", element: <ProductDetailPage /> },
      // { path: "productdetailaluminium/:id", element: <AluminiumDetail /> },

      // ✅ 🔹 UPDATED: blogs/:id ki jagah blogs/:slug use kiya hai
      { path: "blogs/:slug", element: <BlogDetails /> },

      { path: "enquiry", element: <EnquiryForm /> },
      {
        path: "turn-key",
        element: <TurnkeyPage />,
      },
      { path: "turnkeydetailpage", element: <TurnkeyDetailPage /> },

      {
        path: "makinopage",
        element: <MakinoPage />,
      },
      // 🏢 Our Company Nested Routes
      {
        path: "our-company",
        element: <OurCompanyPage />,
        children: [
          { index: true, element: <Navigate to="about" replace /> },
          { path: "about-us", element: <AboutPage /> },
          { path: "faq", element: <FAQ /> },
          { path: "blogs", element: <Blogspage /> },
          { path: "our-team", element: <OurTeam /> },
          { path: "news", element: <News /> },
          { path: "mission-vision", element: <MissionVision /> },
        ],
      },

      // ⚙️ Services Nested Routes
      {
        path: "services",
        element: <Services />,
        children: [
          {
            index: true,
            element: <Navigate to="machine-customization" replace />,
          },
          { path: "machine-customization", element: <MachineCustomization /> },
          { path: "installation", element: <Installation /> },
          { path: "maintenance", element: <Maintenance /> },
          { path: "training", element: <Training /> },
        ],
      },
    ],
  },

  // 🔑 Admin Login Route
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },

  // 🔐 Admin Protected Routes
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "blog", element: <Adminblog /> },
      { path: "contact", element: <AdminContact /> },
      { path: "footer", element: <AdminFooter /> },
      { path: "products", element: <AdminProducts /> },
      { path: "seo", element: <AdminSeoManager /> },
      { path: "navbar", element: <AdminNarbar /> },
      { path: "testimonial", element: <Admintestimonial /> },
      { path: "profile", element: <AdminProfile /> },
      { path: "settings", element: <AdminSettings /> },
      { path: "products/upvc", element: <AdminUpvcProducts /> },
      { path: "products/aluminum", element: <AdminAluminumProducts /> },
    ],
  },
]);

const Routing = () => {
  return <RouterProvider router={router} />;
};

export default Routing;
