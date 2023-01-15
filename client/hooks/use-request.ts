import axios from 'axios';
import { useState } from 'react';

type Method = 'get' | 'post' | 'put' | 'delete';

type useRequestParameters = {
  url: string;
  method: Method;
  body?: any;
  onSuccess: (data: any) => void;
};
type ErrorFormat = {
  message: string;
  field?: string;
};

const useRequest = async <T>({
  url,
  method,
  body,
  onSuccess,
}: useRequestParameters) => {
  const [errors, setErrors] = useState<null | ErrorFormat[]>(null);
  const doRequest = async () => {
    try {
      const { data } = await axios[method]<T>(url, { ...body });
      onSuccess(data);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors(error.response?.data.errors);
      }
    }
  };
  return { errors, doRequest };
};

export default useRequest;
