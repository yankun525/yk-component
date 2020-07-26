import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);
axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
axios.interceptors.response.use((response) => {
  const { data = {}, status, statusText } = response;
  let message;

  if (data.code) {
    // Create an unified error code in constant case.
    // For example: unknown-error => UNKNOWN_ERROR
    data.CODE = data.code
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/\W+/g, '_')
      .toUpperCase();
  }

  if (status >= 200 && status < 300) {
    if (data.code !== 'success') {
      ({ message } = data);
    }
  } else {
    message = data.message || statusText;
  }

  if (message) {
    const error = new Error(message);

    error.code = data.code;
    error.CODE = data.CODE;
    error.data = data.data;
    error.response = response;
    throw error;
  }

  return data;
});

export default axios;
