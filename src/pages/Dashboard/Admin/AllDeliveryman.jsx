import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import Loading from '@/components/Loading/Loading';

const AllDeliveryman = () => {
  const axiosSecure = useAxiosSecure();
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  const {
    data: deliveryMen = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['deliverymen'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/user');
      return data.filter((user) => user.role === 'deliveryman');
    },
  });

  const sortedDeliveryMen = [...deliveryMen].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    return sortConfig.direction === 'asc'
      ? aValue > bValue
        ? 1
        : -1
      : aValue < bValue
      ? 1
      : -1;
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading delivery men</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">All Delivery Personnel</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort('name')}>
                Name{' '}
                {sortConfig.key === 'name' &&
                  (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </TableHead>
              <TableHead onClick={() => handleSort('number')}>
                Phone Number{' '}
                {sortConfig.key === 'number' &&
                  (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </TableHead>
              <TableHead onClick={() => handleSort('numParcelsDelivered')}>
                Parcels Delivered{' '}
                {sortConfig.key === 'numParcelsDelivered' &&
                  (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </TableHead>
              <TableHead onClick={() => handleSort('averageReview')}>
                Average Review{' '}
                {sortConfig.key === 'averageReview' &&
                  (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedDeliveryMen.map((deliveryman) => (
              <TableRow key={deliveryman._id}>
                <TableCell>{deliveryman.name}</TableCell>
                <TableCell>{deliveryman.number}</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {deliveryman.numParcelsDelivered || 0}
                  </Badge>
                </TableCell>
                <TableCell>
                  {deliveryman.averageReview
                    ? `${deliveryman.averageReview.toFixed(1)}/5`
                    : 'No reviews'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AllDeliveryman;
