export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "Contact", link: "#contact" },
];
export const gridItems = [
  {
    id: 1,
    title: "I prioritize client collaboration, fostering open communication",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "Top 2% Freelancer on Freelancer.com",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 4, // Skipped id 3 ("My tech stack") - removed
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },
  {
    id: 5, // Custom component for JS Animation Library
    title: "Currently building a JS Animation library",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-6",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "", // Remove image, since we're using a custom component
    spareImg: "/grid.svg",
    customComponent: true, // New flag to handle rendering
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];
export const projects = [
  {
    id: 1,
    title: "Ekaant - Library Booking System",
    des: "A feature-rich library seat booking system with real-time availability, seat layouts, and admin controls.",
    img: "/p1.svg",
    iconLists: ["/react.svg", "/tail.svg", "/ts.svg", "/node.svg", "/postgres.svg"],
    link: "https://ekaant.com",
  },
  {
    id: 2,
    title: "LMS Platform - E-learning App",
    des: "A complete learning management system with quizzes, study materials, and video streaming capabilities.",
    img: "/p4.svg",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/razorpay.svg", "/aws.svg"],
    link: "https://lms-platform.com",
  },
  {
    id: 3,
    title: "Restaurant QR Ordering System",
    des: "A modern restaurant solution allowing customers to scan a QR code to view the menu and place orders seamlessly.",
    img: "/p3.svg",
    iconLists: ["/react-native.svg", "/tail.svg", "/ts.svg", "/node.svg", "/s3.svg"],
    link: "https://qrorder.com",
  },

];

export const testimonials = [
  {
    quote:
      "Collaborating with Harsh was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Harsh's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Harsh is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Harsh was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Harsh's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Harsh is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Harsh was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Harsh's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Harsh is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Harsh was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Harsh's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Harsh is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Harsh was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Harsh's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Harsh is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
];

export const companies = [
  {
    id: 1,
    name: "cloudinary",
    img: "/cloud.svg",
    nameImg: "/cloudName.svg",
  },
  {
    id: 2,
    name: "appwrite",
    img: "/app.svg",
    nameImg: "/appName.svg",
  },
  {
    id: 3,
    name: "HOSTINGER",
    img: "/host.svg",
    nameImg: "/hostName.svg",
  },
  {
    id: 4,
    name: "stream",
    img: "/s.svg",
    nameImg: "/streamName.svg",
  },
  {
    id: 5,
    name: "docker.",
    img: "/dock.svg",
    nameImg: "/dockerName.svg",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Frontend Engineer Intern",
    desc: "Assisted in the development of a web-based platform using React.js, enhancing interactivity.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: "Mobile App Dev - JSM Tech",
    desc: "Designed and developed mobile app for both iOS & Android platforms using React Native.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "Freelance App Dev Project",
    desc: "Led the dev of a mobile app for a client, from initial concept to deployment on app stores.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp3.svg",
  },
  {
    id: 4,
    title: "Lead Frontend Developer",
    desc: "Developed and maintained user-facing features using modern frontend technologies.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
  },
  {
    id: 2,
    img: "/twit.svg",
  },
  {
    id: 3,
    img: "/link.svg",
  },
];
