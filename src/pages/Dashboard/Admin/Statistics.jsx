import { axiosSecure } from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ApexCharts from "react-apexcharts";
import dayjs from "dayjs";
import Loading from "@/components/Loading/Loading";

const Statistics = () => {
  // Fetch parcel data
  const { data: allParcel = [], isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/allParcel`);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }

  // Process data to get counts for bookings and deliveries per date
  const bookingsCount = {};
  const deliveriesCount = {};

  allParcel.forEach((parcel) => {
    const date = dayjs(parcel.currentDate).format("YYYY-MM-DD");
    bookingsCount[date] = (bookingsCount[date] || 0) + 1;

    if (parcel.status === "delivered") {
      deliveriesCount[date] = (deliveriesCount[date] || 0) + 1;
    }
  });

  // Ensure categories are sorted
  const categories = Object.keys(bookingsCount).sort();
  const bookedData = categories.map((date) => bookingsCount[date] || 0);
  const deliveredData = categories.map((date) => deliveriesCount[date] || 0);

  const barOptions = {
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        distributed: true, // Enable different colors for each bar
      },
    },
    colors: [
      "#00E396",
      "#FEB019",
      "#FF4560",
      "#775DD0",
      "#3F51B5",
      "#03A9F4",
      "#4CAF50",
      "#F9CE1D",
      "#FF9800",
      "#33FFB5",
    ], // Array of colors
    xaxis: {
      categories,
    },
  };

  const barSeries = [
    {
      name: "Bookings",
      data: bookedData,
    },
  ];

  const lineOptions = {
    chart: {
      type: "line",
    },
    xaxis: {
      categories,
    },
  };

  const lineSeries = [
    {
      name: "Booked Parcels",
      data: bookedData,
    },
    {
      name: "Delivered Parcels",
      data: deliveredData,
    },
  ];

  return (
    <div>
      <h1 className="text-center py-5 text-3xl mb-4 font-bold">
        Statistics
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 mx-5 justify-center">
        <ApexCharts
          options={barOptions}
          series={barSeries}
          type="bar"
          width={400}
          height={320}
        />
        <ApexCharts
          options={lineOptions}
          series={lineSeries}
          type="line"
          width={400}
          height={320}
        />
      </div>
    </div>
  );
};

export default Statistics;
