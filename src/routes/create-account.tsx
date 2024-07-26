import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "../firebase.ts";
import { FirebaseError } from "firebase/app";
import {Switcher, Wrapper ,Title ,Form ,Input ,Error } from "../components/auth-components.tsx";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    const {target:{name, value}} = e; //효율적인 신택스
    if(name==="name"){
      setName(value)
    } else if(name==="email"){
      setEmail(value)
    } else if(name==="password"){
      setPassword(value)
    }
  }
  const onSubmit= async (e: React.ChangeEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setError("");
    //try-catch
    //await
    if(isLoading || name==="" || email==="" || password==="") return;
    try{
      setLoading(true);
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, {displayName:name});
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
        <Title>Join X</Title>
        <Form onSubmit={onSubmit}>
          <Input
            onChange={onChange} 
            name="name" 
            value = {name} 
            placeholder="Name" 
            type="text" 
            required
          />
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
            value="Create Account" 
          />
        </Form>
        {(error!=="") ? <Error>{error}</Error> : null }
        <Switcher>
          Have an account? <Link to="/login">Log in &rarr;</Link>
        </Switcher>
        <Switcher>
          Forgot your password? <Link to="/recovery-email">go to send a recovery email &rarr;</Link>
        </Switcher>
      </Wrapper>
    );
  }

  //<Form onSubmit={onSubmit}>
  //어디부터 어디까지가 firebase인지, 내가 작성한 코드인지 알아야겠어