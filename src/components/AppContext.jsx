// src/components/Context/AppContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import API from '../services/api'; 

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // indikator loading profil
  const [newsRows, setNewsRows] = useState([]);
  const [userRows, setUserRows] = useState([]);

  useEffect(() => {
    // skip fetch kalau sedang di halaman /auth
    if (location.pathname.startsWith("/auth")) {
      setLoadingUser(false); // jangan tunggu fetch
      return;
    }

    const fetchUser = async () => {
      try {
        // endpoint ini harus balikin data user berdasarkan cookie token
        const { data } = await API.get('/me'); 
        setCurrentUser(data);
      } catch (err) {
        // kalau belum login / token expired
        setCurrentUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [location.pathname]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loadingUser, 
        newsRows,
        setNewsRows,
        userRows,
        setUserRows,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// custom hook untuk akses context
export const useApp = () => useContext(AppContext);
