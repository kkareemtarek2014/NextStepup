import SingleMedia from "../../_components/singlepages/SingleMedia";
export const runtime = "edge";

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
//   };
// }
export default async function SingleMediapage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  // const data = await fetchSingleBlog(params.locale, params.slug);
  return <SingleMedia />;
}
