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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FcCancel } from "react-icons/fc";
import LocationModal from "@/components/Modal/LocationModal";
import Swal from "sweetalert2";

const MyDeliveryList = () => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: allParcel = [], isLoading } = useQuery({
    queryKey: ["bookParcel"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/allParcel`);
      return data;
    },
  });

  const cancelParcelMutation = useMutation({
    mutationFn: (parcelId) => axiosSecure.patch(`/cancelParcel/${parcelId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["bookParcel"]);
      Swal.fire({
        title: "Cancelled!",
        text: "The parcel has been cancelled.",
        icon: "success",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "Failed to cancel the parcel.",
        icon: "error",
      });
    },
  });

  const deliverParcelMutation = useMutation({
    mutationFn: (parcelId) => axiosSecure.patch(`/deliverParcel/${parcelId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["bookParcel"]);
      Swal.fire({
        title: "Delivered!",
        text: "The parcel has been delivered.",
        icon: "success",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "Failed to deliver the parcel.",
        icon: "error",
      });
    },
  });

  const handleCancel = (parcelId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((secondResult) => {
      if (secondResult.isConfirmed) {
        cancelParcelMutation.mutate(parcelId);
      }
    });
  };

  const handleDeliver = (parcelId) => {
    Swal.fire({
      title: "Confirm delivery",
      text: "Are you sure you want to deliver this parcel?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, deliver it!",
    }).then((secondResult) => {
      if (secondResult.isConfirmed) {
        deliverParcelMutation.mutate(parcelId);
      }
    });
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const rowsPerPage = 5;
  const totalPages = Math.ceil(allParcel.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = allParcel.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const formatDateForDisplay = (date) => {
    if (!date) return "";
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const handleOpenModal = (parcel) => {
    setModalData({
      latitude: parcel.deliveryLat,
      longitude: parcel.deliveryLon,
    });
    setShowLocationModal(true);
  };

  const handleClose = () => {
    setShowLocationModal(false);
  };

  return (
    <div className="mt-0">
      <div>
        <CardHeader className="bg-green-200 py-5">
          <CardTitle className="text-center">My Delivery List</CardTitle>
        </CardHeader>
        <div className="p-0">
          <div className="overflow-auto" style={{ maxHeight: "400px" }}>
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
                    <TableCell className="font-medium">
                      {formatDateForDisplay(parcel.approximateDeliveryDate)}
                    </TableCell>
                    <TableCell className="font-medium">
                      {parcel.receiverPhoneNumber}
                    </TableCell>
                    <TableCell className="font-medium">
                      {parcel.deliveryAddress}
                    </TableCell>
                    <TableCell className="font-medium">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenModal(parcel)}
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancel(parcel._id)}
                        disabled={
                          parcel.status === "cancelled" ||
                          parcel.status === "delivered" ||
                          cancelParcelMutation.isLoading
                        }
                      >
                        <FcCancel />
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeliver(parcel._id)}
                        disabled={
                          parcel.status === "delivered" ||
                          parcel.status === "cancelled" ||
                          deliverParcelMutation.isLoading
                        }
                      >
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
              <GrPrevious />
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
      {showLocationModal && (
        <LocationModal
          deliveryLat={modalData.latitude}
          deliveryLon={modalData.longitude}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default MyDeliveryList;
