export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Create Jobs",
    route: "/jobs/create",
  },
  {
    label: "My Profile",
    route: "/profile",
  },
  {
    label: "About",
    route: "/about",
  },
  {
    label: "Contact",
    route: "/contact",
  },
];

export const jobDefaultValues = {
  title: "",
  description: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  applicationDeadline: new Date(),
  locationId: "",
  occupationId: "",
  url: "",
};

export const profileDefaultValues = {
  bio: "",
  occupationId: "",
  licenseNumber: "",
  certificationUrl: "",
  yearOfExp: "",
};

