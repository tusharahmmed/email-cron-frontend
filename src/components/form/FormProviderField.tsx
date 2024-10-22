import FormSelectField, {SelectOptions} from "./FormSelectField";
import {IProvider} from "@/types";
import {useGetAllProvidersQuery} from "@/rtk/features/api/providerApi";

type IProps = {
  name: string;
  label: string;
};

const FormProviderField = ({name, label}: IProps) => {
  const {data, isLoading} = useGetAllProvidersQuery({
    limit: 100,
    page: 1,
  });
  const providers = data?.providers;
  const providerOptions = providers?.map((provider: IProvider) => {
    return {
      label: provider?.title,
      value: provider?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={providerOptions as SelectOptions[]}
    />
  );
};

export default FormProviderField;
