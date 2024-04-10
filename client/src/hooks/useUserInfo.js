import { useContext } from "react";
import { UserInfoContext } from "../contexts/UserInfoContext.jsx";

export default function useUserInfo() {
  return useContext(UserInfoContext);
}
