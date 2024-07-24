import {auth} from "../firebase";
import { FirebaseError } from "firebase/app";
import {sendPasswordResetEmail} from "firebase/auth";
import { useState } from "react";
import {Wrapper ,Title ,Form ,Input ,Error } from "../components/auth-components.tsx";

export default function RecoveryEmail(){
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const onChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
      const {target:{name, value}} = e; //효율적인 신택스
      if(name==="email"){
        setEmail(value)
      }
    }
    const onSubmit= async (e: React.ChangeEvent<HTMLFormElement>)=>{
      e.preventDefault();
      setError("");
      //try-catch
      //await
      if(isLoading || email==="") return;
      try{
        setLoading(true);
        sendPasswordResetEmail(auth, email);
        alert('The recovery email is sended');
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
        <Title>Account recovery</Title>
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
            type="submit" 
            value="Send the recovery email" 
          />
        </Form>
        {(error!=="") ? <Error>{error}</Error> : null }
      </Wrapper>
    )
}