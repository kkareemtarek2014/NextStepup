import SingleCommunity from "../../_components/singlepages/SingleCommunity";
import { CummunityList, getCommunityBySlug } from "../../api/general";
import { notFound } from "next/navigation";
export const runtime = "edge";

interface SingleCommunityPageProps {
  params: {
    locale: string;
    slug: string;
  };
}
// export async function generateMetadata({ params }: any) {
//   const locale = params?.locale || "en";

//   const data = await FetchHomePage(locale);
//   const seo = data?.data?.attributes?.Seo;
//   const pageTitle = seo?.metaTitle;
//   const pageDescription = seo?.metaDescription;
//   const pageKeywords = seo?.keywords;

//   return {
//     title: `${pageTitle}`,
//     description: pageDescription ?? "",
//     keywords: pageKeywords ?? "",
//
export default async function CommunityPage({
  params,
}: SingleCommunityPageProps) {
  const { locale, slug } = params;

  try {
    const communityData = await getCommunityBySlug(locale, slug);
    // console.log("Community Data:", communityData);
    return <SingleCommunity communityData={communityData} />;
  } catch (error) {
    notFound();
  }
}

// Optionally, add generateStaticParams if you want to pre-render specific paths
// export async function generateStaticParams() {
//   const { data: communities } = await CummunityList("en");

//   return communities.map((community: { slug: any }) => ({
//     slug: community.slug,
//   }));
// }
