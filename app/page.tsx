import BestDeals from "@/app/bestDeals";
import HeaderWithEffect from "@/components/root/headerWithEffect";
import GDCLogo from "@/components/svg/GDCLogo";
import { HeroSection, MainPageWithSections } from "@/style/flexMain";

// due to current lack of support from TS for server component that is async
// it has to be casted as any to compile
const BestDealsAny = BestDeals as any;

//clerk
import { currentUser, UserButton } from "@clerk/nextjs/app-beta";

export default async function Home() {
  const user = await currentUser();
  return (
    <MainPageWithSections>
      <h2>{user?.id}</h2>
      <UserButton />
      <HeroSection>
        <HeaderWithEffect text="Games Done Cheap" />
        {/* <iframe src="https://embed.lottiefiles.com/animation/78811"></iframe> */}
        <GDCLogo />
        {/* <iframe src="https://embed.lottiefiles.com/animation/78335"></iframe> */}
      </HeroSection>
      <BestDealsAny />
    </MainPageWithSections>
  );
}
