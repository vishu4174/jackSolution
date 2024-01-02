import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";
export const employeeService = {
  getAllEmployee,
  createEmployee,
  editEmployee,
  deleteEmployee,
  filterEmployee,
};

function getAllEmployee() {
  return http.get(RouteUrls.getAllEmployee, true);
}

function createEmployee(data) {
  return http.post(RouteUrls.getAllEmployee, data, true);
}

function editEmployee(data, id) {
  return http.update(`${RouteUrls.getAllEmployee}/${id}`, data, true);
}

function deleteEmployee(id) {
  return http.remove(`${RouteUrls.getAllEmployee}/${id}`, true);
}

function filterEmployee(data) {
  return http.post(RouteUrls.filterEmployee, data, true);
}
