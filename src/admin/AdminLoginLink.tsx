import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

const AdminLoginLink = () => {
  return (
    <Link
      to="/admin"
      className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#8b6d4b] transition-colors"
      title="Admin Login"
    >
      <Lock size={12} />
      <span>Admin</span>
    </Link>
  );
};

export default AdminLoginLink;
