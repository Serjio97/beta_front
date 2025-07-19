import React, { createContext, useContext, useState, useEffect } from 'react';

interface Admin {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

interface AdminContextType {
  isAdminLoggedIn: boolean;
  currentAdmin: Admin | null;
  admins: Admin[];
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  createAdmin: (username: string, email: string, password: string) => Promise<boolean>;
  deleteAdmin: (id: string) => Promise<boolean>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem('admin_session');
    const adminData = localStorage.getItem('admin_info');

    if (session === 'logged_in' && adminData) {
      setIsAdminLoggedIn(true);
      setCurrentAdmin(JSON.parse(adminData));
    }
    fetchAdmins();
    setLoading(false);
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/admins');
      const data = await res.json();
      setAdmins(data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('http://localhost:3000/api/admins/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) return false;

      const data = await res.json();
      localStorage.setItem('admin_session', 'logged_in');
      localStorage.setItem('admin_info', JSON.stringify(data.admin));
      setIsAdminLoggedIn(true);
      setCurrentAdmin(data.admin);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    setCurrentAdmin(null);
    localStorage.removeItem('admin_session');
    localStorage.removeItem('admin_info');
  };

  const createAdmin = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('http://localhost:3000/api/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) return false;
      await fetchAdmins();
      return true;
    } catch {
      return false;
    }
  };

  const deleteAdmin = async (id: string): Promise<boolean> => {
    if (id === currentAdmin?.id) return false;
    try {
      const res = await fetch(`http://localhost:3000/api/admins/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) return false;
      await fetchAdmins();
      return true;
    } catch {
      return false;
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminLoggedIn,
        currentAdmin,
        admins,
        login,
        logout,
        loading,
        createAdmin,
        deleteAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};
