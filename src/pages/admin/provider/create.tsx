import Form from "@/components/form/Form";
import FormInput from "@/components/form/FormInput";
import FormInputNumber from "@/components/form/FormInputNumber";
import FormSelectField from "@/components/form/FormSelectField";
import FBreadCrumb from "@/components/ui/FBreadCrumb";
import {
  providerIMapProtocolOptions,
  providerProtocolOptions,
} from "@/constants/global";
import DashboardLayout from "@/layouts/DashboardLayout";
import {useCreateProviderMutation} from "@/rtk/features/api/providerApi";
import {createProviderRequestSchema} from "@/schemas/provider";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Col, Row, message} from "antd";
import {useRouter} from "next/navigation";
import React from "react";

const CreateProvidePage = () => {
  const [createProvider] = useCreateProviderMutation();
  const router = useRouter();

  const onSubmit = async (values: any) => {
    message.loading("Creating...");
    // console.log(values);
    try {
      const res = await createProvider(values).unwrap();
      if (res?.id) {
        message.success("Provider created successfully!");
        router.push("/admin/provider");
      }
    } catch (err: any) {
      console.error(err.message);
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
            label: "provider",
            link: "/admin/provider",
          },
        ]}
      />
      <h1 className="text-2xl font-medium my-2">Create Provider</h1>

      <div>
        <Form
          submitHandler={onSubmit}
          resolver={yupResolver(createProviderRequestSchema)}>
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
              Provider Information
            </p>
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}>
                <FormInput
                  type="text"
                  name="title"
                  size="large"
                  label="Title"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}>
                <FormInput type="text" name="host" size="large" label="HOST" />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}>
                <FormInputNumber name="port" size="large" label="PORT" />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}>
                <FormInput
                  type="text"
                  name="email"
                  size="large"
                  label="Email"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}>
                <FormInput
                  type="password"
                  name="password"
                  size="large"
                  label="Password"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}>
                <FormSelectField
                  size="large"
                  name="secure"
                  options={providerProtocolOptions}
                  label="Secure"
                  placeholder="Select"
                />
              </Col>

              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}></Col>
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
              IMap Options
            </p>
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}>
                <FormSelectField
                  size="large"
                  name="tls"
                  options={providerIMapProtocolOptions}
                  label="Protocol"
                  placeholder="Select"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}>
                <FormInputNumber
                  name="imap_port"
                  size="large"
                  label="IMap port"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}></Col>
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

export default CreateProvidePage;

CreateProvidePage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
