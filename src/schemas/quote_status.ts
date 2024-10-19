import * as yup from "yup";

export const quoteStatusSchema = yup.object().shape({
  status: yup.string().required("status is required"),
});
