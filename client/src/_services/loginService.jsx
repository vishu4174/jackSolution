import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";
export const loginService = {
  login,
  register,
};

function register(data) {
  return http.post(RouteUrls.register, data, false);
}

function login(data) {
  return http.post(RouteUrls.login, data, false);
}
