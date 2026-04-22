import { useData } from './DataContext';
import { Link } from 'react-router-dom';
import { Package, FileText, HelpCircle, TrendingUp, DollarSign, Users, Home, Mail, AlignLeft, Palette, Inbox } from 'lucide-react';

const Dashboard = () => {
  const { products, blogConfig, faqConfig, messages } = useData();

  const unreadCount = messages.filter((m) => !m.read).length;

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, color: 'bg-blue-500', link: '/admin/products' },
    { label: 'Blog Posts', value: blogConfig.posts.length, icon: FileText, color: 'bg-green-500', link: '/admin/blog' },
    { label: 'FAQs', value: faqConfig.faqs.length, icon: HelpCircle, color: 'bg-purple-500', link: '/admin/faq' },
    { label: 'Messages', value: messages.length, icon: Inbox, color: unreadCount > 0 ? 'bg-red-500' : 'bg-orange-500', link: '/admin/inbox', badge: unreadCount },
  ];

  const totalValue = products.reduce((sum, p) => sum + p.price, 0);
  const avgPrice = products.length > 0 ? totalValue / products.length : 0;

  const quickLinks = [
    { label: 'Home Page', icon: Home, link: '/admin/home', desc: 'Edit hero, about, experience' },
    { label: 'Products', icon: Package, link: '/admin/products', desc: 'Manage all products' },
    { label: 'Our Story', icon: Users, link: '/admin/about', desc: 'Edit about sections' },
    { label: 'Journal', icon: FileText, link: '/admin/blog', desc: 'Manage blog posts' },
    { label: 'FAQ', icon: HelpCircle, link: '/admin/faq', desc: 'Edit FAQ items' },
    { label: 'Contact', icon: Mail, link: '/admin/contact', desc: 'Edit contact info' },
    { label: 'Footer', icon: AlignLeft, link: '/admin/footer', desc: 'Edit footer content' },
  ];

  const settingsLinks = [
    { label: 'Inbox', icon: Inbox, link: '/admin/inbox', desc: unreadCount > 0 ? `${unreadCount} new messages` : 'View messages' },
    { label: 'Theme Colors', icon: Palette, link: '/admin/theme', desc: 'Change website colors' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-[#8b6d4b] to-[#6d5639] rounded-xl p-6 text-white">
        <h2 className="text-2xl font-serif mb-2">Welcome to Brown Girls Rituals Admin</h2>
        <p className="text-white/80">
          Manage your products, content, and website settings from this dashboard. All changes are saved automatically and will appear on your website immediately.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              to={stat.link}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative"
            >
              {(stat as any).badge > 0 && (
                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {(stat as any).badge} new
                </span>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-3xl font-semibold text-gray-800">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[var(--theme-primary)] p-2 rounded-lg">
              <DollarSign className="text-white" size={20} />
            </div>
            <span className="text-gray-500">Average Product Price</span>
          </div>
          <p className="text-2xl font-semibold text-gray-800">${avgPrice.toFixed(2)}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-500 p-2 rounded-lg">
              <TrendingUp className="text-white" size={20} />
            </div>
            <span className="text-gray-500">Price Range</span>
          </div>
          <p className="text-2xl font-semibold text-gray-800">
            ${products.length > 0 ? Math.min(...products.map(p => p.price)).toFixed(2) : '0.00'} - ${products.length > 0 ? Math.max(...products.map(p => p.price)).toFixed(2) : '0.00'}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-purple-500 p-2 rounded-lg">
              <Users className="text-white" size={20} />
            </div>
            <span className="text-gray-500">Total Inventory Value</span>
          </div>
          <p className="text-2xl font-semibold text-gray-800">${totalValue.toFixed(2)}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.link}
                className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/5 transition-all text-center"
              >
                <Icon className="text-[var(--theme-primary)] mb-2" size={24} />
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                <span className="text-xs text-gray-400 mt-1 hidden lg:block">{item.desc}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Settings</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {settingsLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.link}
                className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/5 transition-all text-center"
              >
                <Icon className="text-[var(--theme-primary)] mb-2" size={24} />
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                <span className="text-xs text-gray-400 mt-1 hidden lg:block">{item.desc}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800">Recent Products</h3>
          <Link to="/admin/products" className="text-sm text-[var(--theme-primary)] hover:underline">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Product</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Category</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Price</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(-5).reverse().map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <span className="text-sm text-gray-800">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">{product.category}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium text-[var(--theme-primary)]">
                      ${product.price.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {products.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No products yet. <Link to="/admin/products" className="text-[var(--theme-primary)] hover:underline">Add your first product</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
