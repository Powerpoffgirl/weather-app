import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home.js";
import WeatherData from "./Components/WeatherData/WeatherData";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather/:city" element={<WeatherData />} />
      </Routes>
    </div>
  );
}

export default App;
