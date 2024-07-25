import { collection, doc, onSnapshot, orderBy, query, limit } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";

export interface ITweet {
    id:string;
    photo?:string;
    tweet:string;
    userId:string;
    userName:string;
    createdAt:number;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  overflow-y: scroll;
`;

export default function Timeline(){
    const [tweets, setTweets] = useState<ITweet[]>([]);
    //데이터 쿼리
    let unsubscribe: Unsubscribe | null = null;
    const docc = doc(db, "tweets", "4D8IYJZN6euzRDNq86Ni");
    console.log('success', docc);
    useEffect(()=>{
        const fetchTweets = async()=>{
            const tweetsQuery = query(
                collection(db, "tweets"), 
                orderBy("createdAt", "desc"),
                limit(25)
            );
            unsubscribe = await onSnapshot(tweetsQuery, (snapshot)=>{ 
                const tweets =  snapshot.docs.map((doc)=>{
                    const {tweet, createdAt, userId, userName, photo} = doc.data();
                    return {
                        tweet,
                        createdAt,
                        userId,
                        userName,
                        photo,
                        id: doc.id,
                    }
                    
                })
                setTweets(tweets);
            })
        };
        fetchTweets();
        return () => {
            unsubscribe && unsubscribe();
        };
    }, []);
    return (
        <Wrapper>
            {tweets.map((tweet) => (
                <Tweet key={tweet.id} {...tweet} />
            ))}
        </Wrapper>
    )
}