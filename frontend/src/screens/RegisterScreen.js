import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");

  const redirect = props.location.search
  ? props.location.search.split('=')[1]
  : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmpassword) {
      alert('Password and confrim password are not match')
    }
    dispatch(register(name, email,password))
  };

  useEffect(() => {
    if(userInfo) {
      props.history.push(redirect);
    }
  },[props.history, redirect, userInfo]);
  return (
    <form className="form" onSubmit={submitHandler}>
      <div>
        <h1>Create Account</h1>
      </div>
      {loading && <LoadingBox></LoadingBox>}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter name"
          required
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          required
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          required
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Enter confirm password"
          required
          onChange={(e) => setconfirmPassword(e.target.value)}
        ></input>
      </div>
      <div>
        <label />
        <button className="primary" type="submit">
          Register
        </button>
      </div>
      <div>
        <label />
        <div>
          Already have an accoung? <a href={`/signin?redirect=${redirect}`}>Sign In</a>
        </div>
      </div>
    </form>
  );
}
