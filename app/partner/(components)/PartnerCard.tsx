import PartnerCardClient from "./PartnerCardClient";
import { fetchInitialPartnerData } from "@/app/utils";

const PartnerCard = async () => {
  const initialData = await fetchInitialPartnerData();

  return (
    <section className="flex flex-col gap-1">
      <PartnerCardClient initialData={initialData} />
    </section>
  );
};

export default PartnerCard;
