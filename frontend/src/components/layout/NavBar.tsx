import { PropsWithChildren } from "react";
import { TextLink } from "../ui/TextLink";
import { ThemeSwitch } from "../ui/ThemeSwitch";
import { Link } from "react-router-dom";
import { Button } from "../ui/form/Button";

type NavBarProps = PropsWithChildren;
export function NavBar({ children }: NavBarProps) {
  return (
    <header className="flex justify-between bg-white dark:bg-slate-700 p-1">
      <h1>Milly Insurance</h1>
      <div className="flex mx-2">
        <nav className="flex space-x-2 mx-2">{children}</nav>
        <ThemeSwitch />
      </div>
    </header>
  );
}

type navBtnProps = PropsWithChildren & { to: string };
function NavBtn({ to, children }: navBtnProps) {
  return (
    <Link to={to}>
      <Button>{children}</Button>
    </Link>
  );
}

export function MainNavBar() {
  return (
    <NavBar>
      <NavBtn to="/quotes">Quotes</NavBtn>
      <NavBtn to="/quotes/new">New Quote</NavBtn>
      <NavBtn to="/contact">Contact</NavBtn>
    </NavBar>
  );
}

export function HomeNavBar() {
  return (
    <NavBar>
      <TextLink to="/log-in">Log In</TextLink>
      <TextLink to="/sign-up">Sign Up</TextLink>
    </NavBar>
  );
}
