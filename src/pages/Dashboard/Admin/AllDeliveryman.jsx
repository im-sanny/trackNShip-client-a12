import { Table, TableBody, TableHead, TableHeader} from "@/components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useState, useEffect } from "react";

const AllDeliveryman = () => {
  const [deliveryMen, setDeliveryMen] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchDeliveryMen();
  }, []); // Fetch delivery men data when the component mounts

  const fetchDeliveryMen = async () => {
    try {
      const { data: users } = await axiosSecure.get("/user");
      const deliveryMan = users.filter((user) => user.role === "deliveryMan");
      setDeliveryMen(deliveryMan);
    } catch (error) {
      console.error("Error fetching delivery men:", error);
    }
  };

  return (
    <div className="shadow-md rounded-lg overflow-auto">
  <Table className="w-full">
    <TableHeader>
      <tr className="bg-green-200 ">
        <TableHead className="px-4 py-2">Delivery Mans Name</TableHead>
        <TableHead className="px-4 py-2">Phone Number</TableHead>
        <TableHead className="px-4 py-2">Number of Parcels Delivered</TableHead>
        <TableHead className="px-4 py-2">Average Review</TableHead>
      </tr>
    </TableHeader>
    <TableBody>
      {deliveryMen.map((deliveryMan, index) => (
        <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
          <td className="border px-4 py-2">{deliveryMan.email}</td>
          <td className="border px-4 py-2">{deliveryMan.phoneNumber}</td>
          <td className="border px-4 py-2">
            {deliveryMan.numParcelsDelivered}
          </td>
          <td className="border px-4 py-2">{deliveryMan.averageReview}</td>
        </tr>
      ))}
    </TableBody>
  </Table>
</div>

  );
};

export default AllDeliveryman;
