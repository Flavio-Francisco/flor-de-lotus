import 'react-native-gesture-handler';
import Routes from "./src/routes";
import { AuthContextProvider } from './src/context/Agenda';


export default function App() {
  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
    
  );
}


