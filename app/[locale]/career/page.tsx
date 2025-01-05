import Careerpage from "../_components/mainpages/Careerpage";
import { fetchCareer } from "../api/general";
import { fetchJobs } from "../api/general";
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
export default async function Career({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params?.locale || "en";
  // const data = await FetchHomePage(locale);
  const data = await fetchCareer(locale);
  const jobs = await fetchJobs(locale);
  // console.log(data);
  return <Careerpage data={data} jobs={jobs} />;
}
