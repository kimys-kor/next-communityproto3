import { TabACommunityClient } from "./TabCommunityClient";
import { fetchInitialCommunityData } from "@/app/utils";

const TabACommunityPage = async () => {
  const initialData = await fetchInitialCommunityData();
  return <TabACommunityClient initialTab={0} initialData={initialData} />;
};

export default TabACommunityPage;
