import "./App.scss";
import HomeScreen from "./layout/HomeScreen/HomeScreen";

import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

function App() {
  return (
    <PrimeReactProvider>
      <HomeScreen />
    </PrimeReactProvider>
  );
}

export default App;
