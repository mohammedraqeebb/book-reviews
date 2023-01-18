import axios from 'axios';

const buildClient = (appContext: any) => {
  if (typeof window === 'undefined') {
    return axios.create({
      headers: appContext.ctx.req.headers,
    });
  } else {
    return axios.create({});
  }
};

export default buildClient;
