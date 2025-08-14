"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import FormComponent from "@/components/Common/Form";
import FormSlider from "@/components/Common/Form/FormSlider";
import PageHeader from "@/components/Elements/PageHeader";

import { handleError } from "@/lib/utils";
import { ROUTE_RESERVATIONS } from "@/constants/routes";
import {
  tableReservationFormField,
  tableReservationFormSchema,
} from "@/constants/FormsDataJs/TableReservationForm";
import {
  createReservation,
  getReservation,
  updateReservation,
} from "@/lib/actions/reservation.action";
import { createUser, getUserByEmail } from "@/lib/actions/user.action";
import { IconEye, IconXCircle } from "@/components/Icons";
import toast from "react-hot-toast";

// Types
interface ReservationFormData {
  date: string;
  time: string;
  firstname: string;
  lastname: string;
  contactNumber: string;
  email: string;
  restaurant: string;
  dining: string;
  guestSize: string;
  diningarea: string;
  occasion: string;
  specialRequest: string;
  tableNo: string;
  status: string;
  promocode?: string;
  reason?: string;
  guestUserId?: string;
}

interface ReservationData {
  _id?: string;
  date: string;
  time: string;
  guestUserId?: {
    firstName: string;
    lastName: string;
    contactNo: string;
    email: string;
  };
  restaurantId?: {
    _id: string;
    restaurantName: string;
  };
  dining?: {
    _id: string;
    diningName: string;
  };
  diningArea?: {
    _id: string;
    sectionName: string;
  };
  guestSize?: string;
  occasion?: string;
  specialRequest?: string;
  tableNo?: string;
  status?: string;
  promocode?: string;
}

// Initial form values
const INITIAL_FORM_VALUES: ReservationFormData = {
  date: "",
  time: "",
  firstname: "",
  lastname: "",
  contactNumber: "",
  email: "",
  restaurant: "",
  dining: "",
  guestSize: "",
  diningarea: "",
  occasion: "",
  specialRequest: "",
  tableNo: "",
  status: ""
};

// Custom hook for managing reservation data
const useReservationData = (reservationId: string | null) => {
  const [reservation, setReservation] = useState<ReservationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReservation = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getReservation(id);
      setReservation(response);
    } catch (err) {
      setError("Failed to fetch reservation details");
      console.error("Error fetching reservation:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetReservation = useCallback(() => {
    setReservation(null);
    setError(null);
  }, []);

  return {
    reservation,
    isLoading,
    error,
    fetchReservation,
    resetReservation,
  };
};

// Custom hook for managing form state
const useFormState = () => {
  const [createForm, setCreateForm] = useState(false);
  const [viewForm, setViewForm] = useState(false);
  const [initialValues, setInitialValues] =
    useState<ReservationFormData>(INITIAL_FORM_VALUES);

  const openCreateForm = useCallback(() => setCreateForm(true), []);
  const openViewForm = useCallback(() => setViewForm(true), []);

  const closeForms = useCallback(() => {
    setCreateForm(false);
    setViewForm(false);
    setInitialValues(INITIAL_FORM_VALUES);
  }, []);

  const updateInitialValues = useCallback(
    (values: Partial<ReservationFormData>) => {
      setInitialValues((prev) => ({ ...prev, ...values }));
    },
    []
  );

  return {
    createForm,
    viewForm,
    initialValues,
    openCreateForm,
    openViewForm,
    closeForms,
    updateInitialValues,
  };
};

// User management hook
const useUserManagement = () => {
  const handleUserCreation = useCallback(
    async (userData: {
      firstName: string;
      lastName: string;
      contactNo: string;
      email: string;
    }) => {
      try {
        const newUser: any = await createUser({
          ...userData,
          password: "123456", // Consider making this configurable
        });

        if (newUser._id) {
          return newUser._id;
        }
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    },
    []
  );

  const getOrCreateUser = useCallback(
    async (formData: ReservationFormData) => {
      try {
        const userEmail = formData.email;
        const existingUser = await getUserByEmail(userEmail);

        if (existingUser?.[0]) {
          return existingUser[0]._id;
        } else {
          const userData = {
            firstName: formData.firstname,
            lastName: formData.lastname,
            contactNo: formData.contactNumber,
            email: formData.email,
            password: "123456",
          };
          const result: any = await createUser(userData);
          console.log("result >>", result);
          if (result.success) {
            return result.result._id;
          } else {
            return null;
          }
        }
      } catch (error) {
        console.error("Error in user management:", error);
        throw error; // Re-throw the error to be handled by the calling function
      }
    },
    [handleUserCreation]
  );

  return { getOrCreateUser };
};

// Reservation details view component
const ReservationDetailsView = ({
  reservation,
  initialValues,
  onClose,
}: {
  reservation: ReservationData | null;
  initialValues: ReservationFormData;
  onClose: () => void;
}) => {
  if (!reservation) return null;

  return (
    <div className="grid grid-cols-4 p-10 relative">
      <button
        className="absolute top-5 right-5 hover:bg-gray-100 p-1 rounded transition-colors"
        onClick={onClose}
        aria-label="Close reservation details"
      >
        <IconXCircle />
      </button>

      <div className="col-span-4 flex items-center gap-4 border p-4 mt-4 rounded-t-sm">
        <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center">
          <span className="text-lg font-semibold text-gray-600">
            {initialValues.firstname?.[0]?.toUpperCase() || "U"}
          </span>
        </div>
        <div>
          <h1 className="text-base font-bold">
            {initialValues.firstname || "Undefined"}{" "}
            {initialValues.lastname || "Undefined"}
          </h1>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <IconEye />
              <span className="text-sm text-neutral-600">
                {initialValues.email || "Undefined"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <IconEye />
              <span className="text-sm text-neutral-600">
                {initialValues.contactNumber || "Undefined"}
              </span>
            </div>
          </div>
        </div>
        <div className="ml-auto">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              initialValues.status === "Booked"
                ? "bg-green-100 text-green-800"
                : initialValues.status === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
            }`}
          >
            {initialValues.status}
          </span>
        </div>
      </div>

      <div className="border p-4 border-t-0">
        <p className="font-bold text-neutral-500">Restaurant</p>
        <p className="text-base text-neutral-900">
          {reservation.restaurantId?.restaurantName || "N/A"}
        </p>
      </div>

      <div className="border p-4 border-t-0">
        <p className="font-bold text-neutral-500">Dining</p>
        <p className="text-base text-neutral-900">
          {reservation.dining?.diningName || "N/A"}
        </p>
      </div>

      <div className="border p-4 border-t-0">
        <p className="font-bold text-neutral-500">Dining Area</p>
        <p className="text-base text-neutral-900">
          {reservation.diningArea?.sectionName || "N/A"}
        </p>
      </div>

      <div className="border p-4 border-t-0">
        <p className="font-bold text-neutral-500">Guest Size</p>
        <p className="text-base text-neutral-900">
          {reservation.guestSize || "N/A"}
        </p>
      </div>

      <div className="border p-4 border-t-0">
        <p className="font-bold text-neutral-500">Occasion</p>
        <p className="text-base text-neutral-900">
          {reservation.occasion || "N/A"}
        </p>
      </div>

      <div className="border p-4 border-t-0">
        <p className="font-bold text-neutral-500">Table</p>
        <p className="text-base text-neutral-900">
          {reservation.tableNo || "N/A"}
        </p>
      </div>

      <div className="border p-4 border-t-0 col-span-2">
        <p className="font-bold text-neutral-500">Date & Time</p>
        <p className="text-neutral-900">
          {reservation.date} - {reservation.time}
        </p>
      </div>
    </div>
  );
};

ReservationDetailsView.displayName = "ReservationDetailsView";

const ReservationHeader = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reservationId = searchParams.get("reservationId");

  const {
    reservation,
    isLoading: isLoadingReservation,
    error: reservationError,
    fetchReservation,
    resetReservation,
  } = useReservationData(reservationId);

  const {
    createForm,
    viewForm,
    initialValues,
    openCreateForm,
    openViewForm,
    closeForms,
    updateInitialValues,
  } = useFormState();

  const { getOrCreateUser } = useUserManagement();

  // Memoized page header data
  const pageHeaderData = useMemo(
    () => ({
      title: "Reservations",
      button1: {
        title: "Add New Reservation",
        action: openCreateForm,
      },
    }),
    [openCreateForm]
  );

  // Handle form submission
  const handleFormSubmit = useCallback(
    async (values: ReservationFormData) => {
      try {
        console.log("Form values received:", values);

        if (!values) {
          toast.error("Form data is missing. Please try again.");
          return;
        }

        // Get or create user
        const userId = await getOrCreateUser(values);

        if (!userId) {
          toast.error("Failed to create or get user. Please try again.");
          return;
        }

        console.log("userId >>", userId);
        // Add user ID to the form data
        const formDataWithUserId = {
          ...values,
          guestUserId: userId,
        };

        // Create or update reservation
        if (reservationId) {
          await updateReservation(reservationId, formDataWithUserId);
          toast.success("Reservation updated successfully!");
        } else {
          const result: any = await createReservation(formDataWithUserId);
          console.log("result >>", result);
          toast.success("Reservation created successfully!");
        }

        closeForms();

        // Redirect if editing
        if (reservationId) {
          router.push(ROUTE_RESERVATIONS);
        }
      } catch (error) {
        console.error("Form submission error:", error);
        toast.error(
          "Something went wrong while saving the reservation. Please try again."
        );
        handleError(
          "An error occurred while submitting the reservation form:",
          error
        );
      }
    },
    [reservationId, getOrCreateUser, closeForms, router]
  );

  // Handle form close
  const handleCloseForm = useCallback(() => {
    closeForms();
    resetReservation();
    if (reservationId) {
      router.push(ROUTE_RESERVATIONS);
    }
  }, [closeForms, resetReservation, reservationId, router]);

  // Update initial values when reservation data is loaded
  useEffect(() => {
    if (reservation) {
      updateInitialValues({
        date: reservation.date || "",
        time: reservation.time?.replace(".", ":") || "",
        firstname: reservation.guestUserId?.firstName || "",
        lastname: reservation.guestUserId?.lastName || "",
        contactNumber: reservation.guestUserId?.contactNo || "",
        email: reservation.guestUserId?.email || "",
        restaurant: reservation.restaurantId?._id || "",
        dining: reservation.dining?._id || "",
        guestSize: reservation.guestSize || "",
        diningarea: reservation.diningArea?._id || "",
        occasion: reservation.occasion || "",
        specialRequest: reservation.specialRequest || "",
        tableNo: reservation.tableNo || "",
        status: reservation.status || "",
        promocode: reservation.promocode || "",
      });
    }
  }, [reservation, updateInitialValues]);

  // Fetch reservation data when reservationId changes
  useEffect(() => {
    if (reservationId) {
      openCreateForm();
      fetchReservation(reservationId);
    }
  }, [reservationId, openCreateForm, fetchReservation]);

  // Show error state
  if (reservationError) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-600 mb-2">Error loading reservation details</p>
        <button
          onClick={() => fetchReservation(reservationId!)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <PageHeader pageHeaderData={pageHeaderData} />

      <FormSlider isOpen={createForm}>
        <FormComponent
          title={reservationId ? "Edit Reservation" : "Make a Reservation"}
          fields={tableReservationFormField}
          initialValues={initialValues}
          validationSchema={tableReservationFormSchema}
          handleSubmit={handleFormSubmit}
          closeForm={handleCloseForm}
        />
      </FormSlider>

      <FormSlider isOpen={viewForm} className="!min-w-[800px]">
        <ReservationDetailsView
          reservation={reservation}
          initialValues={initialValues}
          onClose={handleCloseForm}
        />
      </FormSlider>
    </>
  );
};

ReservationHeader.displayName = "ReservationHeader";

export default ReservationHeader;
