import { Link } from "react-router-dom";
import { MainLayout } from "../../components/layout/MainLayout";
import { MainNavBar } from "../../components/layout/NavBar";
import { Card } from "../../components/ui/Card";
import { Center } from "../../components/ui/Center";
import { Split } from "../../components/ui/Split";
import { H1 } from "../../components/ui/Text";

export function NewQuote() {
  return (
    <MainLayout>
      <MainNavBar />
      <Split
        lSplit={
          <Center>
            <Link to="car">
              <Card className=" ml-20 mr-10">
                <H1>Car Quote</H1>
                <hr />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis temporibus assumenda repellendus? Eveniet corporis
                  enim molestias consequatur accusamus praesentium placeat,
                  nobis, quam vel, dolor sed. Molestiae fugiat sunt harum nisi!
                  Iure quod
                </p>
              </Card>
            </Link>
          </Center>
        }
        rSplit={
          <Center>
            <Link to="home">
              <Card className=" ml-10 mr-20">
                <H1>Home Quote</H1>
                <hr />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis temporibus assumenda repellendus? Eveniet corporis
                  enim molestias consequatur accusamus praesentium placeat,
                  nobis, quam vel, dolor sed. Molestiae fugiat sunt harum nisi!
                  Iure quod
                </p>
              </Card>
            </Link>
          </Center>
        }
      />
    </MainLayout>
  );
}
