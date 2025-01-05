"use client";

interface ValueItem {
  id: number;
  Title: string;
  Description: string;
}

interface ValueSectionData {
  id: number;
  Title: string;
  ValueRepeater: ValueItem[];
}

export default function ValusSection({ valuesData }: { valuesData: any }) {
  return (
    <section className="relative h-fit lg:min-h-[330px] bg-teamColor py-[60px]">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-[40px] lg:gap-[48px] px-4 2xl:px-0">
        <h3 className="text-[40px] leading-[50px] font-medium text-black">
          {valuesData.Title}
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[2.29%] max-w-[1400px] w-full gap-y-[40px]">
          {valuesData.ValueRepeater.map((value: any) => (
            <div key={value.id} className="flex flex-col gap-[24px]">
              <h4 className="text-[28px] leading-[35px] font-medium text-black">
                {value.Title}
              </h4>
              <p className="text-base leading-[24px] font-normal lg:font-semimedium text-black text-pretty lg:text-balance">
                {value.Description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
