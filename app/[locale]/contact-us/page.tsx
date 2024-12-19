import Communitypage from "../_components/mainpages/Communitypage";
import ContactUsPage from "../_components/mainpages/ContactUsPage";
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
export default async function ContactUs() {
  // const data = await FetchHomePage(locale);
  return <ContactUsPage />;
}
