import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useData } from './DataContext';
import {
  LayoutDashboard,
  Package,
  Home,
  Users,
  FileText,
  HelpCircle,
  Mail,
  AlignLeft,
  Palette,
  Inbox,
  LogOut,
  Menu,
  X,
  Globe
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  badge?: number;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Products', path: '/admin/products', icon: Package },
  { label: 'Home Page', path: '/admin/home', icon: Home },
  { label: 'Our Story', path: '/admin/about', icon: Users },
  { label: 'Journal', path: '/admin/blog', icon: FileText },
  { label: 'FAQ', path: '/admin/faq', icon: HelpCircle },
  { label: 'Contact', path: '/admin/contact', icon: Mail },
  { label: 'Footer', path: '/admin/footer', icon: AlignLeft },
];

const settingsItems: NavItem[] = [
  { label: 'Inbox', path: '/admin/inbox', icon: Inbox },
  { label: 'Theme Colors', path: '/admin/theme', icon: Palette },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { messages } = useData();

  const unreadCount = messages.filter((m) => !m.read).length;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-[#1a1a1a] text-white transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
          {sidebarOpen && (
            <span className="font-serif text-lg">BGR Admin</span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-2 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-[var(--theme-primary)] text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="text-sm">{item.label}</span>}
              </Link>
            );
          })}

          {/* Settings Section */}
          {sidebarOpen && (
            <div className="pt-4 mt-4 border-t border-gray-800">
              <p className="px-3 text-xs text-gray-500 uppercase tracking-wider mb-2">Settings</p>
            </div>
          )}
          {!sidebarOpen && <div className="pt-4 mt-4 border-t border-gray-800" />}
          
          {settingsItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const isInbox = item.path === '/admin/inbox';
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-[var(--theme-primary)] text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <div className="relative">
                  <Icon size={20} />
                  {isInbox && unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </div>
                {sidebarOpen && (
                  <span className="text-sm flex-1">{item.label}</span>
                )}
                {isInbox && unreadCount > 0 && sidebarOpen && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-gray-800 bg-[#1a1a1a]">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-200"
            title={!sidebarOpen ? 'View Website' : undefined}
          >
            <Globe size={20} />
            {sidebarOpen && <span className="text-sm">View Website</span>}
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-400 hover:bg-red-900/50 hover:text-red-400 transition-all duration-200"
            title={!sidebarOpen ? 'Logout' : undefined}
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-16'
        }`}
      >
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-medium text-gray-800">
              {[...navItems, ...settingsItems].find((item) => item.path === location.pathname)?.label || 'Admin'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--theme-primary)] border border-[var(--theme-primary)] rounded-lg hover:bg-[var(--theme-primary)] hover:text-white transition-colors"
            >
              <Globe size={16} />
              View Website
            </a>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
