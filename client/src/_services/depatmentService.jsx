import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";
export const departmentService = {
  getAllDepartment,
  createDepartment,
  editDepartment,
  deleteDepartment,
};

function getAllDepartment() {
  return http.get(RouteUrls.getAllDepartment, true);
}

function createDepartment(data) {
  return http.post(RouteUrls.getAllDepartment, data, true);
}

function editDepartment(data, id) {
  return http.update(`${RouteUrls.getAllDepartment}/${id}`, data, true);
}

function deleteDepartment(id) {
  return http.remove(`${RouteUrls.getAllDepartment}/${id}`, true);
}
