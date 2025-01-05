"use client";

interface CountItem {
  id: number;
  Title: string;
  SubTitle: string;
}

interface ProjectCountData {
  TitleCurrent: string;
  TitleUpcomming: string;
  CountSection: CountItem[];
  CountSection2: CountItem[];
}

export default function StatSection({ data }: { data: ProjectCountData }) {
  return (
    <section className="relative h-fit bg-borderColor">
      <div className="flex relative py-[40px] lg:py-[80px] max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row w-full mx-4 lg:mx-0 gap-[40px] lg:gap-0">
          {/* Current Projects Section */}
          <div className="border-t border-primary w-full lg:w-[48.5%]">
            <div className="flex flex-col pt-[20px] lg:p-[40px] gap-6">
              <h3 className="text-sm font-medium text-black tracking-wider uppercase">
                {data.TitleCurrent}
              </h3>
              <div className="flex justify-between items-center gap-[10px]">
                {data.CountSection.map((item) => (
                  <div key={item.id} className="flex flex-col w-[33%]">
                    <h2 className="text-[40px] leading-[50px] lg:text-[60px] lg:leading-[75px] font-medium text-black">
                      {item.Title}
                    </h2>
                    <h3 className="text-base font-normal lg:font-semimedium text-black leading-[22.4px]">
                      {item.SubTitle}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-[1px] bg-primary h-[80%] hidden lg:block self-center mx-[20px]"></div>

          {/* Upcoming Projects Section */}
          <div className="border-t border-primary w-full lg:w-[48.5%]">
            <div className="flex flex-col pt-[20px] lg:p-[40px] gap-6">
              <h3 className="text-sm font-medium text-black tracking-wider uppercase">
                {data.TitleUpcomming}
              </h3>
              <div className="flex justify-between items-center">
                {data.CountSection2.map((item) => (
                  <div key={item.id} className="flex flex-col w-[33%]">
                    <h2 className="text-[40px] leading-[50px] lg:text-[60px] lg:leading-[75px] font-medium text-black">
                      {item.Title}
                    </h2>
                    <h3 className="text-base font-normal lg:font-semimedium text-black leading-[22.4px]">
                      {item.SubTitle}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
