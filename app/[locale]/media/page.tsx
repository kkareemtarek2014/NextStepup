import MediaPage from "../_components/mainpages/Mediapage";

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
export default async function Media({
  params,
}: {
  params: { locale: string };
}) {
  // const data = await fetchBlogList(params.locale);
  // // console.log(data);
  // const mediaPage = await fetchMediaPage(params.locale);
  return <MediaPage />;
}
