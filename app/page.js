import Banner from "components/Generals/Banner";
import Loader from "components/Generals/Loader";
import HomeNews from "components/Home/HomeNews";
import HomeService from "components/Home/HomeService";
import HomeTeam from "components/Home/HomeTeam";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Banner />
        <HomeService />
        <HomeTeam />
        <HomeNews />
      </Suspense>
    </>
  );
}
