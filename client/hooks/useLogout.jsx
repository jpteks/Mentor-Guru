import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useLogout = () => {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const api_url = "/auth";

  const logout = async () => {
    setAuth({});
    try {
      await axiosPrivate.post(`${api_url}/logout`);
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
