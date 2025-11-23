import React from "react"
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import FreelanceDashboard from "./pages/Dashboard/FreelanceDashboard"
import {
      createBrowserRouter,
      createRoutesFromElements,
      Route,
      RouterProvider
} from "react-router-dom"
import ClientDashboard from "./pages/Dashboard/ClientDashboard"
import ChatLayout from './pages/Chat/ChatLayout'
import ChatRoom from './pages/Chat/ChatRoom'
import FreelancerLayout from "./pages/Dashboard/layouts/FreelancerLayout"
import ClientsLayout from "./pages/Dashboard/layouts/ClientsLayout"
import ProfilePage from "./pages/Profile/Profile"
import OfferCreatePage from "./pages/Offers/CreateOffer"
import PostJob from "./pages/Jobs/PostJob"
import OTPVerify from "./pages/Auth/OTPVerify"
import ForgotPassword from "./pages/Auth/ForgotPassword"
import JobDetails from "./pages/Jobs/JobDetails"
import OpenJobs from "./pages/Jobs/OpenJobs"
import OpenOffers from "./pages/Offers/OpenOffers"
import OfferDetails from "./pages/Offers/OfferDetails"
import OfferLayout from "./pages/Offers/OfferLayout"
import ActiveOrders from "./pages/orders/ActiveOrders"
import AllOrders from "./pages/orders/AllOrders"
import NotFoundPage from "./pages/not-found/NotFoundPage"
import PasswordRecovery from "./pages/Auth/layout/PasswordRecovery"
import HomePage from "./pages/Home/Home"
import ProtectedLayout from "./pages/Auth/layout/ProtectedLayout"

function App() {

      const routes = createBrowserRouter(
            createRoutesFromElements(
                  <>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot-password" element={<PasswordRecovery />} >
                              <Route index element={<ForgotPassword />} />
                              <Route path="otp" element={<OTPVerify />} />
                        </Route>

                        <Route element={<ProtectedLayout />}>
                              {/* Client Routes */}
                              <Route path="/client" element={<ClientsLayout />} >
                                    <Route index element={<ClientDashboard />} />
                                    <Route path="chat" element={<ChatLayout />}>
                                          <Route path=":id" element={<ChatRoom />} />
                                    </Route>
                                    <Route path="profile/:id" element={<ProfilePage />} />
                                    <Route path="post-job/:client_id" element={<PostJob />} />
                                    <Route path="offer-detail/:id" element={<OfferDetails />} />
                                    <Route path="view-offers" element={<OfferLayout />} >
                                          <Route index element={<OpenOffers />} />
                                          <Route path="offer-detail/:id" element={<OfferDetails />} />
                                    </Route>

                              </Route>

                              {/* Freelancer Routes */}
                              <Route path="/freelancer" element={<FreelancerLayout />} >
                                    <Route index element={<FreelanceDashboard />} />
                                    <Route path="chat" element={<ChatLayout />}>
                                          <Route path=":id" element={<ChatRoom />} />
                                    </Route>
                                    <Route path="profile/:id" element={<ProfilePage />} />
                                    <Route path="create-offer" element={<OfferCreatePage />} />
                                    <Route path="job-detail/:id" element={<JobDetails />} />
                                    <Route path="view-jobs" element={<OpenJobs />} />
                                    <Route path="active-orders" element={<ActiveOrders />} />
                                    <Route path="all-orders" element={<AllOrders />} />
                              </Route>
                        </Route>


                        <Route path="*" element={<NotFoundPage />} />
                  </>
            )
      )

      return (
            <RouterProvider router={routes} />
      )
}

export default App
