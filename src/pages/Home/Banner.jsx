const Banner = () => {
  return (
    <>
      <div
        className="relative bg-cover bg-center h-[500px] mt-10 rounded-lg"
        style={{
          backgroundImage: "url('https://i.ibb.co/yBp1H6G/mesh-833.png')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-0"></div>
        <div className=" relative flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to TrackNShip</h1>
          <p className="text-xl mb-8">Discover amazing content below</p>
          <div className="flex w-2/3 md:w-1/2 lg:w-1/3 ">
            <input
              type="text"
              className="flex-grow px-4 py-2 rounded-l-lg text-black"
              placeholder="Search..."
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
