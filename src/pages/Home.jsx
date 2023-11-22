import { useContext } from "react";
import { UserContext } from "../context/userContext";
export default function Home() {
  const { user } = useContext(UserContext);
  return <div>{user.name.email}</div>;
}
