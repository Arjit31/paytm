import { Heading } from '../components/Heading';
import { Subheading } from '../components/Subheading';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import { BottomWarning } from '../components/BottomWarning';
import { AuthWrapper } from '../components/AuthWrapper';
import axios from 'axios';

const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

function ClickHandler() {
  axios.post('http://localhost:5000/api/v1/user/signup', {
    firstName,
    lastName,
    email,
    password
  }).then(res => {
    console.log(res.data);
  }).catch(err => {
    console.error(err);
  })
}
function Signup() {

  return (
    <AuthWrapper>
      <Heading label="Sign Up" />
      <Subheading label="Please fill in this form to create an account." />
      <InputBox placeholder="John" label={"First Name"} type={"text"}
        onChange={(e) => setFirstName(e.target.value)} />
      <InputBox placeholder="Doe" label={"Last Name"} type={"text"}
        onChange={e => setLastName(e.target.value)} />
      <InputBox placeholder="harkirat@gmail.com" label={"Email"} type={"email"}
        onChange={e => setEmail(e.target.value)} />
      <InputBox placeholder="123456" label={"Password"} type={"password"}
        onChange={e => setPassword(e.target.value)} />
      <div className='my-4 w-full'>
        <Button label="Sign Up" onClick={ClickHandler} />
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </AuthWrapper>
  );
}

export { Signup };