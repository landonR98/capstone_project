import { CarQuote, HomeQuote } from "../classes/quote";
import { User } from "../classes/user";

export abstract class CarQuoteDAO {
  getAllQuotes(): Promise<Array<CarQuote>>;
  addQuote(quote: CarQuote): Promise<void>;
}

export abstract class HomeQuoteDAO {
  getAllQuotes(): Promise<Array<HomeQuote>>;
  addQuote(quote: HomeQuote): Promise<void>;
}

export abstract class UserDAO {
  getUserByEmail(email: string): Promise<User>;
  addUser(user: User): Promise<void>;
}
