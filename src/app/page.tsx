import Image from "next/image";
import Header from "@/components/Header"
import DailyPick from "@/components/DailyPick";
import Ladieslove from "@/components/Ladies";
import Men from "@/components/Men";

export default function Home() {
  return (
    <main className="">
      <Header />
      <DailyPick />
      <Ladieslove />
      <Men />
    </main>
  );
}
