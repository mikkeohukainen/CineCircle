import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Layout } from "./components/Layout";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { SearchPage } from "./pages/SearchPage";
import { AdvancedSearchPage } from "./pages/AdvancedSearchPage";
import AuthProvider from "./contexts/AuthContext.jsx";
import UserInfoProvider from "./contexts/UserInfoContext.jsx";
import { MediaDetailsPage } from "./pages/MediaDetailsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { DeleteAccount } from "./components/UserDeleteAccount";
import { GroupsPage } from "./pages/GroupsPage";
import { GroupDetailsPage } from "./pages/GroupDetailsPage";
import { ShowtimesPage } from "./pages/ShowtimesPage";
import { CreateGroupPage } from "./pages/CreateGroupPage";

export default function App() {
  return (
    <AuthProvider>
      <UserInfoProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="signup" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="advanced-search" element={<AdvancedSearchPage />} />
            <Route path="details" element={<MediaDetailsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="profile/delete" element={<DeleteAccount />} />
            <Route path="groups" element={<GroupsPage />} />
            <Route path="group-details" element={<GroupDetailsPage />} />
            <Route path="theaters" element={<ShowtimesPage />} />
            <Route path="create-group" element={<CreateGroupPage />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Route>
        </Routes>
      </UserInfoProvider>
    </AuthProvider>
  );
}
