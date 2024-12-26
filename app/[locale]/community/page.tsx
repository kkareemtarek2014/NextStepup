import Communitypage from "../_components/mainpages/Communitypage";
import { CummunityList } from "../api/general";

interface CommunityPageProps {
  params: {
    locale: string;
  };
}

export default async function Community({ params }: CommunityPageProps) {
  const locale = params?.locale || "en";
  const { data } = await CummunityList(locale);
  // console.log("data", JSON.stringify(data, null, 2));
  return <Communitypage communityData={data} />;
}
