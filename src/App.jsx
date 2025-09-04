import "./App.css";
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import Frame from "./components/Sidebar/Frame";
import Dashboard from "./components/Dashboard/index";
import Auth from "./components/Auth";
import ProtectedRoute from "./components/ProtectedRoute";

function App(){
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/auth" element={<Auth/>}/>

      <Route path="/*" element={
        <ProtectedRoute>
         <FrameLayout/>
         </ProtectedRoute>
         }
         />
    </Routes>
  </BrowserRouter>
  );
};

function FrameLayout() {
  return (
        <Frame>
            <Routes>
             <Route path="/" element={<Dashboard />} />
            </Routes>
        </Frame>
   
  );
};

export default App;
