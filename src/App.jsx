import "./App.css";
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import Frame from "./components/Sidebar/Frame";
import Auth from "./components/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import { AppProvider } from "./components/AppContext";
import News from "./components/News/News";
import Users from "./components/Users/Users";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Menu from "./components/Menu/Menu.jsx";
import MenuItemsPage from "./components/Menu/Menuitempage.jsx";

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
             <Route path="/news" element={<News />} />
             <Route path="/users" element={<Users />} />
              <Route path="/menus" element={<Menu />} />
            
            </Routes>
        </Frame>
   
  );
};

export default App;
