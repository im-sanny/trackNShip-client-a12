import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GrFormNext, GrPrevious } from "react-icons/gr";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import toast from "react-hot-toast";

const AllParcel = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [deliveryManId, setDeliveryManId] = useState("");
  const [approxDeliveryDate, setApproxDeliveryDate] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchParcels = async () => {
    const { data } = await axiosSecure.get("/allParcel");
    return data;
  };

  const {
    data: allParcels = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allParcel"],
    queryFn: fetchParcels,
  });

  const fetchDeliveryMen = async () => {
    const { data } = await axiosSecure.get("/user");
    setDeliveryMen(data.filter((user) => user.role === "deliveryman"));
  };

  useEffect(() => {
    fetchDeliveryMen();
  }, []);

  const handleAssign = async () => {
    if (selectedParcel && deliveryManId && approxDeliveryDate) {
      try {
        const selectedParcelId = selectedParcel?._id;
        if (!selectedParcelId) {
          console.error("Selected parcel ID is undefined.");
          return;
        }
        const response = await axiosSecure.post(
          `/updateBooking/${selectedParcel?._id}`,
          {
            deliveryMenID: deliveryManId,
            approximateDeliveryDate: approxDeliveryDate,
          }
        );

        // Handle success response
        toast.success("Booking updated successfully");
        console.log("Booking updated successfully:", response.data);
        refetch();
        console.log(deliveryManId, selectedParcelId, approxDeliveryDate);
      } catch (error) {
        // Handle error
        console.error("Error assigning delivery man:", error);
        toast.error(error.message);
      }
    } else {
      console.error(
        "Selected parcel, delivery man ID, or approximate delivery date is undefined."
      );
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    queryClient.invalidateQueries("allParcel");
  };

  const filteredParcels = allParcels.filter((parcel) => {
    const parcelDate = new Date(parcel.requestedDeliveryDate);
    const isAfterStartDate = startDate ? parcelDate >= startDate : true;
    const isBeforeEndDate = endDate ? parcelDate <= endDate : true;
    return isAfterStartDate && isBeforeEndDate;
  });

  // Pagination
  const rowsPerPage = 5;
  const totalPages = Math.ceil(filteredParcels.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = filteredParcels.slice(startIndex, endIndex);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <>
      <Card>
        <CardHeader className="bg-gray-100 py-3 mb-1">
          <CardTitle className="text-center text-black font-bold text-3xl">All Parcel</CardTitle>
          <div className="flex justify-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-[280px] justify-start text-left font-normal ${
                    !startDate && "text-muted-foreground"
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, "PPP")
                  ) : (
                    <span>Pick a start date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-[280px] justify-start text-left font-normal ${
                    !endDate && "text-muted-foreground"
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? (
                    format(endDate, "PPP")
                  ) : (
                    <span>Pick an end date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-cyan-500">User’s Name</TableHead>
                <TableHead className="text-cyan-500">User’s Phone</TableHead>
                <TableHead className="text-cyan-500">Booking Date</TableHead>
                <TableHead className="text-cyan-500">
                  Requested Delivery Date
                </TableHead>
                <TableHead className="text-cyan-500">Cost</TableHead>
                <TableHead className="text-cyan-500">Booking Status</TableHead>
                <TableHead className="text-cyan-500">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRows.map((parcel) => (
                <TableRow key={parcel._id.$oid}>
                  <TableCell className="font-medium">
                    {parcel.normalUser.name}
                  </TableCell>
                  <TableCell>{parcel.phoneNumber}</TableCell>
                  <TableCell>
                    {new Date(parcel.currentDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{parcel.requestedDeliveryDate}</TableCell>
                  <TableCell>{parcel.price}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{parcel.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedParcel(parcel)}
                        >
                          Manage
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-center">
                            Manage Parcel
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className="text-center">
                          <div className="flex justify-center gap-5">
                            <select
                              className="outline p-2 rounded-md"
                              id="deliveryMan"
                              value={deliveryManId}
                              onChange={(e) => setDeliveryManId(e.target.value)}
                            >
                              <option className="rounded-md py-1">
                                Select Delivery Man
                              </option>
                              {deliveryMen.map((man) => (
                                <option key={man._id} value={man._id}>
                                  {man.name || man.email}
                                </option>
                              ))}
                            </select>
                            <input
                              className="outline p-2 rounded-md"
                              type="date"
                              id="deliveryDate"
                              placeholder="Approximate Delivery Date"
                              value={
                                approxDeliveryDate
                                  ? new Date(approxDeliveryDate)
                                      .toISOString()
                                      .split("T")[0]
                                  : ""
                              }
                              onChange={(e) =>
                                setApproxDeliveryDate(e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <label htmlFor="deliveryDate"></label>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="space-x-3">
                            <AlertDialogCancel className="outline p-1.5 rounded-md">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={handleAssign}>
                              Assign
                            </AlertDialogAction>
                          </div>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="flex justify-center p-4 space-x-2">
        <Button size="sm" onClick={handlePrevPage} disabled={currentPage === 1}>
          <GrPrevious></GrPrevious>
        </Button>
        <span className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index + 1}
              variant={currentPage === index + 1 ? "solid" : "outline"}
              size="sm"
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </span>
        <Button
          size="sm"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <GrFormNext />
        </Button>
      </div>
    </>
  );
};

export default AllParcel;
