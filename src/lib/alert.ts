import { isClient } from "@/helper/env";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

type ToastInstance = Notyf | undefined;

let toast = undefined as ToastInstance;
let successToast = (text: string) => {};
let infoToast = (text: string) => {};
let warningToast = (text: string) => {};
let errorToast = (text: string) => {};
if (isClient) {
  // Create an instance of Notyf
  toast = new Notyf({
    position: { x: "right", y: "top" },
    types: [
      {
        type: "info",
        background: "#22d3ee",
        icon: false,
      },
      {
        type: "warning",
        background: "#eab308",
        icon: false,
      },
    ],
  });

  successToast = function (text: string) {
    if (!toast) {
      return;
    }
    toast.dismissAll();
    const parsedText = typeof text === "string" ? text : "";
    if (parsedText.length) {
      toast.success(text);
    }
  };

  errorToast = function (text: string) {
    if (!toast) {
      return;
    }
    toast.dismissAll();
    const parsedText = typeof text === "string" ? text : "";
    if (parsedText.length) {
      toast.error(text);
    }
  };

  infoToast = function (text: string) {
    if (!toast) {
      return;
    }
    toast.dismissAll();
    const parsedText = typeof text === "string" ? text : "";

    if (parsedText.length) {
      toast.open({
        type: "info",
        message: text,
      });
    }
  };

  warningToast = function (text: string) {
    if (!toast) {
      return;
    }
    toast.dismissAll();
    const parsedText = typeof text === "string" ? text : "";
    if (parsedText.length) {
      toast.open({
        type: "warning",
        message: text,
      });
    }
  };
}

export { successToast, warningToast, infoToast, errorToast };
