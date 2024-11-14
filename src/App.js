import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.tsx";
import Results from "./Pages/Results/Results.tsx";
import Navbar from "./Components/Navbar.tsx";
import "./index.css";

function App() {
  return (
      <div className="container">
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/results" element={<Results />}></Route>
        </Routes>
    </Router>
      </div>
  );
}

export default App;
