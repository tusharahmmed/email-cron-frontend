import React from "react";
import Form from "../form/Form";
import FormInput from "../form/FormInput";
import styles from "@/styles/ui/driver_request.module.scss";
import FormTextArea from "../form/FormTextArea";
import {yupResolver} from "@hookform/resolvers/yup";
import {driverRequestSchema} from "@/schemas/driver_request";
import {quoteRequestSchema} from "@/schemas/quote_request";
import {useCreateQuoteMutation} from "@/rtk/features/api/quoteApi";
import {message} from "antd";

const QuoteRequest = () => {
  const [createQuote, {isLoading}] = useCreateQuoteMutation();

  const onSubmit = async (data: any) => {
    console.log(data);

    message.loading("Submitting.....");
    try {
      const res = await createQuote(data).unwrap();
      if (res?.id) {
        message.success("Quotation submitted successfully");
      }
    } catch (err: any) {
      // console.error(err.message);
      message.error(err.message);
    }
  };

  return (
    <>
      <Form submitHandler={onSubmit} resolver={yupResolver(quoteRequestSchema)}>
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
          <FormInput name="pickupZip" label="Pickup zip" />
        </div>
        <div className={styles.inputWraper}>
          <FormInput name="deliveryZip" label="Delivery zip" />
        </div>
        <div className={styles.inputWraper}>
          <FormInput name="totalPices" label="Total pieces" />
        </div>
        <div className={styles.inputWraper}>
          <FormInput name="totalWeight" label="Total Weight, Ib" />
        </div>
        <div className={styles.inputWraper}>
          <FormTextArea
            name="question"
            label="Question"
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

export default QuoteRequest;
