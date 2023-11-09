import "./App.css";
import CarDetails from "./controller/CarDetails/CarDetails";
import Login from "./controller/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/car-details" element={<CarDetails />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
