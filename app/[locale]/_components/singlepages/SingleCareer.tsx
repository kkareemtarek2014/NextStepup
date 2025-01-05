import GetintouchSection from "../UI/General/GetintouchSection";
import CareerDescription from "../UI/SingleCareer/CareerDescription";
import CareerTitle from "../UI/SingleCareer/CareerTitle";

export const runtime = "edge";

export default function SingleCareer({ data }: { data: any }) {
  // console.log(data);
  return (
    <section className="relative h-fit bg-white">
      <div className="max-w-[1232px] mx-auto pt-[84px] pb-[160px] lg:pt-[160px] lg:pb-[100px] flex flex-col gap-[40px]  lg:gap-[64px] px-4 2xl:px-0 ">
        <CareerTitle data={data} />
        <CareerDescription data={data} />
      </div>{" "}
      <GetintouchSection />
    </section>
  );
}
