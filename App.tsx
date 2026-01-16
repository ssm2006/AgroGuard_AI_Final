
import React, { useState, useEffect } from 'react';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { DiseaseDetection } from './pages/DiseaseDetection';
import { Marketplace } from './pages/Marketplace';
import { Chatbot } from './pages/Chatbot';
import { Sidebar } from './components/Sidebar';
import { Auth } from './pages/Auth';
import { UserProfile } from './types';

export enum Page {
  Landing = 'landing',
  Dashboard = 'dashboard',
  Detection = 'detection',
  Marketplace = 'marketplace',
  Chatbot = 'chatbot',
  Auth = 'auth'
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Landing);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('agro_isLoggedIn') === 'true';
  });
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('agro_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    localStorage.setItem('agro_isLoggedIn', String(isLoggedIn));
    if (user) localStorage.setItem('agro_user', JSON.stringify(user));
    else localStorage.removeItem('agro_user');
  }, [isLoggedIn, user]);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLogin = (name: string, phoneNumber: string) => {
    setUser({
      name,
      phoneNumber,
      location: 'Pune, Maharashtra',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}&backgroundColor=d1fae5`,
      joinDate: new Date().toLocaleDateString()
    });
    setIsLoggedIn(true);
    navigate(Page.Dashboard);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.clear();
    navigate(Page.Landing);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  if (currentPage === Page.Landing) {
    return <Landing onStart={() => navigate(isLoggedIn ? Page.Dashboard : Page.Auth)} isLoggedIn={isLoggedIn} />;
  }

  if (currentPage === Page.Auth && !isLoggedIn) {
    return <Auth onLogin={handleLogin} onBack={() => navigate(Page.Landing)} />;
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar activePage={currentPage} onNavigate={navigate} />
      
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Modern Top Header - Light Theme */}
        <header className="sticky top-0 z-50 glass border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-sm"></div>
            <span className="text-xs font-bold tracking-widest text-emerald-800 uppercase">Pune Cluster - Live Analytics</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-bold text-slate-800">Namaste, {user?.name.split(' ')[0]}</span>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{user?.location}</span>
            </div>
            
            <div className="group relative">
              <div className="w-11 h-11 rounded-xl overflow-hidden border-2 border-emerald-100 cursor-pointer group-hover:border-emerald-500 transition-all hover:shadow-md">
                <img src={user?.avatar} alt="Profile" className="w-full h-full object-cover" />
              </div>
              
              {/* Profile Dropdown */}
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 border border-slate-200 shadow-xl z-[60]">
                <div className="p-3 border-b border-slate-100 mb-2">
                  <p className="font-bold text-slate-900">{user?.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Phone: {user?.phoneNumber}</p>
                </div>
                <button 
                  onClick={() => navigate(Page.Dashboard)} 
                  className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 rounded-xl text-sm font-semibold flex items-center gap-3 text-slate-700 transition-colors"
                >
                  <i className="fas fa-chart-line text-emerald-600"></i> My Analytics
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 hover:bg-red-50 rounded-xl text-sm font-semibold flex items-center gap-3 text-red-600 transition-colors"
                >
                  <i className="fas fa-sign-out-alt"></i> Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto bg-gradient-to-br from-emerald-50/20 to-transparent">
          <div className="max-w-7xl mx-auto">
            {currentPage === Page.Dashboard && <Dashboard user={user} />}
            {currentPage === Page.Detection && <DiseaseDetection />}
            {currentPage === Page.Marketplace && (
              <Marketplace 
                cart={cart} 
                addToCart={(item) => setCart([...cart, item])} 
                removeFromCart={removeFromCart}
                clearCart={clearCart}
              />
            )}
            {currentPage === Page.Chatbot && <Chatbot />}
          </div>
        </main>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-slate-200 px-6 py-4 flex justify-around items-center z-50 rounded-[2rem] shadow-2xl w-[90%] max-w-sm">
        <button onClick={() => navigate(Page.Dashboard)} className={`p-3 rounded-2xl transition-all ${currentPage === Page.Dashboard ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400'}`}>
          <i className="fas fa-th-large"></i>
        </button>
        <button onClick={() => navigate(Page.Detection)} className={`p-3 rounded-2xl transition-all ${currentPage === Page.Detection ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400'}`}>
          <i className="fas fa-leaf"></i>
        </button>
        <button onClick={() => navigate(Page.Chatbot)} className={`p-3 rounded-2xl transition-all ${currentPage === Page.Chatbot ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400'}`}>
          <i className="fas fa-robot"></i>
        </button>
        <button onClick={() => navigate(Page.Marketplace)} className={`p-3 rounded-2xl transition-all ${currentPage === Page.Marketplace ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400'}`}>
          <i className="fas fa-store"></i>
        </button>
      </div>
    </div>
  );
};

export default App;
