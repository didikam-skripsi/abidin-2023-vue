import jwtDecode from "jwt-decode";

export const getToken = () => {
  let token = localStorage.getItem("gostarter_token") || null;
  return token;
};

export const getAuthUser = () => {
  let token = getToken();
  return token ? jwtDecode(token).user : null;
};

export const checkRoles = (roles) => {
  return roles.includes(getAuthUser()?.role);
};

export const checkPermission = (permissions, reqAccess) => {
  return permissions.includes(reqAccess);
};

export const checkPermissions = (permissions, reqAccess) => {
  let valid = false;
  reqAccess.forEach((access) => {
    if (permissions.includes(access)) {
      valid = true;
    }
  });

  return valid;
};

export const isTokenExpired = () => {
  let token = getToken();
  if (!token) return true;
  const decodedToken = jwtDecode(token);
  const expirationTime = decodedToken.exp * 1000;
  const is_expired = Date.now() >= expirationTime;
  // const currentTime = new Date(Date.now());
  // const expirationDate = new Date(decodedToken.exp*1000);
  if (is_expired) {
    localStorage.removeItem("gostarter_token");
  }
  return is_expired;
};

export const logout = () => {
  localStorage.removeItem("gostarter_token");
  window.location.href = "/";
};
