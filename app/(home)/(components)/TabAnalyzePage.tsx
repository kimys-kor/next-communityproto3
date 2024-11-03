import { TabAnalyzeClient } from "./TabAnalyzeClient";
import { fetchInitialAnalyzeData } from "@/app/utils";

const TabAnalyzePage = async () => {
  const initialTab = 0;
  const typMap = [2, 3, 4, 5];
  const initialData = await fetchInitialAnalyzeData(typMap[initialTab]);

  return <TabAnalyzeClient initialTab={initialTab} initialData={initialData} />;
};

export default TabAnalyzePage;
