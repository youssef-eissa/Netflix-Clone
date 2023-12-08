import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Signin from "./components/Signin";
import { useSelector } from 'react-redux'
import Home from "./components/Home";

type TUser = {
    token: string
    user:any
}
function App() {
    const token = useSelector((state: TUser) => state.user.token)
console.log(token);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<Signin />} />
        {token!=='' && <Route path="/home" element={<Home/>} />}
      </Routes>
    </div>
  );
}

export default App;
