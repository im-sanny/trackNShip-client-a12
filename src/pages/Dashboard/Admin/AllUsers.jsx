import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { GrFormNext, GrPrevious } from 'react-icons/gr';
import Loading from '@/components/Loading/Loading';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user: loggedInUser } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const {
    data: users = [],
    isLoading: isUsersLoading,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => axiosSecure('/user').then((res) => res.data),
  });

  const { data: bookings = [], isLoading: isBookingsLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: () => axiosSecure('/allParcel').then((res) => res.data),
  });

  const { mutateAsync } = useMutation({
    mutationFn: ({ email, role }) =>
      axiosSecure.patch(`/user/update/${email}`, { role, status: 'Verified' }),
    onSuccess: () => {
      refetchUsers();
      toast.success('User role updated');
    },
    onError: (error) => toast.error(error.message),
  });

  const changeUserRole = async (email, role) => {
    if (loggedInUser.email === email) {
      toast.error('Cannot change your own role');
      return;
    }

    try {
      await mutateAsync({ email, role });
    } catch (error) {
      console.error(error);
    }
  };

  const bookingCounts = bookings.reduce((acc, booking) => {
    const email = booking.normalUser.email;
    acc[email] = (acc[email] || 0) + 1;
    return acc;
  }, {});

  if (isUsersLoading || isBookingsLoading) return <Loading />;

  const totalPages = Math.ceil(users.length / rowsPerPage);
  const currentUsers = users.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const roleColors = {
    user: 'bg-blue-500 text-white',
    deliveryman: 'bg-green-500 text-white',
    admin: 'bg-red-500 text-white',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {[
                'Name',
                'Phone',
                'Parcels',
                'Total Spent',
                'Role',
                'Action',
              ].map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.number}</TableCell>
                <TableCell className="text-center">
                  {bookingCounts[user.email] || 0}
                </TableCell>
                <TableCell className="text-center">
                  {user.totalSpent || 'N/A'}
                </TableCell>
                <TableCell>
                  <Badge className={roleColors[user.role]}>{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Change Role</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {['user', 'deliveryman', 'admin'].map((role) => (
                        <DropdownMenuItem
                          key={role}
                          onClick={() => changeUserRole(user.email, role)}
                        >
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-center mt-4 space-x-2">
          <Button
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <GrPrevious />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              size="sm"
              variant={currentPage === i + 1 ? 'solid' : 'outline'}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <GrFormNext />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AllUsers;
