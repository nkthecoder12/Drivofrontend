import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { ProtectedRoute, PublicRoute } from "@/components/routing/ProtectedRoute";

// Layouts
import UserLayout from "@/components/layout/UserLayout";
import DriverLayout from "@/components/layout/DriverLayout";
import OwnerLayout from "@/components/layout/OwnerLayout";

// Auth pages
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";

// User pages
import UserHome from "@/pages/user/UserHome";
import RideBooking from "@/pages/user/RideBooking";
import RideTracking from "@/pages/user/RideTracking";
import RideHistory from "@/pages/user/RideHistory";
import UserProfile from "@/pages/user/UserProfile";

// Driver pages
import DriverDashboard from "@/pages/driver/DriverDashboard";
import DriverEarnings from "@/pages/driver/DriverEarnings";
import DriverHistory from "@/pages/driver/DriverHistory";

// Owner pages
import OwnerDashboard from "@/pages/owner/OwnerDashboard";
import DriverManagement from "@/pages/owner/DriverManagement";
import RideMonitor from "@/pages/owner/RideMonitor";
import OwnerAnalytics from "@/pages/owner/OwnerAnalytics";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Route>

            {/* User routes */}
            <Route element={<ProtectedRoute allowedRoles={['USER']} />}>
              <Route element={<UserLayout />}>
                <Route path="/ride" element={<UserHome />} />
                <Route path="/ride/tracking" element={<RideTracking />} />
                <Route path="/ride/history" element={<RideHistory />} />
                <Route path="/ride/profile" element={<UserProfile />} />
              </Route>
              <Route path="/ride/booking" element={<RideBooking />} />
            </Route>

            {/* Driver routes */}
            <Route element={<ProtectedRoute allowedRoles={['DRIVER']} />}>
              <Route element={<DriverLayout />}>
                <Route path="/driver" element={<DriverDashboard />} />
                <Route path="/driver/earnings" element={<DriverEarnings />} />
                <Route path="/driver/history" element={<DriverHistory />} />
              </Route>
            </Route>

            {/* Owner routes */}
            <Route element={<ProtectedRoute allowedRoles={['OWNER']} />}>
              <Route element={<OwnerLayout />}>
                <Route path="/owner" element={<OwnerDashboard />} />
                <Route path="/owner/drivers" element={<DriverManagement />} />
                <Route path="/owner/rides" element={<RideMonitor />} />
                <Route path="/owner/analytics" element={<OwnerAnalytics />} />
              </Route>
            </Route>

            {/* Redirect root to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
