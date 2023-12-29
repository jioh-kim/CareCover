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

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: "",
  price: "",
  isFree: false,
  url: "",
};
