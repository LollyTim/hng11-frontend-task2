import Image from "next/image";
import Header from "@/components/Header"
import DailyPick from "@/components/DailyPick";
import Ladieslove from "@/components/Ladies";
import Men from "@/components/Men";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="">
      <Header />
      <DailyPick />
      <Ladieslove />
      <Men />
      <Footer />
    </main>
  );
}
