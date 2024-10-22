import * as yup from "yup";

export const createCampaignRequestSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  subject: yup.string().required("Subject is required"),
  // email_body: yup.string().required("Content is required"),
  provider_id: yup.string().required("Provider is required"),
  emails: yup.array(yup.string()).required("emails is required"),
});
export const updateCampaignRequestSchema = yup.object().shape({
  name: yup.string().optional(),
  subject: yup.string().optional(),
  // email_body: yup.string().optional(),
  provider_id: yup.string().optional(),
  emails: yup.array(yup.string()).optional(),
});
