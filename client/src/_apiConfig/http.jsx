import api from "../../src/_apiConfig/baseapi";
import { ApiResponse } from "../../src/_apiConfig/api.response";

export const http = {
  get,
  post,
  logout,
  update,
  remove,
};

function get(routeUrl, isToken) {
  return new Promise((resolve) => {
    return api
      .get(routeUrl, { headers: getHeaders(isToken) })
      .then((res) => {
        resolve(res.data);
      })
      .catch(function (err) {
        console.log(err, "errr");
        try {
          if (err.response.status === 401) {
            logout();
          }
          resolve(
            ApiResponse(
              false,
              err.response.data.Message,
              err.response.data.error
            )
          );
        } catch (err) {
          throw err;
        }
      });
  });
}

function post(routeUrl, formdata, isToken) {
  return new Promise((resolve) => {
    return api
      .post(routeUrl, formdata, { headers: getHeaders(isToken) })
      .then((res) => {
        resolve(res.data);
      })
      .catch(function (err) {
        try {
          if (err.response.status === 401) {
            logout();
          }
          resolve(
            ApiResponse(
              false,
              err.response.data.Messsage,
              err.response.data.error,
              0
            )
          );
        } catch (err) {
          throw err;
        }
      });
  });
}

function update(routeUrl, formdata, isToken) {
  return new Promise((resolve) => {
    return api
      .put(routeUrl, formdata, { headers: getHeaders(isToken) })
      .then((res) => {
        resolve(res.data);
      })
      .catch(function (err) {
        try {
          if (err.response.status === 401) {
            logout();
          }
          resolve(
            ApiResponse(
              false,
              err.response.data.Messsage,
              err.response.data.error,
              0
            )
          );
        } catch (err) {
          throw err;
        }
      });
  });
}

function remove(routeUrl, isToken) {
  return new Promise((resolve) => {
    return api
      .delete(routeUrl, { headers: getHeaders(isToken) })
      .then((res) => {
        resolve(res.data);
      })
      .catch(function (err) {
        try {
          if (err.response.status === 401) {
            logout();
          }
          resolve(
            ApiResponse(
              false,
              err.response.data.Messsage,
              err.response.data.error,
              0
            )
          );
        } catch (err) {
          throw err;
        }
      });
  });
}

function logout() {
  localStorage.removeItem("token");
  setTimeout(() => {
    // window.location.href = "/";
  }, 100);
}

function getHeaders(boolToken) {
  if (boolToken) {
    const userdata = localStorage.getItem("token");
    if (userdata) {
      return {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: userdata,
      };
    } else {
      window.location = "/";
    }
  } else {
    return { Accept: "application/json", "Content-Type": "application/json" };
  }
}
