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
  minPay: "",
  maxPay: "",
  requirements: "",
  url: "",
};

export const profileDefaultValues = {
  bio: "",
  occupationId: "",
  licenseNumber: "",
  certificationUrl: "",
  yearOfExp: "",
};

export const footerLinks = [
  {
    title: "About",
    links: [
      { title: "How it works", url: "/" },
      { title: "Who we are", url: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "Contact us", url: "/" },
      { title: "About", url: "/" },
      { title: "Terms of Services", url: "/" },
      { title: "Partnership", url: "/" },
    ],
  },
  {
    title: "Socials",
    links: [
      { title: "Instagram", url: "/" },
      { title: "Facebook", url: "/" },
    ],
  },
];
