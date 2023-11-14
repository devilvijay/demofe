import logo from './logo.svg';
// import './App.css';
import Login from './Login';
import Admin from './Admin';
import User from './User';
import Register from './Register';
import ReactDOM from "react-dom/client";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

function App() {
  return (
    <div>
        < Routes >
        <Route path="/"   element={< Login />} />
        <Route path="/Admin" element={< Admin />} />
        <Route path="/User"  element={< User regid={2} />} />
        <Route path="/Register" element={<Register/>} />
        </Routes>
      {/* <User regid={3}></User> */}
      {/* <Login></Login> */}

        </div>
  );
}

export default App;
