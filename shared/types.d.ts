type Undefinable<T> = { [K in keyof T]: T[K] | undefined };

export type UserSession = {
  token: string;
  user_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  is_admin: boolean;
  age: number;
};

export type HeatingType = "Electric" | "Oil" | "Wood" | "Gas" | "Other";

export type NewHomeQuoteRequest = {
  home_age: string;
  heating_type: HeatingType;
};

export type NewHomeQuoteErrors = Undefinable<{
  home_age: string;
  heating_type: string;
}>;

export type NewHomeQuoteResponse =
  | {
      success: true;
      quote: HomeQuoteType;
    }
  | {
      success: false;
      errors: NewHomeQuoteErrors;
    };

export type LocationType = "Dense Urban" | "Urban" | "Rural";

export type NewCarQuoteRequest = {
  date_of_birth: string;
  primary_location: LocationType;
  number_of_accidents: number;
};

export type NewCarQuoteErrors = Undefinable<{
  date_of_birth: string;
  primary_location: string;
  number_of_accidents: string;
}>;

export type NewCarQuoteResponse =
  | {
      success: true;
      quote: CarQuoteType;
    }
  | {
      success: false;
      errors: NewCarQuoteErrors;
    };

export type SignUpRequest = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  email2: string;
  password: string;
  password2: string;
};

export type SignUpErrors = Undefinable<SignUpRequest>;

export type SignUpResponse = {
  errors: SignUpErrors;
  success: boolean;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse =
  | {
      error: string;
      success: false;
    }
  | {
      success: true;
      session: UserSession;
      token;
    };

type QuoteType = {
  id: number;
  dateOfRequest: string | Date;
  amount: number;
};

export type HomeQuoteType = {
  homeAge: string | Date;
  heatingType: HeatingType;
} & QuoteType;

export type CarQuoteType = {
  dateOfBirth: string | Date;
  primaryLocation: LocationType;
  numberOfAccidents: number;
} & QuoteType;

export type AllQuotesResponse = {
  carQuotes: CarQuoteResponse[];
  homeQuotes: HomeQuoteResponse[];
};
