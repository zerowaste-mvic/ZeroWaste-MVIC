import { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import FoodInventory from './pages/FoodInventory';
import BrowseFoodItem from './pages/BrowseFoodItem';
import AddFoodItem from './pages/AddFoodItem';
import EditFoodItem from './pages/EditFoodItem';
import MealPlanner from './pages/MealPlanner';
import ExpiryAlerts from './pages/ExpiryAlerts';
import Settings from './pages/Settings';

export default function Dashboard({ onNavigate }) {
  const [activePage, setActivePage] = useState('inventory');
  const [editingItem, setEditingItem] = useState(null);
  // Bumped whenever the profile is updated in Settings, so DashboardLayout
  // re-reads the cached user (e.g. updated full name in the header) even
  // though the user hasn't navigated away from the Settings page.
  const [profileVersion, setProfileVersion] = useState(0);

  const handleFoodAdded = () => {
    setActivePage('inventory');
  };

  const handleFoodEdited = () => {
    setActivePage('inventory');
    setEditingItem(null);
  };

  // Extended navigate: supports ('edit-food', item)
  const handleNavigate = (page, data) => {
    if (page === 'edit-food' && data) {
      setEditingItem(data);
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
    >
      {renderPage()}
    </DashboardLayout>
  );
}