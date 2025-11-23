import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import ProtectedLayout from "../pages/Auth/layout/ProtectedLayout";
import PasswordRecovery from "../pages/Auth/layout/PasswordRecovery";

// Auth
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import OTPVerify from "../pages/Auth/OTPVerify";

// Common
import HomePage from "../pages/Home/Home";
import NotFoundPage from "../pages/not-found/NotFoundPage";
import NotificationPage from "../pages/notification/NotificationsPage";
import ProfilePage from "../pages/Profile/Profile";
import EditProfilePage from "../pages/Profile/EditProfile";

// Client
import ClientsLayout from "../pages/Dashboard/layouts/ClientsLayout";
import ClientDashboard from "../pages/Dashboard/ClientDashboard";
import PostJob from "../pages/Jobs/PostJob";
import OfferDetails from "../pages/Offers/OfferDetails";
import OfferLayout from "../pages/Offers/OfferLayout";
import OpenOffers from "../pages/Offers/OpenOffers";

// Freelancer
import FreelancerLayout from "../pages/Dashboard/layouts/FreelancerLayout";
import FreelanceDashboard from "../pages/Dashboard/FreelanceDashboard";
import OfferCreatePage from "../pages/Offers/CreateOffer";
import EditOfferPage from "../pages/Offers/EditOfferPage";
import JobDetails from "../pages/Jobs/JobDetails";
import OpenJobs from "../pages/Jobs/OpenJobs";
import ActiveOrders from "../pages/orders/ActiveOrders";
import AllOrders from "../pages/orders/AllOrders";

// Chat
import ChatLayout from "../pages/Chat/ChatLayout";
import ChatRoom from "../pages/Chat/ChatRoom";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/forgot-password" element={<PasswordRecovery />}>
        <Route index element={<ForgotPassword />} />
        <Route path="otp" element={<OTPVerify />} />
      </Route>

      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedLayout />}>

        {/* ------------------------- CLIENT ROUTES ------------------------- */}
        <Route path="/client" element={<ClientsLayout />}>
          <Route index element={<ClientDashboard />} />

          {/* Chat */}
          <Route path="chat" element={<ChatLayout />}>
            <Route path=":id" element={<ChatRoom />} />
          </Route>

          {/* Profile */}
          <Route path="profile/:id" element={<ProfilePage />} />
          <Route path="edit-profile/:id" element={<EditProfilePage />} />

          {/* Jobs */}
          <Route path="post-job/:client_id" element={<PostJob />} />

          {/* Offers */}
          <Route path="offer-detail/:id" element={<OfferDetails />} />
          <Route path="view-offers" element={<OfferLayout />}>
            <Route index element={<OpenOffers />} />
            <Route path="offer-detail/:id" element={<OfferDetails />} />
          </Route>

          {/* Notifications */}
          <Route path="notification/:id" element={<NotificationPage />} />
        </Route>

        {/* ----------------------- FREELANCER ROUTES ----------------------- */}
        <Route path="/freelancer" element={<FreelancerLayout />}>
          <Route index element={<FreelanceDashboard />} />

          {/* Chat */}
          <Route path="chat" element={<ChatLayout />}>
            <Route path=":id" element={<ChatRoom />} />
          </Route>

          {/* Profile */}
          <Route path="profile/:id" element={<ProfilePage />} />
          <Route path="edit-profile/:id" element={<EditProfilePage />} />

          {/* Offers */}
          <Route path="create-offer" element={<OfferCreatePage />} />
          <Route path="edit-offer/:offerId" element={<EditOfferPage />} />

          {/* Jobs */}
          <Route path="job-detail/:id" element={<JobDetails />} />
          <Route path="view-jobs" element={<OpenJobs />} />

          {/* Orders */}
          <Route path="active-orders" element={<ActiveOrders />} />
          <Route path="all-orders" element={<AllOrders />} />

          {/* Notifications */}
          <Route path="notification/:id" element={<NotificationPage />} />
        </Route>
      </Route>

      {/* NOT FOUND */}
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);
