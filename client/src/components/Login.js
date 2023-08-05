import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginFields } from '../constants/formFields';
import axios from 'axios';
import { toast } from 'react-toastify';
import FormAction from './FormAction';
import FormExtra from './FormExtra';
import Input from './Input';

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ''));

export default function Login() {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  //Handle Login API Integration here
  const authenticateUser = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        loginState
      );
      if (res.data) {
        console.log(res.data);

        localStorage.setItem('User', JSON.stringify(res.data.user));
        localStorage.setItem('Token', String(res.data.tokens.access.token));
        toast.success('Logged in successfully.');
        navigate('/subscription')
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong.');
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
