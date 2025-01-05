"use client";

import { Link } from "@/navigation";
import ArrowIcon from "../../Icons/ArrowIcon";

interface JobPosition {
  Title: string;
  CareerType: string;
  PositionType: string;
  slug: string;
}

interface JobCardProps {
  job: JobPosition;
  onClick: () => void;
}

const JobCard = ({ job, onClick }: JobCardProps) => (
  <Link href={`/career/${job.slug}`} className="block">
    <div className="flex md:flex-row flex-wrap md:flex-nowrap w-full 2xl:w-fit items-center justify-between md:px-6 py-6 md:py-10 border-b border-borderColor cursor-pointer md:w-full hover:bg-gray-50 transition-colors gap-y-2 md:gap-x-8">
      <div className="flex flex-col-reverse md:hidden w-full gap-y-2">
        <h3 className="text-xl md:text-[28px] leading-tight md:leading-[35px] font-medium text-black w-full">
          {job.Title}
        </h3>
        <div className="flex gap-x-4">
          <h5 className="text-sm md:text-base leading-normal md:leading-[24px] font-normal lg:font-semimedium text-black text-nowrap w-fit">
            {job.CareerType}
          </h5>
          <h6 className="text-sm md:text-base leading-normal md:leading-[24px] font-normal lg:font-semimedium text-black w-full">
            {job.PositionType}
          </h6>
        </div>
      </div>

      <h3 className="hidden md:block text-xl md:text-[28px] leading-tight md:leading-[35px] font-medium text-black 2xl:min-w-[428px] w-full">
        {job.Title}
      </h3>
      <h5 className="hidden md:block text-sm md:text-base leading-normal md:leading-[24px] font-normal lg:font-semimedium text-black 2xl:min-w-[428px] w-full">
        {job.CareerType}
      </h5>
      <h6 className="hidden md:block text-sm md:text-base leading-normal md:leading-[24px] font-normal lg:font-semimedium text-black 2xl:min-w-[428px] w-full">
        {job.PositionType}
      </h6>

      <div className="flex justify-end w-[36px] absolute md:relative right-4">
        <ArrowIcon className="rotate-180 text-black w-9 h-9 md:w-[36px] md:h-[36px] p-[4.5px_5.25px_4.5px_3.75px] transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  </Link>
);

const JobSection = ({ jobs, jobTitle }: { jobs: any; jobTitle: any }) => {
  const handleJobClick = (job: JobPosition) => {
    // console.log(`Selected job: ${job.Title}`);
  };

  return (
    <section className="relative bg-white pb-[60px]">
      <div className=" mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:gap-[7.14%] py-[60px] md:pt-[60px] md:pb-[60px] space-y-6 lg:space-y-0">
          <h2 className="text-base md:text-[40px] xl:text-[60px] leading-tight md:leading-[50px] font-medium text-black lg:w-[41.14%]">
            {jobTitle.Title}
          </h2>
          <h4 className="text-[28px] leading-[35px]   font-medium text-black text-balance lg:w-[51.71%]">
            {jobTitle.Description}
          </h4>
        </div>

        <div className="space-y-0">
          {jobs.data.map((job: any, index: any) => (
            <JobCard
              key={`${job.Title}-${index}`}
              job={job}
              onClick={() => handleJobClick(job)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobSection;
