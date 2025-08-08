import * as Yup from "yup";
import { cityOptions } from "../cities";

export const generalFormField = [
  {
    id: "coverImage",
    name: "coverImage",
    label: "Cover Image",
    placeholder: "Upload restaurant cover images (5 images required)",
    type: "file",
    maxFiles: 5,
  },
  {
    id: "grid1",
    name: "grid",
    fields: [
      {
        id: "restaurantName",
        name: "restaurantName",
        label: "Restaurant Name",
        placeholder: "Enter restaurant name",
        type: "text",
      },
      {
        id: "restaurantType",
        name: "restaurantType",
        label: "Restaurant Type",
        placeholder: "Select restaurant type",
        type: "select",
        options: [],
      },
    ],
  },
  {
    id: "grid2",
    name: "grid",
    fields: [
      {
        id: "contactNo",
        name: "contactNo",
        label: "Contact Number",
        placeholder: "07XXXXXXXX",
        type: "text",
      },
      {
        id: "whatsappNo",
        name: "whatsappNo",
        label: "WhatsApp Number",
        placeholder: "07XXXXXXXX",
        type: "text",
      },
    ],
  },
  {
    id: "grid3",
    name: "grid",
    fields: [
      {
        id: "registerationNumber",
        name: "registerationNumber",
        label: "Registeration Number",
        placeholder: "Enter registration number",
        type: "text",
      },
      {
        id: "hospitalityChainId",
        name: "hospitalityChainId",
        label: "Hospital Chain",
        placeholder: "Select hospitality chain",
        type: "select",
        options: [],
      },
    ],
  },
  {
    id: "grid4",
    name: "grid",
    fields: [
      { 
        id: "email", 
        name: "email", 
        label: "Email Address", 
        placeholder: "Enter email address",
        type: "email" 
      },
      { 
        id: "website", 
        name: "website", 
        label: "Website", 
        placeholder: "https://example.com",
        type: "url" 
      },
    ],
  },
  {
    id: "grid5",
    name: "grid",
    fields: [
      {
        id: "city",
        name: "city",
        label: "City",
        placeholder: "Select city",
        type: "select",
        options: cityOptions,
      },
      { 
        id: "address", 
        name: "address", 
        label: "Address", 
        placeholder: "Enter restaurant address",
        type: "text" 
      }
    ],
  },
  {
    id: "grid7",
    name: "grid",
    fields: [
      
      {
        id: "addressEmbedURL",
        name: "addressEmbedURL",
        label: "Address Embed URL",
        placeholder: "https://maps.google.com/embed?pb=...",
        type: "url",
      },
      {
        id: "description",
        name: "description",
        label: "Description",
        placeholder: "Enter restaurant description",
        type: "textarea",
      }
    ],
  },
  {
    id: "grid8",
    name: "grid",
    fields: [
      
      {
        id: "currency",
        name: "currency",
        label: "Currency",
        placeholder: "Select currency",
        type: "select",
      },
      {
        id: "dinningStyle",
        name: "dinningStyle",
        label: "Dinning Style",
        placeholder: "Select dining styles",
        type: "select",
        options: [],
        isMulti: true,
      },
    ],
  },
  {
    id: "grid9",
    name: "grid",
    fields: [

      {
        id: "dressCode",
        name: "dressCode",
        label: "Dress Code",
        placeholder: "Select dress codes",
        type: "select",
        options: [],
        isMulti: true,
      },
      {
        id: "paymentOptions",
        name: "paymentOptions",
        label: "Payment Options",
        placeholder: "Select payment options",
        type: "select",
        options: [
          {
            label: "Cash",
            value: "cash",
          },
          {
            label: "Visa",
            value: "visa",
          },
          {
            label: "Master",
            value: "master",
          },
        ],
        isMulti: true,
      }
    ],
  },
  {
    id: "grid10",
    name: "grid",
    fields: [
      
      {
        id: "cousines",
        name: "cousines",
        label: "Cuisines",
        placeholder: "Select cuisines",
        type: "select",
        isMulti: true,
      },
      {
        id: "timeZone",
        name: "timeZone",
        label: "Time Zone",
        placeholder: "Select time zone",
        type: "select",
        options: [],
      }
    ],
  },
  {
    id: "grid11",
    name: "grid",
    fields: [
      
      {
        id: "availabilityStatus",
        name: "availabilityStatus",
        label: "Availability Status",
        placeholder: "Select availability status",
        type: "select",
        options: [
          {
            label: "Available",
            value: "Available",
          },
          {
            label: "Not Available",
            value: "Not Available",
          },
        ],
      },
      {
        id: "openingDays",
        name: "openingDays",
        label: "Opening Days",
        placeholder: "Select opening days",
        type: "select",
        options: [
          {
            label: "Monday",
            value: "Monday",
          },
          {
            label: "Tuesday",
            value: "Tuesday",
          },
          {
            label: "Wednesday",
            value: "Wednesday",
          },
          {
            label: "Thursday",
            value: "Thursday",
          },
          {
            label: "Friday",
            value: "Friday",
          },
          {
            label: "Saturday",
            value: "Saturday",
          },
          {
            label: "Sunday",
            value: "Sunday",
          },
        ],
        isMulti: true,
      },
      { 
        id: "openTime", 
        name: "openTime", 
        label: "Open time", 
        placeholder: "Select opening time",
        type: "time" 
      },
      {
        id: "closeTime",
        name: "closeTime",
        label: "Close time",
        placeholder: "Select closing time",
        type: "time",
      },
    ],
  },
  {
    id: "grid12",
    name: "grid",
    fields: [
      {
        id: "isPromoted",
        name: "isPromoted",
        label: "Promoted",
        placeholder: "Enable promotion",
        type: "switch",
      },
    ],
  },
];

export const generalFormSchema = Yup.object().shape({
  // Restaurant Name - Required, 3-255 characters, no leading spaces
  restaurantName: Yup.string()
    .trim()
    .min(3, "Restaurant name must be at least 3 characters")
    .max(255, "Restaurant name cannot exceed 255 characters")
    .matches(/^\S/, "Restaurant name cannot start with a space")
    .required("Restaurant name is required"),

  // Restaurant Type - Required
  restaurantType: Yup.string()
    .required("Restaurant type is required"),

  // Contact Number - Required, Sri Lankan format (07XXXXXXXX)
  contactNo: Yup.string()
    .trim()
    .matches(/^07\d{8}$/, "Contact number must be a valid Sri Lankan phone number (07XXXXXXXX)")
    .required("Contact number is required"),

  // WhatsApp Number - Required, Sri Lankan format (07XXXXXXXX)
  whatsappNo: Yup.string()
    .trim()
    .matches(/^07\d{8}$/, "WhatsApp number must be a valid Sri Lankan phone number (07XXXXXXXX)")
    .required("WhatsApp number is required"),

  // Registration Number - Required, max 15 characters
  registerationNumber: Yup.string()
    .trim()
    .max(15, "Registration number cannot exceed 15 characters")
    .required("Registration number is required"),

  // Hospitality Chain - Required
  hospitalityChainId: Yup.string()
    .required("Hospitality chain is required"),

  // Email - Required, valid email format, max 255 characters
  email: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email address cannot exceed 255 characters")
    .required("Email address is required"),

  // Website - Required, valid URL format, max 255 characters
  website: Yup.string()
    .trim()
    .url("Please enter a valid website URL")
    .max(255, "Website URL cannot exceed 255 characters")
    .required("Website URL is required"),

  // Address - Required, max 255 characters
  address: Yup.string()
    .trim()
    .max(255, "Address cannot exceed 255 characters")
    .required("Address is required"),

  // Address Embed URL - Required, valid URL format, max 255 characters
  addressEmbedURL: Yup.string()
    .trim()
    .url("Please enter a valid embed URL")
    .max(255, "Embed URL cannot exceed 255 characters")
    .required("Address embed URL is required"),

  // Description - Required, max 1000 characters
  description: Yup.string()
    .trim()
    .max(1000, "Description cannot exceed 1000 characters")
    .required("Description is required"),

  // Currency - Required
  currency: Yup.string()
    .required("Currency is required"),

  // Dining Style - Required array with at least one selection
  dinningStyle: Yup.array()
    .of(Yup.string())
    .min(1, "At least one dining style must be selected")
    .required("Dining style is required"),

  // Dress Code - Required array with at least one selection
  dressCode: Yup.array()
    .of(Yup.string())
    .min(1, "At least one dress code must be selected")
    .required("Dress code is required"),

  // Cuisines - Required array with at least one selection
  cousines: Yup.array()
    .of(Yup.string())
    .min(1, "At least one cuisine must be selected")
    .required("Cuisines are required"),

  // Payment Options - Required array with at least one selection
  paymentOptions: Yup.array()
    .of(Yup.string())
    .min(1, "At least one payment option must be selected")
    .required("Payment options are required"),

  // Time Zone - Required
  timeZone: Yup.string()
    .required("Time zone is required"),

  // Availability Status - Required
  availabilityStatus: Yup.string()
    .required("Availability status is required"),

  // Opening Days - Required array with at least one selection
  openingDays: Yup.array()
    .of(Yup.string())
    .min(1, "At least one opening day must be selected")
    .required("Opening days are required"),

  // Open Time - Required
  openTime: Yup.string()
    .required("Opening time is required"),

  // Close Time - Required
  closeTime: Yup.string()
    .required("Closing time is required"),

  // Is Promoted - Optional boolean
  isPromoted: Yup.boolean()
    .default(false),

  // Cover Image - Required array with exactly 5 images
  coverImage: Yup.array()
    .of(Yup.mixed())
    .min(5, "Exactly 5 cover images are required")
    .max(5, "Exactly 5 cover images are required")
    .required("Cover images are required"),

  // City - Required
  city: Yup.string()
    .required("City is required"),
});

export const generalImageFormField = [
  {
    id: "coverUpload",
    name: "coverUpload",
    label: "Upload Cover",
    type: "file",
  },
];

export const generalImageFormSchema = Yup.object().shape({
  coverUpload: Yup.mixed()
    .required("A cover image is required"),
});
