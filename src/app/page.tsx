import HomeSlider from "../components/HomeSlider";
import Mission from "../components/Mission";
import Features from "..//components/Features";
import JoinUs from "../components/JoinUs";
export const runtime = 'edge';

import Partners from "../components/Partners";
export default function HomePage() {
  return (
    <main className="font-body overflow-x-hidden overflow-y-hidden">
      <HomeSlider />
      <Mission />
      <Features />
      <JoinUs />
      {/* <Partners /> 
      
      主页尾部合作伙伴logo展示，暂时隐藏
      */}
    </main>
  );
}
