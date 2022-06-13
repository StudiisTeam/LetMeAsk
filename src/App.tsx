import { AuthContextProvider } from "./context/AuthContext";
import Router from "./routes";
import "./styles/global.css";

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
