import { AuthWrapper } from "../components/AuthWrapper";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Subheading } from "../components/Subheading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";


function Signin() {
  return (
    <AuthWrapper>
      <Heading label="Sign In" />
      <Subheading label="Please fill in this form to sign in." />
      <InputBox placeholder="harkirat@gmail.com" label={"Email"} type={"email"}/>
      <InputBox placeholder="123456" label={"Password"} type={"password"}/>
      <div className='my-4 w-full'>
        <Button label="Sign In" />
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </AuthWrapper>
  );
}

export {Signin};