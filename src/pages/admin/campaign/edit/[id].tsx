import Form from "@/components/form/Form";
import FormEmailSelectField from "@/components/form/FormEmailSelectField";
import FormInput from "@/components/form/FormInput";
import FormInputNumber from "@/components/form/FormInputNumber";
import FormProviderField from "@/components/form/FormProviderField";
import FormSelectField from "@/components/form/FormSelectField";
import ActionBar from "@/components/ui/ActionBar";
import FBreadCrumb from "@/components/ui/FBreadCrumb";
import {
  providerIMapProtocolOptions,
  providerProtocolOptions,
} from "@/constants/global";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useGetCampaignDetailsQuery,
  useUpdateCampaignMutation,
} from "@/rtk/features/api/campaignApi";
import {
  useGetProviderDetailsQuery,
  useUpdateProviderMutation,
} from "@/rtk/features/api/providerApi";
import {updateCampaignRequestSchema} from "@/schemas/campaign";

import {updateProviderRequestSchema} from "@/schemas/provider";
import {ICampaignUser, IGenericErrorMessage} from "@/types";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Col, Row, message} from "antd";
import dynamic from "next/dynamic";
import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

const Editor = dynamic(() => import("@/components/form/FormEditor"), {
  ssr: false,
});

const EditCampaignPage = () => {
  const [email_body, set_email_body] = useState("");

  const router = useRouter();

  const id = router.query.id as string;

  const {data: defaultValues} = useGetCampaignDetailsQuery(id, {skip: !id});
  const [updateCampaign] = useUpdateCampaignMutation();

  useEffect(() => {
    set_email_body(defaultValues?.email_body);
  }, [defaultValues]);

  const onSubmit = async (values: any) => {
    values.email_body = email_body;

    // check email_body
    if (!email_body) {
      message.error("Email body is required");
      return;
    }
    const {status, provider, users, ...rest} = values;

    message.loading("Updating...");
    try {
      const res = await updateCampaign({id: id, body: rest}).unwrap();
      if (res?.id) {
        set_email_body("");
        message.success("Campaign updated successfully!");
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
      <ActionBar>
        <div></div>
        <div>
          <Link href="/admin/campaign">
            <Button type="primary">Back</Button>
          </Link>
        </div>
      </ActionBar>

      <div>
        <Form
          submitHandler={onSubmit}
          defaultValues={defaultValues}
          resolver={yupResolver(updateCampaignRequestSchema)}>
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
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditCampaignPage;

EditCampaignPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
