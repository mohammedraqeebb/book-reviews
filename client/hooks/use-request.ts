import axios from 'axios';
import { useState } from 'react';
import * as React from 'react';
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

const useRequest = <T>({
  url,
  method,
  body,
  onSuccess,
}: useRequestParameters) => {
  const [errors, setErrors] = useState<null | ErrorFormat[]>(null);
  const doRequest = async () => {
    let cancel;
    try {
      const { data } = await axios[method]<T>(
        url,
        {
          ...body,
        },
        { withCredentials: true }
      );
      console.log('succesfull');
      onSuccess(data);
      return data;
    } catch (axiosError) {
      if (axios.isCancel(axiosError)) {
        return;
      }

      if (axios.isAxiosError(axiosError)) {
        //@ts-ignore
        setErrors(axiosError.response?.data.errors as ErrorFormat[]);
      }
      setTimeout(() => {
        setErrors(null);
      }, 5000);
    }
  };
  return { errors, doRequest };
};

export default useRequest;
