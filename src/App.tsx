/* eslint-disable react-hooks/exhaustive-deps */
import "./App.scss";

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PrimeReactProvider, addLocale, locale } from "primereact/api";
import "./primereact-theme/themes/mytheme/theme.scss";
import vi from "./primereact-api/locale/vi.json";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
//---------------------------
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//---------------------------
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
import ArtworksView from "./layout/ProfileScreen/ArtworksView/ArtworksView";
import AssetsView from "./layout/ProfileScreen/AssetsView/AssetsView";
import ServicesView from "./layout/ProfileScreen/ServicesView/ServicesView";
import CollectionsView from "./layout/ProfileScreen/CollectionsView/CollectionsView";
import SubscribeArea from "./layout/ProfileScreen/SubscribeArea/SubscribeArea";
import SetupSubscribeArea from "./layout/ProfileScreen/SetupSubscribeArea/SetupSubscribeArea";
import WalletView from "./layout/ProfileScreen/WalletView/WalletView";
import ProfileSettings from "./layout/ProfileSettingsScreen/ProfileSettingsScreen";
import ChatScreen from "./layout/ChatScreen/ChatScreen";
import CollectionDetailScreen from "./layout/CollectionDetailScreen/CollectionDetailScreen";
import HireScreen from "./layout/HireScreen/HireScreen";

import { getAuthInfo } from "./util/AuthUtil";
import NotFoundPage from "./pages/404";
import SearchScreen from "./layout/SearchScreen/SearchScreen";
import { AuthProvider } from "./auth/context/auth-provider";
import UnknownErrorPage from "./pages/unknown";
import { notificationItemType } from "./components/Notification";
import { GetChatboxesCurrentAccountRealtime } from "./layout/ChatScreen/services/ChatServices";
import InternalServerErrPage from "./pages/500";
import { ChatboxItemType } from "./layout/ChatScreen/ChatRelatedTypes";
import PolicyPage from "./pages/policy";
import { arraysNotisEqual } from "./util/ArrayUtil";

const WS_URL = process.env.REACT_APP_REAL_API_WS_BASE_URL || "https://dummyjson.com";

function App() {
  addLocale("vi", vi.vi);
  locale("vi");
  const primereactConfigValue = {};
  const [authInfo, setAuthInfo] = useState(getAuthInfo());
  const [isLogin, setIsLogin] = useState(authInfo?.id ? true : false);
  const [chatboxes, setChatboxes] = useState<ChatboxItemType[]>([]);
  const [chatNotis, setChatNotis] = useState<notificationItemType[]>([]);

  async function GetNotificationsCurrentAccountRt(
    setChatNotis: (value: notificationItemType[]) => void
  ) {
    const authenticationInfo = getAuthInfo();
    const url = `${WS_URL}/accounts/${authenticationInfo?.id}/notifications/ws?PageNumber=1&PageSize=10`;
    const socket = new WebSocket(url);

    let _tmpChatNotis: notificationItemType[] = [];

    return new Promise<() => void>((resolve, reject) => {
      socket.onopen = () => console.log("WS GetNotificationsCurrentAccountRt established");

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const notis = data?.Items?.map((noti: any) => {
          return {
            notificationId: noti.Id,
            content: noti.Content,
            notifyType: noti.NotifyType,
            isSeen: noti.IsSeen,
            creationDate: noti.CreatedOn,
            createdBy: noti.createdBy,
            avatar: noti.avatar,
          };
        });
        console.log("notis: ", notis);

        if (Array.isArray(notis) && !arraysNotisEqual(_tmpChatNotis, notis)) {
          _tmpChatNotis = notis;
          setChatNotis(notis);
        }
      };

      socket.onclose = () => {
        console.log("WebSocket connection GetNotificationsCurrentAccountRt closed");
      };

      socket.onerror = (error) => {
        console.error("WebSocket GetNotificationsCurrentAccountRt error:", error);
        reject(error);
      };

      resolve(() => {
        socket.close();
      });
    });
  }

  useEffect(() => {
    GetNotificationsCurrentAccountRt(setChatNotis);
    GetChatboxesCurrentAccountRealtime(setChatboxes);
  }, []);

  // Chatbox realtime - start
  function castChatboxToNotification(chatbox: ChatboxItemType): notificationItemType {
    const notification: notificationItemType = {
      notificationId: chatbox.id,
      content: chatbox?.text || "Tin nhắn mới ...",
      notifyType: "chat",
      isSeen: chatbox.isSeen,
      creationDate: chatbox.time,
      createdBy: chatbox.author.fullname,
      avatar: chatbox.avatar,
    };

    return notification;
  }

  return (
    <PrimeReactProvider value={primereactConfigValue}>
      <AuthProvider>
        <BrowserRouter>
          <Header
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            chatboxesData={chatboxes.map((chatbox) => castChatboxToNotification(chatbox))}
            notisData={chatNotis}
          />

          <Routes>
            <Route path="/" element={<HomeScreen isLogin={isLogin} />} />
            <Route
              path="/login"
              element={
                <LoginScreen
                  isLogin={isLogin}
                  setIsLogin={setIsLogin}
                  setAuthInfoChanged={setAuthInfo}
                />
              }
            />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
            <Route path="/reset-password" element={<ResetPasswordScreen />} />
            <Route path="/change-pasword" element={<ChangePasswordScreen />} />
            <Route path="/artwork/:id" element={<ArtworkDetail />} />
            <Route element={<RequireAuth />}>
              {/* Routes need to protect (must log in to access)*/}
              <Route path="/editTest" element={<EditProfileTestPage />} />
              <Route path="/artwork/post" element={<PostArtworkScreen />} />
              <Route path="/chat" element={<ChatScreen />} />
              <Route path="/chat/:id" element={<ChatScreen />} />
            </Route>
            <Route path="/account/:id" element={<ProfileScreen isLogin={isLogin} />}>
              <Route path="/account/:id/" element={<ArtworksView />} />
              <Route path="/account/:id/artwork" element={<ArtworksView />} />
              <Route path="/account/:id/assets" element={<AssetsView />} />
              <Route path="/account/:id/service" element={<ServicesView />} />
              <Route path="/account/:id/collection" element={<CollectionsView />} />
              <Route path="/account/:id/edit" element={<EditProfileTestPage />} />
              <Route path="/account/:id/subscribe" element={<SubscribeArea />} />
              <Route path="/account/:id/subscribe/setup" element={<SetupSubscribeArea />} />
              <Route path="/account/:id/wallet" element={<WalletView />} />
            </Route>
            <Route path="/account/settings" element={<ProfileSettings />} />
            <Route path="/collection/:id" element={<CollectionDetailScreen />} />
            <Route path="/hire" element={<HireScreen />} />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/explore" element={<SearchScreen />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/error" element={<UnknownErrorPage />} />
            <Route path="/error-internal-server" element={<InternalServerErrPage />} />
            <Route path="/policy" element={<PolicyPage />} />
          </Routes>
          <Footer />
          <ToastContainer />
        </BrowserRouter>
      </AuthProvider>
    </PrimeReactProvider>
  );
}

export default App;
