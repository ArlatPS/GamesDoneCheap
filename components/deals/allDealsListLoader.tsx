import { ListOfDealsSectionStyled } from "@/style/listOfDeals";
import { LoaderStyled } from "@/style/loaderStyled";

export default function AllDealsListLoader() {
  return (
    <ListOfDealsSectionStyled>
      <LoaderStyled src="https://embed.lottiefiles.com/animation/78811" />
    </ListOfDealsSectionStyled>
  );
}
