import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./layout/HomeScreen/HomeScreen";

import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>

      <Header />
      
      <Routes>
        <Route path="/" element={<HomeScreen />} />
      </Routes>      
      
      <Footer />
      
      </BrowserRouter>
    </PrimeReactProvider>
  );
}

export default App;
