import AngleDownSVG from "@/components/svg/angleDown";
import ErrorSVG from "@/components/svg/error";
import GDCLogo from "@/components/svg/GDCLogo";
import { DetailsMainStyled } from "@/style/details/detailsMainStyled";

export default function DetailsPage() {
  return (
    <DetailsMainStyled>
      <h1>Details</h1>
      <h4>
        Website to check out best video game deals and compare prices on
        different platforms (created with Next JS 13)
      </h4>
      <h4>Credit</h4>
      <h5>
        <GDCLogo />
        Created by Becris - the Noun Project https://thenounproject.com/Becris/
      </h5>
      <h5>
        <AngleDownSVG />
        Created by Alfonso Juan Dillera - the Noun Project
        https://thenounproject.com/ajdillera/
      </h5>
      <h5>
        <ErrorSVG />
        Created by Vectors Point - the Noun Project
        https://thenounproject.com/vectorspoint/
      </h5>
    </DetailsMainStyled>
  );
}
