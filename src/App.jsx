import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import Management from "./pages/management/Management";
import Metrics from "./pages/metrics/Metrics";
import Ranking from "./pages/ranking/Ranking";
import Login from "./pages/login/Login";
import RootLayout from "./layout/RootLayout";
// isso é o aplicativo inicial
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<Login />} /> {/* Página de login */}
        {/* Layout raiz */}
        <Route path="/" element={<RootLayout />}>
          {/* Rotas protegidas com ProtectedRoute */}
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/management/:rep?" element={<Management />} />
            <Route path="metrics" element={<Metrics />} />
            <Route path="ranking" element={<Ranking />} />
          </Route>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
