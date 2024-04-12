import { moneyRegEx } from "../lib/regex";
import { Location } from "../lib/location";
import { HeatingType } from "../../../shared/types";

export abstract class Quote {
  id: number;
  dateOfRequest: Date;
  amount: number;

  constructor(id: number, dateOfRequest: string, amount: string) {
    this.id = id;
    this.dateOfRequest = new Date(dateOfRequest);
    if (moneyRegEx.test(amount)) {
      this.amount = Number(amount);
    } else {
      throw new Error("bad amount format");
    }
  }
}

export class CarQuote extends Quote {
  dateOfBirth: Date;
  primaryLocation: Location;
  numberOfAccidents: number;

  constructor(
    id: number,
    dateOfRequest: string,
    amount: string,
    dateOfBirth: string,
    primaryLocation: Location,
    numberOfAccidents: number
  ) {
    super(id, dateOfRequest, amount);
    this.dateOfBirth = new Date(dateOfBirth);
    this.primaryLocation = primaryLocation;
    this.numberOfAccidents = numberOfAccidents;
  }
}

export class HomeQuote extends Quote {
  homeAge: number;
  heatingType: HeatingType;

  constructor(
    id: number,
    dateOfRequest: string,
    amount: string,
    homeAge: number,
    heatingType: HeatingType
  ) {
    super(id, dateOfRequest, amount);
    this.homeAge = homeAge;
    this.heatingType = heatingType;
  }
}
