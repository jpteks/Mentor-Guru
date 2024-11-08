import { backendApi } from "@/app/constant";
import { useAuth } from "@/lib/store";
import { verifyToken } from "@/utils/verifyToken";

const useRefreshToken = () => {
  const api_url = "/auth";

  const setAuth = useAuth(state => state.setAuth);
  const refresh = async () => {
    const response = await backendApi.get(`${api_url}/refresh-token`, {
      withCredentials: true,
    });

    const payload = verifyToken(response.data?.accessToken);

    setAuth({
      role: payload?.role as string,
      accessToken: response.data?.accessToken,
      id: payload?.id as string,
    });
    return response.data?.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
