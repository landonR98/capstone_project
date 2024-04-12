import type { CarQuoteType, HomeQuoteType } from "../../../../shared/types";

export function CarDisplay({ quote }: { quote: CarQuoteType }) {
  const dob =
    typeof quote.dateOfBirth === "string"
      ? quote.dateOfBirth
      : quote.dateOfBirth.toLocaleString();

  const rDate =
    typeof quote.dateOfRequest === "string"
      ? quote.dateOfRequest
      : quote.dateOfRequest.toLocaleString();
  return (
    <div className=" grid grid-cols-2">
      <strong>ID: </strong>
      <p>{quote.id}</p>
      <strong>Accidents: </strong>
      <p>{quote.numberOfAccidents}</p>
      <strong>DOB: </strong>
      <p>{dob}</p>
      <strong>Primary Location: </strong>
      <p>{quote.primaryLocation}</p>
      <strong>Request Date: </strong>
      <p>{rDate}</p>
      <strong>Quote Amount: </strong>
      <p>{quote.amount}</p>
    </div>
  );
}

export function HomeDisplay({ quote }: { quote: HomeQuoteType }) {
  const age =
    typeof quote.homeAge === "string"
      ? quote.homeAge
      : quote.homeAge.toLocaleString();

  const rDate =
    typeof quote.dateOfRequest === "string"
      ? quote.dateOfRequest
      : quote.dateOfRequest.toLocaleString();
  return (
    <div className=" grid grid-cols-2">
      <strong>ID: </strong>
      <p>{quote.id}</p>
      <strong>Home Built: </strong>
      <p>{age}</p>
      <strong>Heating: </strong>
      <p>{quote.heatingType}</p>
      <strong>Request Date: </strong>
      <p>{rDate}</p>
      <strong>Quote Amount: </strong>
      <p>{quote.amount}</p>
    </div>
  );
}
