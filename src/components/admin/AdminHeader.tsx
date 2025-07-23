
import { Button } from '@/components/ui/button';
import { LogOut, Palette ,MessageSquare} from 'lucide-react';

interface AdminHeaderProps {
  onLogout: () => void;
  onStyleSettingsOpen: () => void;
  onPopupManagementOpen: () => void;
}

const AdminHeader = ({ onLogout, onStyleSettingsOpen,onPopupManagementOpen  }: AdminHeaderProps) => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="container-width section-padding">
        <div className="py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Content Management Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your website content from this dashboard</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onPopupManagementOpen}
              className="flex items-center gap-2"
            >
              <MessageSquare size={16} />
              Popup
            </Button>
           {/*  <Button
              variant="outline"
              onClick={onStyleSettingsOpen}
              className="flex items-center gap-2"
            >
              <Palette size={16} />
              Style Settings
            </Button> */}
            <Button variant="outline" onClick={onLogout} className="flex items-center gap-2">
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
