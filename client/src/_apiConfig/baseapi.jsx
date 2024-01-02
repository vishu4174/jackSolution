import axios from "axios";

export const environment = {
  Local: "Local",
  Test: "Test",
};

export const URLType = {
  Test: "http://192.168.189.97:3000/",
};

export default axios.create({
  baseURL: URLType.Test,
  environment: environment.Test,
});
