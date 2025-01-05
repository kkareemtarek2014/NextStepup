import Communitypage from "../_components/mainpages/Communitypage";
import { CummunityList, fetchCommunityPage } from "../api/general";

interface CommunityPageProps {
  params: {
    locale: string;
  };
}

export default async function Community({ params }: CommunityPageProps) {
  const locale = params?.locale || "en";
  const { data } = await CummunityList(locale);
  const { data: communityPageData } = await fetchCommunityPage(locale);
  // console.log("data", JSON.stringify(data, null, 2));
  return (
    <Communitypage communityData={data} communityPageData={communityPageData} />
  );
}
