import Swal from "sweetalert2";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

export const alertSuccess = (message) => {
  createToast(message, {
    type: "success",
    timeout: 3000,
    position: "top-right",
    showIcon: true,
    toastBackgroundColor: "#51e6a7",
  });
};

export const alertError = (message) => {
  createToast(message, {
    type: "danger",
    timeout: 3000,
    position: "top-right",
    showIcon: true,
    toastBackgroundColor: "#ff4560",
  });
};

export const confirmation = async (message, title = "Yakin?") => {
  return await Swal.fire({
    title: title,
    text: message,
    icon: "warning",
    buttons: true,
    showCancelButton: true,
    confirmButtonText: "Oke",
    cancelButtonText: "Batal",
    dangerMode: true,
  }).then((res) => {
    return res.isConfirmed;
  });
};
