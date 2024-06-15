import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import ReviewModal from "@/components/Modal/ReviewModal";
import Loading from "@/components/Loading/Loading";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [filterStatus, setFilterStatus] = useState("all");
  const {
    data: myParcel = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookParcel", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/myParcel/${user?.email}`);
      return data;
    },
  });

  const handleCancel = async (id) => {
    try {
      const response = await axiosSecure.delete(`/cancelParcel/${id}`);
      if (response.status === 200) {
        Swal.fire({
          title: "Deleted!",
          text: "Your parcel has been cancelled.",
          icon: "success",
        });
        refetch();
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Failed to cancel parcel. Please try again.",
        icon: "error",
      });
    }
  };

  const filteredParcels =
    filterStatus === "all"
      ? myParcel
      : myParcel.filter((parcel) => parcel.status === filterStatus);

  if (isLoading) return <div><Loading></Loading></div>;

  return (
    <>
      <main className="grid overflow-x-auto md:overflow-hidden flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:pt-5">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    onClick={() => setFilterStatus("pending")}
                  >
                    Pending
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    onClick={() => setFilterStatus("on the way")}
                  >
                    On the Way
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    onClick={() => setFilterStatus("delivered")}
                  >
                    Delivered
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    onClick={() => setFilterStatus("returned")}
                  >
                    Returned
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    onClick={() => setFilterStatus("cancelled")}
                  >
                    Cancelled
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link to={"/dashboard/book-parcel"}>
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Parcel
                  </span>
                </Button>
              </Link>
            </div>
          </div>
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>My Parcel</CardTitle>
                <CardDescription>
                  Manage your parcel and view their process.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table className="">
                  <TableHeader>
                    <tr className="bg-gray-100 ">
                      <TableHead className="text-cyan-500">
                        Parcel Type
                      </TableHead>
                      <TableHead className="text-cyan-500">
                        Requested Delivery Date
                      </TableHead>
                      <TableHead className="text-cyan-500">
                        Approximate Delivery Date
                      </TableHead>
                      <TableHead className="text-cyan-500">
                        Booking Date
                      </TableHead>
                      <TableHead className="text-cyan-500">
                        Delivery Man ID
                      </TableHead>
                      <TableHead className="text-cyan-500">
                        Booking Status
                      </TableHead>
                      <TableHead className="text-cyan-500">Actions</TableHead>
                      <TableHead className="text-cyan-500">Review</TableHead>
                      <TableHead className="text-cyan-500">Pay</TableHead>
                    </tr>
                  </TableHeader>
                  <TableBody>
                    {filteredParcels.map((parcel) => (
                      <TableRow key={parcel._id} refetch={refetch}>
                        <TableCell className="font-medium">
                          {parcel.parcelType}
                        </TableCell>
                        <TableCell>{parcel.requestedDeliveryDate}</TableCell>
                        <TableCell>
                          {parcel.approximateDeliveryDate
                            ? new Date(
                                parcel.approximateDeliveryDate
                              ).toLocaleDateString()
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          {new Date(parcel.currentDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                                // disabled={parcel.status !== "pending"}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                {parcel.deliveryManID || "N/A"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>

                        <TableCell>
                          <Badge variant="outline">{parcel.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                                disabled={parcel.status !== "pending"}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <Link
                                to={`/dashboard/update-parcel/${parcel._id}`}
                              >
                                <DropdownMenuItem
                                  disabled={parcel.status !== "pending"}
                                >
                                  Update
                                </DropdownMenuItem>
                              </Link>
                              <DropdownMenuItem
                                onClick={() => {
                                  Swal.fire({
                                    title: "Are you sure?",
                                    text: "You won't be able to revert this!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes, delete it!",
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      handleCancel(parcel._id);
                                    }
                                  });
                                }}
                                disabled={
                                  parcel.status !== "pending" && "on the way"
                                }
                              >
                                Cancel
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        <TableCell>
                          {parcel.status === "delivered" && (
                            <ReviewModal
                              deliveryManID={parcel.deliveryManID}
                              photoURl={parcel.normalUser.image}
                              name={parcel.normalUser.name}
                            />
                          )}
                        </TableCell>
                        <TableCell>
                          {parcel.status !== "cancelled" && (
                            <Link to={`/dashboard/payment/${parcel._id}`}>
                              <button
                                disabled={parcel.price === "paid"}
                                className={`bg-${
                                  parcel.price === "paid" ? "gray" : "blue"
                                }-500 hover:bg-${
                                  parcel.price === "paid" ? "gray" : "blue"
                                }-700 text-white font-bold py-2 px-4 rounded btn-sm`}
                              >
                                {parcel.price === "paid" ? "Paid" : "Pay"}
                              </button>
                            </Link>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};

export default MyParcel;
