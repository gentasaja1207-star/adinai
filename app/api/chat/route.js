export async function POST(req){
 const {message}=await req.json();

 const r=await fetch("https://agentrouter.org/v1/chat/completions",{
  method:"POST",
  headers:{
   "Authorization":`Bearer ${process.env.AGENTROUTER_KEY}`,
   "Content-Type":"application/json"
  },
  body:JSON.stringify({
   model:"gpt-5",
   messages:[
    {role:"system",content:"You are ADIN AI, a friendly coding and creative assistant."},
    {role:"user",content:message}
   ]
  })
 });

 return Response.json(await r.json());
}