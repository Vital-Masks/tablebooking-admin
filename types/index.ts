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
