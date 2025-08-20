import HomeSlider from "../components/HomeSlider";
import Mission from "../components/Mission";
import Features from "..//components/Features";
import JoinUs from "../components/JoinUs";
import Partners from "../components/Partners";
export default function HomePage() {
  return (
    <main className="font-body overflow-x-hidden overflow-y-hidden">
      <HomeSlider />
      <Mission />
      <Features />
      <JoinUs />
      <Partners />
    </main>
  );
}
