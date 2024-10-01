let answeredQuestions = [];
 
export const steps = [
  {
    message: "Seems like the Steps file has not been configured",
    action: 0,
    id: "bot",
    index: 0,
  },
  {
    message: "Hello, I am Arahas Ecobot. How may I address you?",
    trigger: {
      default: 3,
    },
    action: 2,
    check: /^[a-zA-Z ]{2,30}$/,
    id: "bot",
    index: 1,
  },
  {
    message:
      "Thank you for your time. We will contact you shortly through your preferred method of contact.",
    trigger: {
      default: -1,
    },
    action: -1,
    id: "bot",
    index: 2,
  },
  {
    message: "Hello, How would you like to be contacted?",
    values: ["Email", "Phone No"],
    trigger: {
      email: 4,
      phone: 6,
    },
    action: 1,
    id: "bot",
    index: 3,
  },
  {
    message: "Please enter your Email.",
    trigger: {
      approved: 8,
      default: 5,
    },
    action: 2,
    check: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
    id: "bot",
    index: 4,
  },
  {
    message: "Please enter a valid Email.",
    trigger: {
      approved: 8,
      default: 5,
    },
    action: 2,
    check: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
    id: "bot",
    index: 5,
  },
  {
    message: "Please enter your Phone No.",
    trigger: {
      approved: 8,
      default: 7,
    },
    action: 2,
    check: /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/,
    id: "bot",
    index: 6,
  },
  {
    message: "Please enter a valid Phone No.",
    trigger: {
      approved: 8,
      default: 7,
    },
    action: 2,
    check: /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/,
    id: "bot",
    index: 7,
  },
 
  {
    message: "In which state do you live in?",
 
    trigger: {
      default: 9,
    },
    action: 2,
    id: "bot",
    index: 8,
  },
  {
    message: "In which city you are located?",
    trigger: {
      default: 10,
    },
    action: 2,
    id: "bot",
    index: 9,
  },
  {
    message: "Registration Successful. Want to Know More about CSI (yes/no) ?",
    trigger: {
      default: 11,
    },
    action: 2,
    id: "bot",
    index: 10,
  },
  {
    message:
      "•CSI (City Sustainability Index) is a comprehensive platform designed to monitor the sustainability dimensions of cities and generate a sustainability score integrating environmental, social and governance factors.",
    trigger: {
      default: 2,
    },
    action: 2,
    id: "bot",
    index: 11,
  },
];