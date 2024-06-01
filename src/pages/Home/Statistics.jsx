import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Statistics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-20 mb-10">
      <Card x-chunk="dashboard-05-chunk-1" className="flex">
        <CardDescription className="flex items-center bg-green-100 rounded-md m-6 mr-0">
          <img
            src="https://i.ibb.co/zfynTjw/booking.png"
            alt=""
            className="h-20"
          />
        </CardDescription>
        <div>
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl">1,329</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-md text-muted-foreground font-semibold">
              Parcel Booked
            </div>
          </CardContent>
        </div>
      </Card>
      <Card x-chunk="dashboard-05-chunk-1" className="flex">
        <CardDescription className="flex items-center bg-green-100 rounded-md m-6 mr-0">
          <img
            src="https://i.ibb.co/9NKJkT2/delivered.png"
            alt=""
            className="h-20"
          />
        </CardDescription>
        <div>
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl">1,329</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-md text-muted-foreground font-semibold">
              Parcel Delivered
            </div>
          </CardContent>
        </div>
      </Card>
      <Card x-chunk="dashboard-05-chunk-1" className="flex">
        <CardDescription className="flex items-center bg-green-100 rounded-md m-6 mr-0">
          <img
            src="https://i.ibb.co/5TftP6G/teamwork.png"
            alt=""
            className="h-20"
          />
        </CardDescription>
        <div>
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl">1,329</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-md text-muted-foreground font-semibold">
              Number of users
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default Statistics;
