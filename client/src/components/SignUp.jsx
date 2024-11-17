import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignUp } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
`;

const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

const SignUp = () => {
  const dispatch = useDispatch();

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    console.log("Validating inputs");
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("SignUp triggered");
    setButtonDisabled(true);
    console.log("Button disabled");

    if (validateInputs()) {
        console.log("Inputs validated");
        try {
            console.log("Making API call...");
            const res = await UserSignUp({ name, email, password });
            console.log("API call success", res.data);
            console.log("Dispatching login success...");
            dispatch(loginSuccess(res.data));
            console.log("Dispatch success");
            toast.success("Account Created Successfully");
        } catch (err) {
            console.error("API call error", err);
            const message = err.response?.data?.message || "An error occurred";
            toast.error(message);
        } finally {
            console.log("Reset button state");
            setButtonDisabled(false);
        }
    } else {
        console.log("Input validation failed");
        setButtonDisabled(false);
    }
};


  return (
    <Container>
      <div>
        <Title>Create New Account 👋</Title>
        <Span>Please enter details to create a new account</Span>
      </div>
      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          handleChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          password
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
        />
        <Button
          text={buttonDisabled ? "Signing Up..." : "Sign Up"}
          onClick={handleSignUp}
          isDisabled={buttonDisabled}
        />
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </Container>
  );
};

export default SignUp;
