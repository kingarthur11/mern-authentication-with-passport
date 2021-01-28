import React, {useState} from "react";
import axios from "axios";
import './App.css';

function App() {
  const [registerUsername, setRegisterUsername] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [loginUsername, setLoginUsername] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const register = () => {
    axios({
      method: "POST",
      data: {
        userName: registerUsername,
        password: registerPassword
      },
      withCredentials: true,
      url: "http://localhost:4000/api/user/signup"
    }).then((res) => console.log(res))
  };
  const login = () => {
    axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword
      },
      withCredentials: true,
      url: "http://localhost:4000/api/user/login"
    }).then((res) => console.log(res))
  };
  const getUser = () => {};

  return (
    <div className="App">
      <h3>welcome</h3>

      <div>
        <h2>Register</h2>
        <input
          placeholder="username"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button onClick={register}>Submit</button>
      </div>

      <div>
        <h2>Login</h2>
        <input
          placeholder="username"
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={login}>Submit</button>
      </div>
      <div>
        <h3>Get User</h3>
        <button onClick={getUser}>Submit</button>
      </div>

    </div>
  );
}

export default App;
