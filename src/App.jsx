import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Frame from "./components/Sidebar/Frame";
import Dashboard from "./components/Dashboard/index";
import Auth from "./components/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import { AppProvider } from "./components/AppContext";
import News from "./components/News/News";
import Users from "./components/Users/Users";
import Menu from "./components/Menu&MenuItem/Menu.jsx";
import MenuItemsPage from "./components/Menu&MenuItem/Menuitempage.jsx";
import Media from "./components/MediaDanMediaItem/Media.jsx";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/auth/*" element={<Auth />} />

          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <FrameLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

function FrameLayout() {
  return (
        <Frame>
            <Routes>
             <Route path="/" element={<Dashboard />} />
              <Route path="/menus" element={<Menu />} />
              <Route path="/menu-item/:id" element={<MenuItemsPage />} />
              <Route path="/media-library" element={<Media />} />
              <Route path="/news" element={<News />} />
              <Route path="/users" element={<Users />} />
            </Routes>
        </Frame>
   
  );
}

export default App;