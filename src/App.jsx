import "./App.css";
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import Frame from "./components/Sidebar/Frame";
import Dashboard from "./components/Dashboard/index";

function App() {
  return (
    <BrowserRouter>
        <Frame>
            <Routes>
             <Route path="/" element={<Dashboard />} />
            </Routes>
        </Frame>
    </BrowserRouter>

  );
}

export default App;
