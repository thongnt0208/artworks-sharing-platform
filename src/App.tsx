import './App.scss';
import { PrimeReactProvider } from 'primereact/api';

import HomeScreen from './layout/HomeScreen/HomeScreen';

function App() {
  return (
    <PrimeReactProvider>
      <HomeScreen />
    </PrimeReactProvider>
  );
}

export default App;
