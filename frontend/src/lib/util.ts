import { NavigateFunction } from "react-router-dom";

export function getURL(endPoint: string) {
  return new URL(
    `${
      import.meta.env.DEV
        ? "http://localhost:3000"
        : window.location.protocol + window.location.host
    }/api${endPoint}`
  );
}

function getToken() {
  const sessionStr = localStorage.getItem("token");
  if (sessionStr === undefined || sessionStr === null) {
    return "";
  } else {
    return sessionStr;
  }
}

function getHeaders() {
  const headers: { "Content-Type": string; authorization?: string } = {
    "Content-Type": "application/json",
  };
  const token = getToken();
  console.log("token", token);
  if (token !== "") {
    headers.authorization = token;
  }
  return headers;
}

export async function get(url: URL, navigate: NavigateFunction) {
  const response = await fetch(url, {
    headers: getHeaders(),
  }).catch((err) => {
    console.error(err);
    console.error(`URL: ${url}`);
    return null;
  });
  if (response === null || response?.status === 401) {
    console.log(response);
    navigate("/log-in");
  }

  console.log(response?.status);
  return response!;
}

export async function post(url: URL, navigate: NavigateFunction, body: object) {
  console.log(body, url);
  console.log("URL", url);
  const response = await fetch(url, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(body),
  }).catch((err) => {
    console.error("post error", err);
    console.error(`URL: ${url}
    Body: ${body}`);
    return null;
  });
  console.log("post response", response);
  if (response === null || response?.status === 401) {
    console.log("post response null");
    navigate("/log-in");
  }
  console.log(response?.status);
  return response!;
}

export function setValue(setter: React.Dispatch<React.SetStateAction<string>>) {
  return ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    setter(value);
}
