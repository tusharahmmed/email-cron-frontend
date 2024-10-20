import * as yup from "yup";

export const createProviderRequestSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  host: yup.string().required("Host is required"),
  port: yup.number().required("Port is required"),
  secure: yup.boolean().required("Secure is required"),
  tls: yup.boolean().required("Tls is required"),
  imap_port: yup.number().required("imap_port is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});
export const updateProviderRequestSchema = yup.object().shape({
  title: yup.string().optional(),
  host: yup.string().optional(),
  port: yup.number().optional(),
  secure: yup.boolean().optional(),
  tls: yup.boolean().optional(),
  imap_port: yup.number().optional(),
  email: yup.string().email().optional(),
  password: yup.string().optional(),
});
