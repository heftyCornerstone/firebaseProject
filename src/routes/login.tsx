import { useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import {auth} from "../firebase.ts";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import {Switcher, Wrapper ,Title ,Form ,Input ,Error } from "../components/auth-components.tsx";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    const {target:{name, value}} = e; //효율적인 신택스
    if(name==="name"){
    } else if(name==="email"){
      setEmail(value)
    } else if(name==="password"){
      setPassword(value)
    }
  };
  
  const onSubmit= async (e: React.ChangeEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setError("");
    //try-catch
    //await
    if(isLoading || email==="" || password==="") return;
    try{
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch(e){
      //catch an error
      if(e instanceof FirebaseError){
        setError(e.message);
      }
    } finally{ 
      setLoading(false)
    }
  }

    return (
    <Wrapper>
        <Title>Log into X</Title>
        <Form onSubmit={onSubmit}>
          <Input
            onChange={onChange} 
            name="email" 
            value ={email} 
            placeholder="Email" 
            type="email" 
            required
          />
          <Input
            onChange={onChange} 
            name="password" 
            value ={password} 
            placeholder="Password" 
            type="password" 
            required
          />
          <Input 
            type="submit" 
            value="Log in" 
          />
        </Form>
        {(error!=="") ? <Error>{error}</Error> : null }
        <Switcher>
          Don't have an account? <Link to="/create-account">Create one &rarr;</Link>
        </Switcher>
        <Switcher>
          Forgot your password? <Link to="/recovery-email">go to send a recovery email &rarr;</Link>
        </Switcher>
      </Wrapper>
    );
  }