import SimpleProtectedRoute from '../../components/admin/SimpleProtectedRoute';
import SimpleAdminBypass from './SimpleAdminBypass';

const ProtectedAdminDashboard = () => {
  return (
    <SimpleProtectedRoute>
      <SimpleAdminBypass />
    </SimpleProtectedRoute>
  );
};

export default ProtectedAdminDashboard;