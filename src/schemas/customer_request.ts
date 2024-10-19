import * as yup from "yup";

export const customerRequestSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  serName: yup.string().required("Surname is required"),
  phone: yup.string().required("Phone is required"),
  email: yup.string().email().required("Email is required"),
  mcNumber: yup.string().required("MC/FF Number is required"),
  loadDescription: yup.string().required("Load Description is required"),
});
