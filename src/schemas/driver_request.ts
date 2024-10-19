import * as yup from "yup";

export const driverRequestSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  serName: yup.string().required("Surname is required"),
  phone: yup.string().required("Phone is required"),
  email: yup.string().email().required("Email is required"),
  truckType: yup.string().required("Truck type is required"),
  truckDescription: yup.string().required("Truck Description is required"),
});
