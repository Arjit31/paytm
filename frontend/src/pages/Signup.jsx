import { Heading } from '../components/Heading';
import { Subheading } from '../components/Subheading';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import { BottomWarning } from '../components/BottomWarning';
import { AuthWrapper } from '../components/AuthWrapper';
import axios from 'axios';
import { useState, useCallback } from 'react';


function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }, []);

  async function ClickHandler() {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', formData);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthWrapper>
      <Heading label="Sign Up" />
      <Subheading label="Please fill in this form to create an account." />

      <InputBox placeholder="John" label="First Name" type="text" id="firstName"
        value = {formData.firstName} onChange={handleChange} />
      <InputBox placeholder="Doe" label="Last Name" type="text" id="lastName"
        value = {formData.lastName} onChange={handleChange} />
      <InputBox placeholder="harkirat@gmail.com" label="Email" type="email" id="username"
        value = {formData.username} onChange={handleChange} />
      <InputBox placeholder="123456" label="Password" type="password" id="password"
        value = {formData.password} onChange={handleChange} />

      <div className='my-4 w-full'>
        <Button label="Sign Up" onClick={ClickHandler} />
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </AuthWrapper>
  );
}

export { Signup };