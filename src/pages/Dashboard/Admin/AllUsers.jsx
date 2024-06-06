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

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user: loggedInUser } = useAuth();

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
      toast.error('Action not allowed: You cannot change your own role');
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

  return (
    <>
      <Helmet>
        <title>Manage Users</title>
      </Helmet>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">All Users</h1>
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
            {users.map((user) => (
              <TableRow key={user.email}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
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
                        onClick={() => changeUserRole(user.email, "User")}
                      >
                        User
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          changeUserRole(user.email, "DeliveryMan")
                        }
                      >
                        Delivery Man
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => changeUserRole(user.email, "Admin")}
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
      </div>
    </>
  );
};

export default AllUsers;
