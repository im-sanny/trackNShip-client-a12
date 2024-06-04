import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
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
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyParcel = () => {
    const axiosSecure = useAxiosSecure()
    const { data: rooms = [], isLoading } = useQuery({
        queryKey: ['rooms', category],
        queryFn: async () => {
          const { data } = await axiosCommon.get(`/rooms?category=${category}`)
    
          return data
        },
      })
  return (
    <>
      <main className="grid overflow-x-auto md:overflow-hidden flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:pt-5">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="archived" className="hidden sm:flex">
                Archived
              </TabsTrigger>
            </TabsList>
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
                  <DropdownMenuCheckboxItem checked>
                    pending
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    on the way
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>delivered</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>returned</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>cancelled</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
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
                        Approximate Delivery Date
                      </TableHead>
                      <TableHead className="text-cyan-500">
                        Booking Date
                      </TableHead>
                      <TableHead className="text-cyan-500">
                        Delivery Mn ID
                      </TableHead>
                      <TableHead className="text-cyan-500">
                        Booking Status
                      </TableHead>
                      <TableHead className="text-cyan-500">
                        Update and Cancel{" "}
                      </TableHead>
                      <TableHead className="text-cyan-500">Review</TableHead>
                      <TableHead className="text-cyan-500">Pay</TableHead>
                    </tr>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        Laser Lemonade Machine
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Draft</Badge>
                      </TableCell>
                      <TableCell className="">$499.99</TableCell>
                      <TableCell className="">25</TableCell>
                      <TableCell className="">2023-07-12 10:42 AM</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Update</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Review</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Pay</Badge>
                      </TableCell>
                    </TableRow>
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
