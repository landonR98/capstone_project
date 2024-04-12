import { useState } from "react";
import { MainLayout } from "../../components/layout/MainLayout";
import { MainNavBar } from "../../components/layout/NavBar";
import { Card } from "../../components/ui/Card";
import { Center } from "../../components/ui/Center";
import { DateInput } from "../../components/ui/form/Date";
import { InputContainer } from "../../components/ui/form/TextInput";
import { getURL, post, setValue } from "../../lib/util";
import { H1 } from "../../components/ui/Text";
import type {
  HeatingType,
  HomeQuoteType,
  NewHomeQuoteErrors,
  NewHomeQuoteRequest,
  NewHomeQuoteResponse,
} from "../../../../shared/types";
import { Option, Select } from "../../components/ui/form/Select";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/form/Button";
import { HomeDisplay } from "../../components/ui/QuoteDisplay";
import { ContactDisplay } from "../../components/ui/ContactDisplay";

async function newQuote(
  inputs: NewHomeQuoteRequest,
  errorSetter: React.Dispatch<React.SetStateAction<NewHomeQuoteErrors>>,
  quoteSetter: React.Dispatch<React.SetStateAction<HomeQuoteType | null>>,
  navigator: NavigateFunction
) {
  const responseData = await post(getURL("/quote/home"), navigator, inputs);
  const response: NewHomeQuoteResponse = await responseData.json();

  if (response.success === true) {
    console.log(inputs);
    quoteSetter(response.quote);
  } else {
    errorSetter(response.errors);
  }
}

export function NewHomeQuote() {
  const [quote, setQuote] = useState<HomeQuoteType | null>(null);
  return (
    <MainLayout>
      <MainNavBar />
      <Center>
        <Card className=" min-h-32">
          {quote === null ? (
            <NewHomeQuoteForm quoteSetter={setQuote} />
          ) : (
            <QuoteAndContactInfo quote={quote} />
          )}
        </Card>
      </Center>
    </MainLayout>
  );
}

function NewHomeQuoteForm({
  quoteSetter,
}: {
  quoteSetter: React.Dispatch<React.SetStateAction<HomeQuoteType | null>>;
}) {
  const [homeAge, setHomeAge] = useState("2000-01-01");
  const [heatingType, setHeatingType] = useState("Oil" as HeatingType);
  const [errors, setErrors] = useState({} as NewHomeQuoteErrors);
  const navigate = useNavigate();
  return (
    <>
      <H1>New Home Insurance</H1>
      <hr />
      <InputContainer label="Home construction date" error={errors.home_age}>
        <DateInput value={homeAge} onChange={setValue(setHomeAge)} />
      </InputContainer>
      <InputContainer label="Heating Type" error={errors.heating_type}>
        <Select<HeatingType>
          value={heatingType}
          onChange={(event) => {
            setHeatingType(event.target.value as HeatingType);
          }}
        >
          <Option<HeatingType> value={"Electric"}>Electric</Option>
          <Option<HeatingType> value={"Oil"}>Oil</Option>
          <Option<HeatingType> value={"Wood"}>Wood</Option>
          <Option<HeatingType> value={"Gas"}>Gas</Option>
          <Option<HeatingType> value={"Other"}>Other</Option>
        </Select>
      </InputContainer>
      <Button
        onClick={() =>
          newQuote(
            { home_age: homeAge, heating_type: heatingType },
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

function QuoteAndContactInfo({ quote }: { quote: HomeQuoteType }) {
  return (
    <>
      <H1>Quote:</H1>
      <hr />
      <HomeDisplay quote={quote} />
      <hr />
      <br />
      <H1>Contact Us:</H1>
      <hr />
      <ContactDisplay />
    </>
  );
}
