import { useAuthState } from "react-firebase-hooks/auth";
import { User as FirebaseUser } from "firebase/auth";
import { auth } from "./firebase";
import GuestPage from "./components/GuestPage";
import Dashboard from "./components/Dashboard";

function App() {
  const [user] = useAuthState(auth) as [FirebaseUser | null, boolean, Error?];
  if (!user) {
    return <GuestPage />;
  }
  return <Dashboard user={user} />;
}

export default App;
