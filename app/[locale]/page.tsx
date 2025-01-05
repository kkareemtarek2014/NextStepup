import Homepage from "./_components/mainpages/Homepage";
import { fetchHomepage } from "./api/general";
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
export default async function Home({ params }: { params: { locale: string } }) {
  const data = await fetchHomepage(params.locale);
  return <Homepage locale={params.locale} data={data} />;
}
