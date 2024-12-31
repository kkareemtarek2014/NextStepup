import Aboutpage from "../_components/mainpages/Aboutpage";
import { fetchAbout } from "../api/general";
export const runtime = "edge";

interface AboutPageProps {
  params: {
    locale: string;
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
//   };
// }
export default async function About({ params }: AboutPageProps) {
  // const data = await FetchHomePage(locale);
  const data = await fetchAbout(params.locale);
  return <Aboutpage aboutData={data} />;
}
