import type { CarQuoteType, HomeQuoteType } from "../../../shared/types";
import { MainLayout } from "../components/layout/MainLayout";
import { MainNavBar } from "../components/layout/NavBar";
import { Card } from "../components/ui/Card";
import { Center } from "../components/ui/Center";
import { CarDisplay, HomeDisplay } from "../components/ui/QuoteDisplay";
import { Split } from "../components/ui/Split";
import { H1 } from "../components/ui/Text";
import { TextLink } from "../components/ui/TextLink";
import { useQuotes } from "../hooks/quotes";

export function Quotes() {
  const [quotes, loading] = useQuotes();
  return (
    <MainLayout>
      <MainNavBar />
      {loading ? (
        "loading..."
      ) : (
        <Center>
          <Split
            lSplit={<CarQuotes quotes={quotes.carQuotes} />}
            rSplit={<HomeQuotes quotes={quotes.homeQuotes} />}
          />
        </Center>
      )}
    </MainLayout>
  );
}

function CarQuotes({ quotes }: Readonly<{ quotes: CarQuoteType[] }>) {
  return (
    <>
      {quotes.length !== 0 ? (
        <div>
          <Card>
            <H1>Car Quotes</H1>
          </Card>
          {quotes.map((quote) => {
            return (
              <div key={`car_${quote.id}`}>
                <Card>
                  <CarDisplay quote={quote} />
                </Card>
              </div>
            );
          })}
        </div>
      ) : (
        <Card>
          <H1>
            Get your first{" "}
            <TextLink to={"/quotes/new/car"}>Home Quote</TextLink>
          </H1>
        </Card>
      )}
    </>
  );
}

function HomeQuotes({ quotes }: Readonly<{ quotes: HomeQuoteType[] }>) {
  return (
    <>
      {quotes.length !== 0 ? (
        <div>
          <Card>
            <H1>Home Quotes</H1>
          </Card>
          {quotes.map((quote) => {
            return (
              <div key={`home_${quote.id}`}>
                <Card>
                  <HomeDisplay quote={quote} />
                </Card>
              </div>
            );
          })}
        </div>
      ) : (
        <Card>
          <H1>
            Get your first{" "}
            <TextLink to={"/quotes/new/home"}>Home Quote</TextLink>
          </H1>
        </Card>
      )}
    </>
  );
}
