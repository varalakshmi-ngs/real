import { ToastContainer } from "react-toastify";
import "./App.css";
import LoginScreen from "./features/auth/screens/LoginScreen";
import ProtectedRoute from "./Layout/ProtectedRoute";
import Layout from "./Layout/Layout";
import Dashboard from "./features/dashboard/screens/Dashboard";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Contribution from "./features/contribution/Contribution";
import BlogScreen from "./features/blog/BlogScreen";
import RequesrForPrayer from "./features/request-for-prayer/RequesrForPrayer";
import ContactScreen from "./features/contact/ContactScreen";

import HomepageEditor from "./features/dashboard/screens/HomepageEditor";
import AboutPageEditor from "./features/dashboard/screens/AboutPageEditor";
import Gallery from "./features/dashboard/screens/Gallery";
import EventScreen from "./features/event/EventScreen";
import MagzinePage from "./features/Magazine/MagzinePage";

function App() {
  return (
    <AuthProvider>
      <div className="w-full h-screen bg-[#f8fafc]">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/home" element={<HomepageEditor />} />
              <Route path="/about" element={<AboutPageEditor />} />
              <Route path="/gallery" element={<Gallery />} />

              <Route path="/contribution" element={<Contribution />} />
              <Route path="/blogs" element={<BlogScreen />} />
              <Route path="/request-prayer" element={<RequesrForPrayer />} />
              <Route path="/contact" element={<ContactScreen />} />
              <Route path="/event" element={<EventScreen />} />
              <Route path="/magazine" element={<MagzinePage />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
