import ParcelBookForm from "@/components/Dashboard/Forms/ParcelBookForm";
import { Helmet } from "react-helmet-async";

const BookParcel = () => {
  return (
    <>
      <Helmet>
        <title>Book Parcel | Dashboard</title>
      </Helmet>
      <ParcelBookForm></ParcelBookForm>
    </>
  );
};

export default BookParcel;
