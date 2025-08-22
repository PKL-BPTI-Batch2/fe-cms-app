import "./App.css";
import { BrowserRouter ,Routes,Route } from "react-router-dom";
import Frame from "./components/Sidebar/Frame";




function App() {
  return (
    <BrowserRouter>
        <Frame>
            <Routes>
              
            </Routes>
        </Frame>
    </BrowserRouter>

  );
}

export default App;
