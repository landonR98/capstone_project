import { useState } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { HomeNavBar } from "../components/layout/NavBar";
import { Card } from "../components/ui/Card";
import { Center } from "../components/ui/Center";
import {
  EmailInput,
  InputContainer,
  PasswordInput,
} from "../components/ui/form/TextInput";
import { Button } from "../components/ui/form/Button";
import { LoginRequest, LoginResponse } from "../../../shared/types";
import { getURL, post, setValue } from "../lib/util";
import { NavigateFunction, useNavigate } from "react-router-dom";

export function Login() {
  return (
    <MainLayout>
      <HomeNavBar />
      <br />
      <Center>
        <Card className=" max-w-96 w-1/2 min-w-60 h-80 flex flex-col">
          <h1 className=" text-2xl">Login</h1>
          <hr />
          <LoginForm />
        </Card>
      </Center>
    </MainLayout>
  );
}

async function login(
  inputs: LoginRequest,
  errorSetter: React.Dispatch<React.SetStateAction<string>>,
  navigator: NavigateFunction
) {
  const url = getURL("/auth/login");

  try {
    const responseData = await post(url, navigator, inputs);
    const response: LoginResponse = await responseData.json();

    console.log(response);

    if (response.success === true) {
      localStorage.setItem("session", JSON.stringify(response.session));
      localStorage.setItem("token", response.token);

      navigator("/quotes");
    } else {
      errorSetter(response.error);
    }
  } catch (e) {
    console.log(e);
  }
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");

  const navigator = useNavigate();

  return (
    <form className=" flex flex-col justify-between h-full py-5">
      <InputContainer label="Email">
        <EmailInput value={email} onChange={setValue(setEmail)} />
      </InputContainer>
      <InputContainer error={error} label="Password">
        <PasswordInput value={password} onChange={setValue(setPassword)} />
      </InputContainer>

      <Button
        className=" ml-auto"
        onClick={() => login({ email, password }, setError, navigator)}
      >
        Submit
      </Button>
    </form>
  );
}
