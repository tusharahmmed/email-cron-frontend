import * as yup from "yup";

export const quoteRequestSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  serName: yup.string().required("Surname is required"),
  phone: yup.string().required("Phone is required"),
  email: yup.string().email().required("Email is required"),
  pickupZip: yup.string().required("Pickup zip is required"),
  deliveryZip: yup.string().required("Delivery zip is required"),
  totalPices: yup.string().required("Total pieces is required"),
  totalWeight: yup.number().required("Total weight is required"),
  question: yup.string().required("Question is required"),
});
