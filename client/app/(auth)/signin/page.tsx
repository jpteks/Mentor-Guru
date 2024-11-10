import AuthWrapper from "@/components/AuthWrapper";
import FormLogin from "./form";


const SignIn = () => {


  return (
    <AuthWrapper
      title='Welcome Back'
      link='SignUp'
      text="Don't have an account?"
      href='/register'
    >
      <FormLogin />
    </AuthWrapper>
  );
};

export default SignIn;
