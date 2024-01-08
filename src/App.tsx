import "./App.scss";

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PrimeReactProvider, addLocale, locale } from "primereact/api";
import "./primereact-theme/themes/mytheme/theme.scss";
import vi from "./primereact-api/locale/vi.json";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./layout/HomeScreen/HomeScreen";
import ProfileScreen from "./layout/ProfileScreen/ProfileScreen";
import LoginScreen from "./layout/LoginScreen/LoginScreen";
import RequireAuth from "./auth/RequireAuth";
import EditProfileTestPage from "./layout/TestingSreen/EditProfileTestPage";
import RegisterScreen from "./layout/RegisterScreen/RegisterScreen";
import ArtworkDetail from "./layout/ArtworkDetailScreen/ArtworkDetail";
import ForgotPasswordScreen from "./layout/ForgotPasswordScreen/ForgotPasswordScreen";
import ResetPasswordScreen from "./layout/ForgotPasswordScreen/ResetPasswordScreen/ResetPasswordScreen";
import ChangePasswordScreen from "./layout/ChangePasswordScreen/ChangePasswordScreen";
import PostArtworkScreen from "./layout/PostArtworkScreen/PostArtworkScreen";

import ArtworkManagement from "./layout/ProfileScreen/ArtworkScreen/ArtworkScreen";
import AssetScreen from "./layout/ProfileScreen/AssetScreen/AssetScreen";
import ServicesTab from "./layout/ProfileScreen/ServicesTab/ServicesTab";
import CollectionScreen from "./layout/ProfileScreen/CollectionTab/CollectionTab";
import SubscribeArea from "./layout/ProfileScreen/SubscribeArea/SubscribeArea";
import SetupSubscribeArea from "./layout/ProfileScreen/SetupSubscribeArea/SetupSubscribeArea";
import { getAuthInfo } from "./util/AuthUtil";


function App() {
  addLocale("vi", vi.vi);
  locale("vi");
  const primereactConfigValue = {};
  const [authInfo, setAuthInfo] = useState(getAuthInfo());
  console.log(authInfo);
  const [isLogin, setIsLogin] = useState(authInfo?.id ? true : false);
  return (
    <PrimeReactProvider value={primereactConfigValue}>
      <BrowserRouter>
          <Header isLogin={isLogin} />

          <Routes>
            <Route path="/" element={<HomeScreen isLogin={true} />} />
            <Route path="/login" element={<LoginScreen isLogin={isLogin} setIsLogin={setIsLogin}/>} />
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
            <Route path="/account/:id" element={<ProfileScreen isLogin={isLogin}/>} >
              <Route path="/account/:id/" element={<ArtworkManagement />} />
              <Route path="/account/:id/artwork" element={<ArtworkManagement/>} />
              <Route path="/account/:id/assets" element={<AssetScreen isLogin={isLogin} />} />
              <Route path="/account/:id/service" element={<ServicesTab />} />
              <Route path="/account/:id/collection" element={<CollectionScreen />} />
              <Route path="/account/:id/edit" element={<EditProfileTestPage />} />
              <Route path="/account/:id/subscribe" element={<SubscribeArea />} />
              <Route path="/account/:id/subscribe/setup" element={<SetupSubscribeArea />} />
            </Route>
          </Routes>

          <Footer />
      </BrowserRouter>
    </PrimeReactProvider>
  );
}

export default App;
