import { useEffect, useState } from 'react';
import DashboardLayout from './DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import FoodInventory from './pages/FoodInventory';
import BrowseFoodItem from './pages/BrowseFoodItem';
import AddFoodItem from './pages/AddFoodItem';
import EditFoodItem from './pages/EditFoodItem';
import MealPlanner from './pages/MealPlanner';
import ExpiryAlerts from './pages/ExpiryAlerts';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import Analytics from './pages/Analytics';
import { notificationApi } from '../../services/api';

export default function Dashboard({ onNavigate }) {
  const [activePage, setActivePage] = useState('inventory');
  const [editingItem, setEditingItem] = useState(null);
  const [profileVersion, setProfileVersion] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);

  const refreshUnreadCount = async () => {
    try {
      const data = await notificationApi.getUnreadCount();
      setUnreadCount(data?.count || 0);
    } catch {
      // Non-critical — badge just stays at its last known value.
    }
  };

  useEffect(() => {
    if (activePage === 'notifications') return;
    refreshUnreadCount();
  }, [activePage]);

  const handleFoodAdded = () => {
    setActivePage('inventory');
  };

  const handleFoodEdited = () => {
    setActivePage('inventory');
    setEditingItem(null);
  };

  const handleNavigate = (page, data) => {
    if (page === 'edit-food' && data) {
      setEditingItem(data);
    }
    if (page === 'notifications') {
      // Like opening a YouTube-style notification tray: clear the red badge
      // the instant you open it, rather than waiting for an explicit "Mark
      // all as read" click. Notifications.jsx does the actual mark-all-read
      // call itself before it loads the list, so there's no race between
      // the two.
      setUnreadCount(0);
    }
    setActivePage(page);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'overview':
        return <DashboardHome />;
      case 'inventory':
        return <FoodInventory onNavigate={handleNavigate} />;
      case 'browse':
        return <BrowseFoodItem onNavigate={handleNavigate} />;
      case 'expiry':
        return <ExpiryAlerts onNavigate={handleNavigate} />;
      case 'add-food':
        return <AddFoodItem onSuccess={handleFoodAdded} onCancel={() => setActivePage('inventory')} />;
      case 'edit-food':
        return editingItem
          ? <EditFoodItem item={editingItem} onSuccess={handleFoodEdited} onCancel={() => setActivePage('inventory')} />
          : <FoodInventory onNavigate={handleNavigate} />;
      case 'meal-planner':
        return <MealPlanner />;
      case 'settings':
        return <Settings onProfileUpdated={() => setProfileVersion((v) => v + 1)} />;
      case 'notifications':
        return <Notifications onUnreadCountChange={setUnreadCount} />;
      case 'analytics':
        return <Analytics />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <DashboardLayout
      key={profileVersion}
      activePage={activePage}
      onPageChange={handleNavigate}
      onNavigate={onNavigate}
      unreadCount={unreadCount}
    >
      {renderPage()}
    </DashboardLayout>
  );
}