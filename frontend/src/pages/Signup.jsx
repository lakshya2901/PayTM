import { BottomWarning } from "../components/BottomWarning"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { Subheading} from "../components/Subheading"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export function Signup(){
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
    return(
        
        <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading title = {"Sign up"} />
            <Subheading label = {"Enter your information to create an account"} />

            <InputBox onChange = {(e) =>{
              setFirstName(e.target.value);
            }} label = {"First name"} placeholder = {"Lakshya"}/>

            <InputBox onChange = {(e) =>{
              setLastName(e.target.value);
            }} label = {"Last name"} placeholder = {"Babel"}/>

            <InputBox onChange = {(e) =>{
              setUsername(e.target.value);
            }} label = {"Email"} placeholder = {"Lakshyababel@gmail.com"}/>

            <InputBox onChange = {(e) =>{
              setPassword(e.target.value);
            }} label = {"Password"} placeholder = {"123456"}/>
            
            <Button onClick={
              async ()=>{
                
                  const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
                  firstName,
                  lastName,
                  username,
                  password
                })
              localStorage.setItem("token", res.data.token)
              navigate("/dashboard")
            }
            } label = {"sign up"} />
            <BottomWarning label = {"Alredy have an account?"} buttonText={"Sign in"} to = {"./signin"}/>
      </div>
    </div>
  </div>
    )
}