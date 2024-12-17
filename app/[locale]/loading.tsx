const Loading = () => {
  return (
    <div className="animate-pulse">
      <div className="w-full bg-gray-200 h-[200px] md:h-[400px] lg:h-[600px]" />
      <div className="w-[90%] xl:container bg-gray-200 mx-auto mt-10 md:px-12 px-4 py-7 rounded-lg" />
      <div className="w-[90%] max-w-[1000px] bg-gray-200 mx-auto md:px-12 px-5 lg:my-16 my-8 rounded-lg">
        <div className="w-[calc(50%-20px)] h-[200px] md:h-[400px] lg:h-[600px]" />
      </div>
    </div>
  );
};

export default Loading;
