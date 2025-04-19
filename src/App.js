import { useState } from 'react';
import { supabase } from './lib/supabaseClient';
import ScannerInterface from './components/ScannerInterface';
import FormsDashboard from './components/FormsDashboard';
import AnalyticsView from './components/AnalyticsView';

export default function App() {
  const [activeTab, setActiveTab] = useState('scan');
  const [user, setUser] = useState(null);

  // Handle authentication
  const handleLogin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (!error) setUser(data.user);
  };

  // Main app layout
  return (
    <div className="app-container">
      {/* Header/Navigation */}
      <header className="app-header">
        <h1>Form Scanner System</h1>
        <nav>
          <button 
            className={activeTab === 'scan' ? 'active' : ''}
            onClick={() => setActiveTab('scan')}
          >
            Scan Forms
          </button>
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            Form Dashboard
          </button>
          <button 
            className={activeTab === 'analytics' ? 'active' : ''}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="app-main">
        {!user ? (
          <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleLogin(formData.get('email'), formData.get('password'));
            }}>
              <input type="email" name="email" placeholder="Email" required />
              <input type="password" name="password" placeholder="Password" required />
              <button type="submit">Login</button>
            </form>
          </div>
        ) : (
          <>
            {activeTab === 'scan' && <ScannerInterface />}
            {activeTab === 'dashboard' && <FormsDashboard />}
            {activeTab === 'analytics' && <AnalyticsView />}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Form Scanner System © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}