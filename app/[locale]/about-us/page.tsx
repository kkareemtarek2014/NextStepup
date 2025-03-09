import Aboutpage from "../_components/mainpages/Aboutpage";
export const runtime = "edge";

interface AboutPageProps {
  params: {
    locale: string;
  };
}

export default async function About({ params }: AboutPageProps) {
  return <Aboutpage />;
}
