import { notifications } from "@mantine/notifications";
import classes from "./Demo.module.css";

function basicNotification() {
  const basicNotification = (title, message, color) => {
    notifications.show({
      withBorder: true,
      autoclose: 5000,
      radius: "xs",
      title: title,
      message: message,
      color: color,
    });
  };
  return basicNotification;
}

function alterNotification() {
  const alterNotification = (title, message, color) => {
    notifications.show({
      title: title,
      message: message,
      color: color,
      classNames: classes,
    });
  };
  return alterNotification;
}

export { basicNotification, alterNotification };
