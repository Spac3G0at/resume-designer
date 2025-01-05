import { useSelector } from "react-redux";
import GuestRoutes from "./routes/GuestRoutes";
import UserRoutes from "./routes/UserRoutes";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const Router = isAuthenticated ? UserRoutes : GuestRoutes;

  return <Router />;
}

export default App;
