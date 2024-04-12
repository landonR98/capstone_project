import { MainLayout } from "../components/layout/MainLayout";
import { MainNavBar } from "../components/layout/NavBar";
import { Card } from "../components/ui/Card";
import { Center } from "../components/ui/Center";
import { ContactDisplay } from "../components/ui/ContactDisplay";
import { H1 } from "../components/ui/Text";

export function Contact() {
  return (
    <MainLayout>
      <MainNavBar />
      <Center className="" style={{ minHeight: "calc(100vh - 80px)" }}>
        <Card className=" p-3">
          <H1>Contact Us</H1>
          <hr />
          <ContactDisplay />
        </Card>
      </Center>
    </MainLayout>
  );
}
