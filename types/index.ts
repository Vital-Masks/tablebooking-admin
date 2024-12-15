declare type Status = 'pending' | 'scheduled' | 'cancelled';

declare type Restaurant = {
  _id?: string;
  id: string;
  name: string;
  type: string;
  phone: string;
  email: string;
  address: string;
  subscription: string;
  availability: string;
  createdOn: string;
  hospitalityChainId?: any;
  images?: any;
  restaurantName?: string;
};

declare type CreateRestaurantGeneralParams = {
  restaurantName: string;
  restaurantType: string;
  contactNumber: string;
  whatsappNumber: string;
  email: string;
  website: string;
  address: string;
  addressEmbedURL: string;
  description: string;
  diningStyle: string;
  dressCode: string;
  paymentOptions: string;
  timeZone: string;
  availabilityStatus: Status;
  promoted: string;
  coverUpload: string;
  hospitalityChainId?: string;
  images: any;
};

declare type HospitalChain = {
  _id?: string;
  id: string;
  chainName: string;
  address: string;
  registrationNumber: string;
  contactNumber: string;
  firstName: string;
  lastName?: string;
  email: string;
  mobileNumber?: string;
};

declare type CreateHospitalChainParams = {
  chainName: string;
  address: string;
  registrationNumber: string;
  contactNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
};

declare type CuisineMenu = {
  _id?: string;
  id: string;
  foodName: string;
  category: string;
  price: string;
  coverImage: any;
};

declare type DiningTiming = {
  _id?: string;
  restaurantId: string;
  diningType: string;
  diningName: string;
  description: string;
  dateType: string;
  days: any;
  dateFrom: string;
  dateTo: string;
  timeFrom: string;
  timeTo: string;
  availabilityStatus: string;
  pricePerPerson: string;
  diningAreas: string;
};

declare type CreateCuisineMenuParams = {
  foodName: string;
  category: string;
  price: string;
  description: string;
  cuisine: string;
  hospitalityChainId?: string;
  restaurantId?: string;
};

declare type DiningArea = {
  _id?: string;
  id: string;
  sectionName: string;
  MaxSeatCount: string;
  SeatingAreaType: string;
};

declare type CreateDiningParams = {
  sectionName: string;
  MaxSeatCount: string;
  SeatingAreaType: string;
  hospitalityChainId?: string;
  restaurantId?: string;
  days: any;
};

declare type CreateDiningTimingParams = {
  diningType: string;
  diningName: string;
  description: string;
  dateType: string;
  days: any;
  dateFrom: string;
  dateTo: string;
  timeFrom: string;
  timeTo: string;
  availabilityStatus: true;
  pricePerPerson: string;
  diningAreas: string;
  hospitalityChainId?: string;
  restaurantId?: string;
  coverImage?: any;
};

declare type UserRolesParams = {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  gender: string;
  phoneNumber: string;
  hospitalityChainId?: string;
  restaurantId?: string;
};

declare type UserRole = {
  _id?: string;
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  gender: string;
  phoneNumber: string;
};

declare type Reservation = {
  id: string;
  fullname: string;
  contact: string;
  restaurant: string;
  reservedfor: string;
  date: string;
  time: string;
  pax: string;
  diningarea: string;
  status: string;
  table: string;
  createdOn: string;
  guestUserId?: any;
  restaurantId?: any;
  dining?: any;
  guestSize?: string;
  diningArea?: any;
  occasion?: string;
  specialRequest?: string;
};
