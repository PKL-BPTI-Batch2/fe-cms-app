import "./App.css";
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import Frame from "./components/Sidebar/Frame";
import Dashboard from "./components/Dashboard/index";
import Menu from "./components/Menu/index";

function App() {
  return (
    <BrowserRouter>
        <Frame>
            <Routes>
             <Route path="/" element={<Dashboard />} />
              <Route path="/menus" element={<Menu />} />
            
            </Routes>
        </Frame>
    </BrowserRouter>

  );
}

export default App;
