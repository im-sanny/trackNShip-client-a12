# TrackNShip

Welcome to TrackNShip, an advanced Parcel Management System built using the MERN stack. TrackNShip offers a seamless platform for users to book parcels for delivery, enabling admins to assign delivery personnel, and allowing delivery personnel to efficiently manage and deliver parcels.

## Live Site

Explore TrackNShip: [TrackNShip Live Site](https://tracknship22.web.app/)

## Credentials

### Admin Access

- **Email:** [admin@admin.com](mailto:admin@admin.com)
- **Password:** 123456

### Delivery Personnel Access

- **Email:** [deliveryman@deliveryman.com](mailto:deliveryman@deliveryman.com)
- **Password:** 123456

## Key Features

- **User Authentication:** Secure login and registration, including social login options.
- **Responsive Design:** Optimized for mobile, tablet, and desktop views.
- **User Dashboard:** Book and manage parcels, and update profile information.
- **Admin Dashboard:** Manage all parcels, users, and delivery personnel.
- **Delivery Personnel Dashboard:** View and manage assigned parcels.
- **Parcel Booking:** Book parcels with details like weight, receiver's information, and delivery address.
- **Real-time Notifications:** Alerts and notifications for all operations and authentication actions.
- **Data Fetching:** Efficient data fetching using TanStack Query.
- **Charts and Statistics:** View parcel bookings and deliveries with bar and line charts.
- **Review System:** Users can review delivery personnel, who can then view their reviews.
- **Payment System:** Integrated Stripe payment system for parcel cost transactions.
- **Environment Security:** Securely managed Firebase config keys and MongoDB credentials.
- **Elegant UI:** Utilized Shadcn UI components for a cohesive and visually appealing interface.

## Technologies Utilized

### Frontend

- **React:** Core library for building user interfaces.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **TanStack Query:** State management and data fetching.
- **SweetAlert2:** Enhanced notifications and alerts.
- **React Apex Charts:** Data visualization with charts.
- **React CountUp:** Animated numerical data.
- **Shadcn UI:** Reusable and elegant UI components.

### Backend

- **Node.js:** JavaScript runtime for server-side development.
- **Express:** Web framework for Node.js.
- **MongoDB:** NoSQL database for robust data storage.
- **JWT:** Secure authentication with JSON Web Tokens.
- **Dotenv:** Environment variable management.
- **CORS:** Middleware for handling Cross-Origin Resource Sharing.

### Authentication

- **Firebase:** User authentication and social login integration.

### Payment

- **Stripe:** Secure payment processing for parcel costs.

## Getting Started

To explore the features of TrackNShip, visit the [live site](https://tracknship22.web.app/) and log in using the provided admin or delivery personnel credentials, or create a new user account.

## Running the Project Locally

To run this project locally, follow these steps:

1. **Clone the repository:**

```bash
git clone <https://github.com/your-username/tracknship.git>
cd tracknship

```

1. **Install dependencies:**

Navigate to both the frontend and backend directories and install the necessary dependencies.

For the frontend:

```bash
cd frontend
npm install

```

For the backend:

```bash
cd backend
npm install

```

1. **Set up environment variables:**

Create a `.env` file in the `backend` directory with the following variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key

```

Create a `.env` file in the `frontend` directory with the following variables:

```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id

```

1. **Run the backend server:**

```bash
cd backend
npm start

```

1. **Run the frontend server:**

```bash
cd frontend
npm start

```

Both servers should be running now, and you can access the application at `http://localhost:8000`.

## Contributing

We welcome contributions to enhance TrackNShip. To contribute, please fork the repository, create a new branch for your feature or bug fix, and submit a pull request with a detailed description of your changes.

---

Thank you for using TrackNShip! For any questions or assistance, please contact us.
