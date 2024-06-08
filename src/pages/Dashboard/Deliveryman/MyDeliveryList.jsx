import { Button } from "@/components/ui/button";
import { GrFormNext, GrPrevious } from "react-icons/gr";
import { CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FcCancel } from "react-icons/fc";

const MyDeliveryList = () => {
  // fetch data

  const axiosSecure = useAxiosSecure();
  const { data: allParcel = [], isLoading } = useQuery({
    queryKey: ["bookParcel"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/allParcel`);
      return data;
    },
  });
  console.log(allParcel);
  if (isLoading) {
    <span>loading</span>;
  }
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Calculate the number of pages
  const totalPages = Math.ceil(allParcel.length / rowsPerPage);

  // Calculate the start and end indices of the rows for the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = allParcel.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div className="mt-0 overflow-x-auto">
      <div>
        <CardHeader className="bg-green-200 py-5">
          <CardTitle className="text-center">My Delivery List</CardTitle>
        </CardHeader>
        <div className="p-0">
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-200">
                  <TableHead className="text-cyan-500">Booked User’s</TableHead>
                  <TableHead className="text-cyan-500">
                    Receivers Name
                  </TableHead>
                  <TableHead className="text-cyan-500">User’s Phone</TableHead>
                  <TableHead className="text-cyan-500">
                    Requested Delivery Date
                  </TableHead>
                  <TableHead className="text-cyan-500">
                    Approximate Delivery Date
                  </TableHead>
                  <TableHead className="text-cyan-500">
                    Receiver’s phone
                  </TableHead>
                  <TableHead className="text-cyan-500">
                    Receivers Address
                  </TableHead>
                  <TableHead className="text-cyan-500">View Location</TableHead>
                  <TableHead className="text-cyan-500">Cancel</TableHead>
                  <TableHead className="text-cyan-500">Deliver</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentRows.map((parcel) => (
                  <TableRow key={parcel._id}>
                    <TableCell className="font-medium">
                      {parcel.normalUser.name}
                    </TableCell>
                    <TableCell className="font-medium">
                      {parcel.receiverName}
                    </TableCell>
                    <TableCell className="font-medium">
                      {parcel.phoneNumber}
                    </TableCell>
                    <TableCell className="font-medium">
                      {parcel.requestedDeliveryDate}
                    </TableCell>
                    <TableCell className="font-medium">later</TableCell>
                    <TableCell className="font-medium">
                      {parcel.receiverPhoneNumber}
                    </TableCell>
                    <TableCell className="font-medium">
                      {parcel.deliveryAddress}
                    </TableCell>
                    <TableCell className="font-medium">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">
                      <Button variant="outline" size="sm">
                        <FcCancel />
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">
                      <Button variant="outline" size="sm">
                        Delivered
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center p-4 space-x-2">
            <Button
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
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
        </div>
      </div>
    </div>
  );
};

export default MyDeliveryList;
