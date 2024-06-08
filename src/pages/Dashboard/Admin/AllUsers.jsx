import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { GrFormNext, GrPrevious } from "react-icons/gr";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user: loggedInUser } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Fetch users data
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/user`);
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async ({ email, role }) => {
      const { data } = await axiosSecure.patch(`/user/update/${email}`, {
        role,
        status: "Verified",
      });
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("User role updated successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  const changeUserRole = async (email, role) => {
    if (loggedInUser.email === email) {
      toast.error("Action not allowed: You cannot change your own role");
      return;
    }
    try {
      await mutateAsync({ email, role });
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  if (isLoading) return <h1>Loading</h1>;

  const totalPages = Math.ceil(users.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <>
      <Helmet>
        <title>Manage Users</title>
      </Helmet>
      <div className="text-center bg-green-300 py-5">
        <h1 className="text-2xl font-bold mb-4">All Users</h1>
      </div>
      <div className="container mx-auto p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User’s Name</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Number of Parcels Booked</TableHead>
              <TableHead>Total Spent Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow key={user.email}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.number}</TableCell>
                <TableCell>{user.parcelCount}</TableCell>
                <TableCell>{user.totalSpent}</TableCell>
                <TableCell>
                  <Badge>{user.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge>{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Change Role</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => changeUserRole(user.email, "user")}
                      >
                        User
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          changeUserRole(user.email, "deliveryman")
                        }
                      >
                        Delivery Man
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => changeUserRole(user.email, "admin")}
                      >
                        Admin
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
    </>
  );
};

export default AllUsers;
