import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./layout/HomeScreen/HomeScreen";
import ProfileScreen from "./layout/ProfileScreen/ProfileScreen";

import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./layout/LoginScreen/LoginScreen";
import RequireAuth from "./auth/RequireAuth";
import EditProfileTestPage from "./layout/TestingSreen/EditProfileTestPage";
import { AuthProvider } from "./auth/AuthContext";
import RegisterScreen from "./layout/RegisterScreen/RegisterScreen";
import ArtworkDetail from "./layout/ArtworkDetailScreen/ArtworkDetail";
import PostArtworkScreen from "./layout/PostArtworkScreen/PostArtworkScreen";
import ForgotPasswordScreen from "./layout/ForgotPasswordScreen/ForgotPasswordScreen";
import ResetPasswordScreen from "./layout/ForgotPasswordScreen/ResetPasswordScreen/ResetPasswordScreen";
import ChangePasswordScreen from "./layout/ChangePasswordScreen/ChangePasswordScreen";
import PostArtworkScreen from "./layout/PostArtworkScreen/PostArtworkScreen";

function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <AuthProvider>
          <Header />

          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
            <Route path="/reset-password" element={<ResetPasswordScreen />} />
            <Route path="/change-pasword" element={<ChangePasswordScreen />} />
            <Route path="/artwork/:id" element={<ArtworkDetail />} />
            <Route element={<RequireAuth />}>
              {/* Routes need to protect (must log in to access)*/}
              <Route path="/editTest" element={<EditProfileTestPage />} />
              {/* <Route path="/artwork" element={<HomeScreen />}> */}
              {/* {" "} */}
              {/* Artworks List component */}

              <Route path="/postAw" element={<PostArtworkScreen />} />
              {/* </Route> */}
            </Route>
            <Route path="/profile/:id" element={<ProfileScreen />} />
          </Routes>

          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </PrimeReactProvider>
  );
}

export default App;
