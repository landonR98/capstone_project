import { Quote } from "./Quote";

export class User {
  email: string;
  firstName: string;
  lastName: string;
  number: string;
  isAdmin: boolean;
  quotes: Array<Quote>;

  constructor(
    email: string,
    firstName: string,
    lastName: string,
    number: string,
    isAdmin: boolean,
    quotes: undefined | Array<Quote>
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.number = number;
    this.isAdmin = isAdmin;
    this.quotes = quotes ? quotes : [];
  }
}
