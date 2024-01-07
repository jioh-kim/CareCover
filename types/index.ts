// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// ====== PROFILE PARAMS
export type CreateProfileParams = {
  userId: string;
  profileDetails: {
    bio: string;
    licenseNumber: string;
    certificationsUrl?: string | undefined;
    yearOfExp: string;
    occupationId: string;
  };
  path: string;
};

export type UpdateProfileParams = {
  userId: string;
  profileDetails: {
    _id: string;
    bio: string;
    licenseNumber: string;
    certificationsUrl?: string | undefined;
    yearOfExp: string;
    occupationId: string;
  };
  path: string;
};


export type GetProfileByUserParams = {
  userId: string;
};

// ====== Job PARAMS
export type CreateJobParams = {
  userId: string;
  job: {
    title: string;
    description: string;
    startDateTime: Date;
    endDateTime: Date;
    applicationDeadline: Date;
    occupationId: string;
    locationId: string;
    minPay: string;
    maxPay: string;
    requirements: string;
  };
  path: string;
};

export type UpdateJobParams = {
  userId: string;
  job: {
    _id: string;
    title: string;
    description: string;
    startDateTime: Date;
    endDateTime: Date;
    applicationDeadline: Date;
    occupationId: string;
    locationId: string;
    minPay: string;
    maxPay: string;
    requirements: string;
  };
  path: string;
};

export type DeleteJobParams = {
  jobId: string;
  path: string;
};

export type GetAllJobsParams = {
  query: string;
  location: string;
  occupation: string;
  limit: number;
  page: number;
};

export type GetJobsByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

export type GetRelatedJobsByLocationParams = {
  locationId: string;
  jobId: string;
  limit?: number;
  page: number | string;
};

export type GetRelatedJobsByOccupationParams = {
  occupationId: string;
  jobId: string;
  limit?: number;
  page: number | string;
};

export type Job = {
  _id: string;
  title: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  applicationDeadline: Date;
  minPay: string;
  maxPay: string;
  requirements: string;
  postedBy: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  location: {
    _id: string;
    name: string;
    count: number;
  };
  occupation: {
    _id: string;
    name: string;
    count: number;
  };
};

// ====== LOCATION PARAMS
export type CreateLocationParams = {
  locationName: string;
};

// ====== OCCUPATION PARAMS
export type CreateOccupationParams = {
  occupationName: string;
};


// ====== ORDER PARAMS
export type CheckoutOrderParams = {
  jobTitle: string;
  jobId: string;
  price: string;
  isFree: boolean;
  buyerId: string;
};

export type CreateOrderParams = {
  stripeId: string;
  jobId: string;
  buyerId: string;
  totalAmount: string;
  createdAt: Date;
};

export type GetOrdersByJobParams = {
  jobId: string;
  searchString: string;
};

export type GetOrdersByUserParams = {
  userId: string | null;
  limit?: number;
  page: string | number | null;
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
