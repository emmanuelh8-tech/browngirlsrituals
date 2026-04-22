import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Login from './Login';
import AdminLayout from './AdminLayout';
import Dashboard from './Dashboard';
import ProductsManager from './ProductsManager';
import HomeEditor from './editors/HomeEditor';
import AboutEditor from './editors/AboutEditor';
import BlogEditor from './editors/BlogEditor';
import ContactEditor from './editors/ContactEditor';
import FAQEditor from './editors/FAQEditor';
import FooterEditor from './editors/FooterEditor';
import ThemeEditor from './editors/ThemeEditor';
import Inbox from './editors/Inbox';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" />;
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="products" element={<ProductsManager />} />
                <Route path="home" element={<HomeEditor />} />
                <Route path="about" element={<AboutEditor />} />
                <Route path="blog" element={<BlogEditor />} />
                <Route path="contact" element={<ContactEditor />} />
                <Route path="faq" element={<FAQEditor />} />
                <Route path="footer" element={<FooterEditor />} />
                <Route path="theme" element={<ThemeEditor />} />
                <Route path="inbox" element={<Inbox />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const Admin = () => {
  return <AdminRoutes />;
};

export default Admin;
