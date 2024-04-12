import { useState } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { HomeNavBar } from "../components/layout/NavBar";
import { Card } from "../components/ui/Card";
import { Center } from "../components/ui/Center";
import { Button } from "../components/ui/form/Button";
import {
  EmailInput,
  InputContainer,
  PasswordInput,
  TextInput,
} from "../components/ui/form/TextInput";
import type {
  SignUpErrors,
  SignUpRequest,
  SignUpResponse,
} from "../../../shared/types";
import { getURL, post, setValue } from "../lib/util";
import { NavigateFunction, useNavigate } from "react-router-dom";

export function SignUp() {
  return (
    <MainLayout>
      <HomeNavBar />
      <br />
      <Center>
        <Card className=" max-w-96 w-1/2 min-w-60 h-max flex flex-col">
          <h1 className=" text-2xl">Sign Up</h1>
          <hr />
          <SignUpForm />
        </Card>
      </Center>
    </MainLayout>
  );
}

async function signUp(
  inputs: SignUpRequest,
  errorSetter: React.Dispatch<React.SetStateAction<SignUpErrors>>,
  navigator: NavigateFunction
) {
  const responseData = await post(getURL("/auth/signup"), navigator, inputs);
  const response: SignUpResponse = await responseData.json();

  if (response.success === true) {
    console.log(inputs);
    navigator("/login")
  } else {
    errorSetter(response.errors);
  }
}

function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState<SignUpErrors>({} as SignUpErrors);

  const navigate = useNavigate();

  return (
    <form className=" flex flex-col justify-between h-full py-5 space-y-4">
      <InputContainer error={errors.firstName} label="First Name">
        <TextInput value={firstName} onChange={setValue(setFirstName)} />
      </InputContainer>
      <InputContainer error={errors.lastName} label="Last Name">
        <TextInput value={lastName} onChange={setValue(setLastName)} />
      </InputContainer>
      <InputContainer label="Phone Number">
        <TextInput value={phoneNumber} onChange={setValue(setPhoneNumber)} />
      </InputContainer>
      <InputContainer error={errors.email} label="Email">
        <EmailInput value={email} onChange={setValue(setEmail)} />
      </InputContainer>
      <InputContainer error={errors.email2} label="Confirm Email">
        <EmailInput value={email2} onChange={setValue(setEmail2)} />
      </InputContainer>
      <InputContainer error={errors.password} label="Password">
        <PasswordInput value={password} onChange={setValue(setPassword)} />
      </InputContainer>
      <InputContainer error={errors.password2} label="Confirm Password">
        <PasswordInput value={password2} onChange={setValue(setPassword2)} />
      </InputContainer>
      <br />
      <Button
        className=" ml-auto"
        onClick={() => {
          signUp(
            {
              firstName,
              lastName,
              phoneNumber,
              email,
              email2,
              password,
              password2,
            },
            setErrors,
            navigate
          );
        }}
      >
        Submit
      </Button>
    </form>
  );
}
