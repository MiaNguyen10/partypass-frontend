import { roles } from "../../config/Constant";

export const userList = [
  {
    user_id: 1,
    name: "John Doe",
    email: "JohnDoe@gmail.com",
    phone: "1234567890",
    date_of_birth: "01/01/2000",
    password: "password",
    role: roles[1].value, // System Admin
    institution_id: 1, //Club 1
    is_social: false,
    social_uuid: "",
    profile_pic: [],
  },
  {
    user_id: 2,
    name: "Jane Doe",
    email: "JaneDoe@gmail.com",
    phone: "0987654321",
    date_of_birth: "02/02/2000",
    password: "password",
    role: roles[0].value, // App User
    institution_id: "",
    is_social: true,
    social_uuid: "1232434",
    profile_pic: [],
  },
];
