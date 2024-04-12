import { useState } from "react";
import { MainLayout } from "../../components/layout/MainLayout";
import { MainNavBar } from "../../components/layout/NavBar";
import { Card } from "../../components/ui/Card";
import { Center } from "../../components/ui/Center";
import { DateInput } from "../../components/ui/form/Date";
import {
  InputContainer,
  NumberInput,
} from "../../components/ui/form/TextInput";
import { getURL, post, setValue } from "../../lib/util";
import { H1 } from "../../components/ui/Text";
import type {
  CarQuoteType,
  LocationType,
  NewCarQuoteErrors,
  NewCarQuoteRequest,
  NewCarQuoteResponse,
} from "../../../../shared/types";
import { Option, Select } from "../../components/ui/form/Select";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/form/Button";
import { ContactDisplay } from "../../components/ui/ContactDisplay";
import { CarDisplay } from "../../components/ui/QuoteDisplay";

async function newQuote(
  inputs: NewCarQuoteRequest,
  errorSetter: React.Dispatch<React.SetStateAction<NewCarQuoteErrors>>,
  quoteSetter: React.Dispatch<React.SetStateAction<CarQuoteType | null>>,
  navigator: NavigateFunction
) {
  const responseData = await post(getURL("/quote/car"), navigator, inputs);
  const response: NewCarQuoteResponse = await responseData.json();

  console.log(response);

  if (response.success === true) {
    console.log(inputs);
    console.log(response);
    quoteSetter(response.quote);
  } else {
    errorSetter(response.errors);
  }
}

export function NewCarQuote() {
  const [quote, setQuote] = useState<CarQuoteType | null>(null);

  return (
    <MainLayout>
      <MainNavBar />
      <Center>
        <Card>
          {quote === null ? (
            <NewCarQuoteForm quoteSetter={setQuote} />
          ) : (
            <QuoteAndContactInfo quote={quote} />
          )}
        </Card>
      </Center>
    </MainLayout>
  );
}

function NewCarQuoteForm({
  quoteSetter,
}: {
  quoteSetter: React.Dispatch<React.SetStateAction<CarQuoteType | null>>;
}) {
  const [dob, setDob] = useState("2000-01-01");
  const [location, setLocation] = useState<LocationType>("Urban");
  const [accidents, setAccidents] = useState("0");
  const [errors, setErrors] = useState<NewCarQuoteErrors>(
    {} as NewCarQuoteErrors
  );
  const navigate = useNavigate();
  return (
    <>
      <H1>New Car Insurance</H1>
      <hr />
      <InputContainer label="Date of Birth" error={errors.date_of_birth}>
        <DateInput value={dob} onChange={setValue(setDob)} />
      </InputContainer>
      <InputContainer label="Primary Location" error={errors.primary_location}>
        <Select<LocationType>
          value={location}
          onChange={(event) => {
            setLocation(event.target.value as LocationType);
          }}
        >
          <Option<LocationType> value={"Dense Urban"}>Dense_Urban</Option>
          <Option<LocationType> value={"Urban"}>Urban</Option>
          <Option<LocationType> value={"Rural"}>Rural</Option>
        </Select>
      </InputContainer>
      <InputContainer
        label="Number of Accidents"
        error={errors.number_of_accidents}
      >
        <NumberInput
          value={accidents}
          onChange={({ target }) => {
            setAccidents(target.value);
          }}
        />
      </InputContainer>
      <Button
        onClick={() =>
          newQuote(
            {
              date_of_birth: dob,
              primary_location: location,
              number_of_accidents: Number(accidents),
            },
            setErrors,
            quoteSetter,
            navigate
          )
        }
      >
        Submit
      </Button>
    </>
  );
}

function QuoteAndContactInfo({ quote }: { quote: CarQuoteType }) {
  return (
    <>
      <H1>Quote:</H1>
      <hr />
      <CarDisplay quote={quote} />
      <hr />
      <br />
      <H1>Contact Us:</H1>
      <hr />
      <ContactDisplay />
    </>
  );
}
