import { MouseEventHandler, useState } from "react";
import moonPhase from "../../assets/moon-phases-svgrepo-com.svg";
import sun from "../../assets/sun-svgrepo-com.svg";

enum Theme {
  Dark,
  Light,
}

function preferredTheme(): Theme {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    return Theme.Dark;
  } else {
    return Theme.Light;
  }
}

function changeTheme(theme: Theme) {
  if (theme === Theme.Dark) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }
}

export function ThemeSwitch() {
  const [theme, setTheme] = useState(preferredTheme());

  changeTheme(theme);

  const handleChangeTheme: MouseEventHandler<HTMLButtonElement> = () => {
    if (preferredTheme() === Theme.Dark) {
      changeTheme(Theme.Light);
      setTheme(Theme.Light);
    } else {
      changeTheme(Theme.Dark);
      setTheme(Theme.Dark);
    }
  };

  return (
    <button type="button" onClick={handleChangeTheme}>
      <img
        className={theme === Theme.Dark ? "w-3.5 h-3.5" : "w-5 h-5"}
        src={theme === Theme.Dark ? moonPhase : sun}
      />
    </button>
  );
}
