import Form from "@/components/form/Form";
import FormInput from "@/components/form/FormInput";
import FBreadCrumb from "@/components/ui/FBreadCrumb";
import DashboardLayout from "@/layouts/DashboardLayout";
import {createCampaignRequestSchema} from "@/schemas/campaign";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Col, Row, message} from "antd";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import dynamic from "next/dynamic";
import FormProviderField from "@/components/form/FormProviderField";
import FormEmailSelectField from "@/components/form/FormEmailSelectField";
import {useCreateCampaignMutation} from "@/rtk/features/api/campaignApi";
import {IGenericErrorMessage} from "@/types";

const Editor = dynamic(() => import("@/components/form/FormEditor"), {
  ssr: false,
});

const CreateCampaignPage = () => {
  const [createCampaign] = useCreateCampaignMutation();
  const router = useRouter();

  const [email_body, set_email_body] = useState("");

  const onSubmit = async (values: any) => {
    values.email_body = email_body;

    // check email_body
    if (!email_body) {
      message.error("Email body is required");
      return;
    }
    // check
    message.loading("Creating...");

    // console.log(values);
    try {
      const res = await createCampaign(values).unwrap();
      if (res?.id) {
        set_email_body("");
        message.success("Campaign created successfully!");
        router.push("/admin/campaign");
      }
    } catch (err: any) {
      if (err.errorMessages) {
        err.errorMessages?.map((item: IGenericErrorMessage) => {
          message.error(item.message);
        });
      } else {
        message.error(err.message);
      }
    }
  };

  return (
    <div>
      <FBreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
          {
            label: "campaign",
            link: "/admin/campaign",
          },
        ]}
      />
      <h1 className="text-2xl font-medium my-2">Create Campaign</h1>

      <div>
        <Form
          submitHandler={onSubmit}
          resolver={yupResolver(createCampaignRequestSchema)}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}>
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}>
              Campaign Information
            </p>
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
              <Col
                className="gutter-row"
                span={8}
                md={12}
                style={{
                  marginBottom: "10px",
                }}>
                <FormInput
                  type="text"
                  name="name"
                  size="large"
                  label="Campaign Name"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                md={12}
                style={{
                  marginBottom: "10px",
                }}>
                <FormProviderField name="provider_id" label="Provider" />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                md={24}
                style={{
                  marginBottom: "10px",
                }}>
                <FormInput
                  type="text"
                  name="subject"
                  size="large"
                  label="Subject"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                md={24}
                style={{
                  marginBottom: "10px",
                }}>
                <Editor
                  name="email_body"
                  label="Body"
                  value={email_body}
                  setValue={set_email_body}
                />
              </Col>
            </Row>
          </div>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}>
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}>
              Campaign User
            </p>
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
              <Col
                className="gutter-row"
                span={8}
                md={24}
                style={{
                  marginBottom: "10px",
                }}>
                <FormEmailSelectField
                  size="large"
                  name="emails"
                  label="Emails"
                  placeholder="Select"
                />
              </Col>
            </Row>
          </div>

          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateCampaignPage;

CreateCampaignPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
