import "./App.css";
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import Frame from "./components/Sidebar/Frame";
<<<<<<< HEAD
import Dashboard from "./components/Dashboard/index";
import Auth from "./components/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import { AppProvider } from "./components/AppContext";
import News from "./components/News/News";
import Users from "./components/Users/Users";
=======
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Menu from "./components/Menu/Menu.jsx";
import MenuItemsPage from "./components/Menu/Menuitempage.jsx";
>>>>>>> origin/5-add-feature-menu-management

function App(){
  return(
  <BrowserRouter>
    <AppProvider>
    <Routes>
      <Route path="/auth/*" element={<Auth/>}/>

      <Route path="/*" element={
        <ProtectedRoute>
         <FrameLayout/>
         </ProtectedRoute>
         }
         />
    </Routes>
    </AppProvider>
  </BrowserRouter>
  );
};

function FrameLayout() {
  return (
        <Frame>
            <Routes>
             <Route path="/" element={<Dashboard />} />
<<<<<<< HEAD
             <Route path="/news" element={<News />} />
             <Route path="/users" element={<Users />} />
=======
              <Route path="/menus" element={<Menu />} />
            
>>>>>>> origin/5-add-feature-menu-management
            </Routes>
        </Frame>
   
  );
};

export default App;
