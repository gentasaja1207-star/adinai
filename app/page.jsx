
"use client";
import {useState} from "react";
import {motion} from "framer-motion";

export default function Home(){
 const [input,setInput]=useState("");
 const [messages,setMessages]=useState([]);

 async function send(){
  const text=input;
  if(!text)return;
  setMessages(x=>[...x,{r:"user",t:text}]);
  setInput("");

  const res=await fetch("/api/chat",{
   method:"POST",
   headers:{"Content-Type":"application/json"},
   body:JSON.stringify({message:text})
  });

  const data=await res.json();

  setMessages(x=>[...x,{
   r:"ai",
   t:data?.choices?.[0]?.message?.content || data?.message || data?.error || JSON.stringify(data)
  }]);
 }

 return <main className="min-h-screen bg-black text-white p-8">
  <motion.img
   src="/avatar/adin.png"
   className="w-40 h-40 rounded-full mx-auto border-4 border-cyan-400"
   animate={{y:[0,-10,0]}}
   transition={{repeat:Infinity,duration:3}}
  />
  <h1 className="text-5xl text-center mt-5 text-cyan-400">ADIN AI &lt;/&gt;</h1>
  <div className="max-w-xl mx-auto mt-8">
   {messages.map((m,i)=><p key={i}>{m.r}: {m.t}</p>)}
   <input className="bg-zinc-900 p-3 w-full mt-5" value={input} onChange={e=>setInput(e.target.value)}/>
   <button className="border p-3 mt-3" onClick={send}>Send</button>
  </div>
 </main>
}
