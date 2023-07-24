import Swal from "sweetalert2";
import { isTokenExpired } from "@/utils/auth";

export function auth({ router }) {
  if (isTokenExpired()) {
    Swal.fire({
      title: "401!",
      text: "Unauthorized",
      icon: "error",
      confirmButtonText: "Oke",
    })
    return router.push({ name: "auth.login" });
  }
  return true;
}

export function no_auth({ router }) {
  if (!isTokenExpired()) {
    return router.push({ name: 'admin.dashboard' });
  }
  return true;
}