import UpdateTweets from "../components/update-tweet-form"
import { styled } from "styled-components";
    
const Wrapper = styled.div`
margin-top: 10px;
`;

export default function Update(){
    return(
        <Wrapper>
            <UpdateTweets/>
        </Wrapper>
    )
}