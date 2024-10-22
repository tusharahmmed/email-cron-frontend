import {jwtDecode} from "jwt-decode";
import {useRouter} from "next/navigation";

export const decodedToken = (token: string) => {
  const router = useRouter();
  try {
    return jwtDecode(token);
  } catch (error) {
    localStorage.clear();
    router.replace("/login");
  }
};
