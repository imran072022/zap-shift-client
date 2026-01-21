import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import BeARider from "../Pages/BeARider/BeARider";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import RiderApplications from "../Pages/Dashboard/RiderApplications/RiderApplications";
import UsersManagement from "../Pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import Forbidden403 from "../Components/Forbidden403";
import AssignRiders from "../Pages/Dashboard/AssignRiders/AssignRiders";
import AssignedParcels from "../Pages/Dashboard/AssignedParcels/AssignedParcels";
import NotFoundPage404 from "../Components/NotFoundPage404";
import RiderRoute from "./RiderRoute";
import AllDeliveries from "../Pages/Dashboard/AllDeliveries/AllDeliveries";
import DeliveryHistory from "../Pages/Dashboard/DeliveryHistory/DeliveryHistory";
import ParcelTracking from "../Pages/TrackingParcel/TrackingParcel";
import DashboardOverview from "../Pages/Dashboard/DashboardOverview/DashboardOverview";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "be-rider",
        element: (
          <PrivateRoute>
            <BeARider></BeARider>
          </PrivateRoute>
        ),
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "tracking-parcel/:trackingId",
        Component: ParcelTracking,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardOverview,
      },
      {
        path: "deliveries",
        Component: AllDeliveries,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      /*Admin only routes */
      {
        path: "rider-applications",
        element: (
          <AdminRoute>
            <RiderApplications></RiderApplications>
          </AdminRoute>
        ),
      },
      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UsersManagement></UsersManagement>
          </AdminRoute>
        ),
      },
      {
        path: "assign-riders",
        element: (
          <AdminRoute>
            <AssignRiders></AssignRiders>
          </AdminRoute>
        ),
      },

      /*Rider Only routes */
      {
        path: "assigned-parcels",
        element: (
          <RiderRoute>
            <AssignedParcels></AssignedParcels>
          </RiderRoute>
        ),
      },
      {
        path: "delivery-history",
        element: (
          <RiderRoute>
            <DeliveryHistory></DeliveryHistory>
          </RiderRoute>
        ),
      },
    ],
  },
  {
    path: "forbidden",
    Component: Forbidden403,
  },
  {
    path: "*",
    Component: NotFoundPage404,
  },
]);
