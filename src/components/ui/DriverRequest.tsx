import React from "react";
import Form from "../form/Form";
import FormInput from "../form/FormInput";
import styles from "@/styles/ui/driver_request.module.scss";
import FormTextArea from "../form/FormTextArea";
import {yupResolver} from "@hookform/resolvers/yup";
import {driverRequestSchema} from "@/schemas/driver_request";
import {useCreateDriverRequestMutation} from "@/rtk/features/api/driverApi";
import {message} from "antd";

const DriverRequest = () => {
  const [createDriverRequest, {isLoading}] = useCreateDriverRequestMutation();

  const onSubmit = async (data: any) => {
    console.log(data);

    message.loading("Submitting.....");
    try {
      const res = await createDriverRequest(data).unwrap();
      if (res.id) {
        message.success("Application submited successfully");
      }
    } catch (err: any) {
      // console.error(err.message);
      message.error(err.message);
    }
  };

  return (
    <>
      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(driverRequestSchema)}>
        <h3 className={styles.formTitle}>Or submit your resume today!</h3>
        <div className={styles.inputWraper}>
          <FormInput name="name" label="Name" placeholder="Ruslana Polonska" />
        </div>
        <div className={styles.inputWraper}>
          <FormInput name="serName" label="Surname" />
        </div>
        <div className={styles.inputWraper}>
          <FormInput name="phone" label="Phone" />
        </div>
        <div className={styles.inputWraper}>
          <FormInput type="email" name="email" label="Email" />
        </div>
        <div className={styles.inputWraper}>
          <FormInput name="truckType" label="Truck type" />
        </div>
        <div className={styles.inputWraper}>
          <FormTextArea
            name="truckDescription"
            label="Instead of questions - Truck Description"
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque integer nunc in adipiscing. Blandit nibh leo mattis fermentum, vitae cursus est. Tincidunt nibh vitae ut odio consequat."
            rows={4}
          />
        </div>
        <div className={styles.submit}>
          <button disabled={isLoading} type="submit">
            Sent
          </button>
        </div>
      </Form>
    </>
  );
};

export default DriverRequest;
