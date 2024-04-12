import { Card } from "../components/ui/Card";

import { MainLayout } from "../components/layout/MainLayout";
import homeAndCar from "../assets/home_and_car.webp";
import { HomeNavBar } from "../components/layout/NavBar";

export function Home() {
  return (
    <MainLayout>
      <HomeNavBar />
      <div className="grid pb-10 pt-10 md:grid-cols-2 sm:grid-cols-1">
        <div className="flex flex-col h-full justify-center items-center py-6">
          <div className="w-fit">
            <h1 className=" text-5xl lg:text-6xl md:text-5xl sm:text-6xl">
              Get affordable <br /> insurance{" "}
              <span className=" italic underline">fast</span>
            </h1>
            <h6 className=" text-xs">Sign up and get a Quote in Minutes</h6>
            <button>Get Started</button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <img
            className=" w-3/4 sm:max-h-full sm:max-w-full"
            src={homeAndCar}
            alt="home and car"
          />
        </div>
      </div>
      <Card>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          accusamus suscipit illum tempore nesciunt cupiditate sunt voluptates
          nam qui dolor nostrum facere vero sapiente rem eos id, reiciendis
          aspernatur expedita.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          temporibus error odio possimus voluptate repellat sapiente iusto sunt,
          iste fugiat eligendi, tenetur omnis voluptatum cumque voluptatibus
          distinctio mollitia. Quam, quod?
        </p>
      </Card>
    </MainLayout>
  );
}
