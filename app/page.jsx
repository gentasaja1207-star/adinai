"use client";
import {useState} from "react";
import {motion} from "framer-motion";

export default function Home(){
 const [msg,setMsg]=useState("");
 const [chat,setChat]=useState([]);

 async function send(){
  setChat([...chat,{u:msg}]);
  const r=await fetch("/api/chat",{
   method:"POST",
   headers:{"Content-Type":"application/json"},
   body:JSON.stringify({message:msg})
  });
  const d=await r.json();
  setChat(c=>[...c,{a:d.choices?.[0]?.message?.content||"ADIN offline"}]);
  setMsg("");
 }

 return <main className="min-h-screen bg-black text-white p-6">
  <motion.h1 initial={{opacity:0}} animate={{opacity:1}}
  className="text-5xl font-bold text-cyan-400 text-center">
   ADIN AI &lt;/&gt;
  </motion.h1>

  <div className="flex gap-6 mt-10">
   <motion.div animate={{y:[0,-10,0]}} transition={{repeat:Infinity,duration:3}}
   className="w-1/3 bg-zinc-900 rounded-3xl p-5 text-center">
    <img src="/avatar/adin.png" className="mx-auto"/>
    <h2>ADIN AI</h2>
    <p>Online AI Companion</p>
   </motion.div>

   <div className="flex-1 bg-zinc-900 rounded-3xl p-5">
    {chat.map((x,i)=><div key={i} className="my-3">
      {x.u&&<p>👤 {x.u}</p>}
      {x.a&&<p>🤖 {x.a}</p>}
    </div>)}

    <input className="w-full bg-black p-3 rounded"
    value={msg} onChange={e=>setMsg(e.target.value)}
    placeholder="Chat with ADIN AI"/>

    <button onClick={send}
    className="mt-3 px-5 py-2 border rounded">
    Send
    </button>
   </div>
  </div>
 </main>
}