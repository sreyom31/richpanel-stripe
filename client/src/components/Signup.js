import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from 'react-toastify';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";

const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const navigate = useNavigate();
  const [signupState,setSignupState]=useState(fieldsState);

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(signupState)
    createAccount()
  }

  //handle Signup API Integration here
  const createAccount= async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, signupState)
      if(res.data) {
        console.log(res.data);

        localStorage.setItem("User", JSON.stringify(res.data.user));
        localStorage.setItem("Token", String(res.data.tokens.access.token));
        toast.success("Registered successfully.");
        navigate("/");
    }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong.")
    }
  }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>
      </form>
      
    )
}