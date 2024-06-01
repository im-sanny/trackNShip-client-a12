import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TopDeliveryman = () => {
  return (
    <div className="mb-10">
      <header className="text-4xl flex justify-center mt-16 mb-10 font-semibold">
        The Top Delivery Man
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Card className="text-center w-full">
          <CardHeader>
            <div className="h-20 flex justify-center">
              <img
                src="https://i.ibb.co/FhhZkbn/student-3.png"
                alt=""
                className="h-20 "
              />
            </div>
            <CardTitle>Johnson</CardTitle>
            <CardDescription>Number of parcel Delivered: 90</CardDescription>
            <CardDescription>Rating:</CardDescription>
          </CardHeader>
        </Card>
        <Card className="text-center w-full">
          <CardHeader>
            <div className="h-20 flex justify-center">
              <img
                src="https://i.ibb.co/FhhZkbn/student-3.png"
                alt=""
                className="h-20 "
              />
            </div>
            <CardTitle>Johnson</CardTitle>
            <CardDescription>Number of parcel Delivered: 90</CardDescription>
            <CardDescription>Rating:</CardDescription>
          </CardHeader>
        </Card>
        <Card className="text-center w-full">
          <CardHeader>
            <div className="h-20 flex justify-center">
              <img
                src="https://i.ibb.co/FhhZkbn/student-3.png"
                alt=""
                className="h-20 "
              />
            </div>
            <CardTitle>Johnson</CardTitle>
            <CardDescription>Number of parcel Delivered: 90</CardDescription>
            <CardDescription>Rating:</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default TopDeliveryman;
