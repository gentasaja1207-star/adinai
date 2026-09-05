"use client";
import {useState} from "react";
import {motion} from "framer-motion";

export default function Home(){
 const [input,setInput]=useState("");
 const [messages,setMessages]=useState([]);
 const [loading,setLoading]=useState(false);

 async function send(){
  if(!input.trim()||loading)return;
  const text=input;
  setMessages(x=>[...x,{r:"user",t:text}]);
  setInput("");
  setLoading(true);
  try{
   const res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:text})});
   const data=await res.json();
   setMessages(x=>[...x,{r:"ai",t:data?.choices?.[0]?.message?.content || data?.error || "Tidak ada respon"}]);
  }catch(e){setMessages(x=>[...x,{r:"ai",t:"Koneksi error: "+e.message}]);}
  setLoading(false);
 }
 return <main className="min-h-screen bg-black text-white p-8">
  <motion.div animate={{scale:[1,1.05,1]}} transition={{repeat:Infinity,duration:3}} className="mx-auto w-40 h-40 rounded-full border-4 border-cyan-400 flex items-center justify-center text-4xl">🤖</motion.div>
  <h1 className="text-5xl text-center mt-5 text-cyan-400">ADIN AI &lt;/&gt;</h1>
  <p className="text-center text-zinc-400">Online AI Companion</p>
  <div className="max-w-xl mx-auto mt-8 space-y-3">
   {messages.map((m,i)=><div key={i} className="bg-zinc-900 p-3 rounded">{m.r}: {m.t}</div>)}
   {loading&&<div className="text-cyan-400">🤖 ADIN thinking...</div>}
   <input className="bg-zinc-900 p-3 w-full rounded" value={input} onChange={e=>setInput(e.target.value)} placeholder="Chat with ADIN AI"/>
   <button className="border border-cyan-400 p-3 w-full rounded" onClick={send}>Send</button>
  </div>
 </main>
}
