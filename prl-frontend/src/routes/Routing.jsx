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

// Services Pages
import Services from "../pages/services/Services";
import MachineCustomization from "../pages/services/MachineCustomization";
import Installation from "../pages/services/Installation";
import Maintenance from "../pages/services/Maintenance";
import Training from "../pages/services/Training";
import BlogDetails from "../pages/Blogs/Blogdetails";
// import Turnkey from "../pages/turnkey/TurnKey";
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
import AdminProducts from "../admin/sidebarpages/adminProducts";
import AdminUpvcProducts from "../admin/sidebarpages/AdminProductspages/AdminUpvcProducts";
import AdminAluminumProducts from "../admin/sidebarpages/AdminProductspages/AdminAluminumProducts";
import AdminProfile from "../admin/adminnavorfootersidebar/AdminProfile";
import AdminSettings from "../admin/adminnavorfootersidebar/AdminSettings";

// 🔑 Admin Login Page
import AdminLogin from "../admin/AdminLogin";
import MakinoPage from "../pages/turnkey/TurnKey";
import TurnkeyPage from "../pages/turnkey/TurnKey";
import TurnkeyDetailPage from "../pages/turnkey/TurnkeyDetailPage";

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
      { path: "products/upvcwindowmachines", element: <Windowmachine /> },
      {
        path: "products/aluminumwindowmachines",
        element: <AluminumWindowMachine />,
      },
      { path: "contact", element: <Contact /> },
      { path: "casestudies", element: <CaseStudiesPage /> },
      { path: "productdetailupvc/:id", element: <UpvcDetail /> },
      { path: "productdetailaluminium/:id", element: <AluminiumDetail /> }, // Fixed: Changed to "aluminium" to match link
      { path: "blogs/:id", element: <BlogDetails /> },
      // { path: "turnkey", element: <Turnkey /> },
      {
        path: "turnkeypage",
        element: <TurnkeyPage />,
      },
      { path: "turnkeydetailpage", element: <TurnkeyDetailPage /> },

      {
        path: "makinopage",
        element: <MakinoPage />,
      },
      // 🏢 Our Company Nested Routes
      {
        path: "ourcompany",
        element: <OurCompanyPage />,
        children: [
          { index: true, element: <Navigate to="about" replace /> },
          { path: "about", element: <AboutPage /> },
          { path: "faq", element: <FAQ /> },
          { path: "ourblogs", element: <Blogspage /> },
          { path: "team", element: <OurTeam /> },
          { path: "news", element: <News /> },
          { path: "missionvision", element: <MissionVision /> },
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
      { path: "navbar", element: <AdminNarbar /> },
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
