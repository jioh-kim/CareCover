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
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  locationId: "",
  occupationId: "",
  url: "",
};