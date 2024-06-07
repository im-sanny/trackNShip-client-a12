import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";

const AllParcel = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [deliveryManId, setDeliveryManId] = useState("");
  const [approxDeliveryDate, setApproxDeliveryDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchParcels = async () => {
    let url = "/allParcel";
    if (startDate && endDate) {
      url += `?startDate=${startDate}&endDate=${endDate}`;
    }
    const { data } = await axiosSecure.get(url);
    return data;
  };

  const {
    data: allParcel = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allParcel", startDate, endDate],
    queryFn: fetchParcels,
  });

  const fetchDeliveryMen = async () => {
    const { data } = await axiosSecure.get("/user"); // Assuming delivery men are listed in the users collection
    setDeliveryMen(data.filter((user) => user.role === "deliveryMan"));
  };

  useEffect(() => {
    fetchDeliveryMen();
  }, []);

  const assignDeliveryManMutation = useMutation({
    mutationFn: async ({ parcelId, deliveryManId, deliveryDate }) => {
      await axiosSecure.post(`/assignDeliveryMan/${parcelId}`, {
        deliveryManId,
        approximateDeliveryDate: deliveryDate,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("allParcel");
      setSelectedParcel(null);
    },
  });

  const handleAssign = () => {
    if (deliveryManId && approxDeliveryDate) {
      assignDeliveryManMutation.mutate({
        parcelId: selectedParcel._id.$oid,
        deliveryManId,
        deliveryDate: approxDeliveryDate,
      });
    }
  };

  const handleSearch = () => {
    queryClient.invalidateQueries("allParcel");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>All Parcel</CardTitle>
          <div className="flex gap-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
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
              {allParcel.map((parcel) => (
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
                          <AlertDialogTitle>Manage Parcel</AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className="modal-body">
                          <label htmlFor="deliveryMan">
                            Select Delivery Man
                          </label>
                          <select
                            id="deliveryMan"
                            value={deliveryManId}
                            onChange={(e) => setDeliveryManId(e.target.value)}
                          >
                            <option value="">Select Delivery Man</option>
                            {deliveryMen.map((man) => (
                              <option key={man._id.$oid} value={man._id.$oid}>
                                {man.name || man.email}
                              </option>
                            ))}
                          </select>
                          <label htmlFor="deliveryDate">
                            Approximate Delivery Date
                          </label>
                          <input
                            type="date"
                            id="deliveryDate"
                            value={approxDeliveryDate}
                            onChange={(e) =>
                              setApproxDeliveryDate(e.target.value)
                            }
                          />
                        </div>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleAssign}>
                            Assign
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default AllParcel;
