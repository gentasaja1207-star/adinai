export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await fetch(
      "https://agentrouter.org/v1/chat/completions",
      {
        method:"POST",
        headers:{
          "Authorization":`Bearer ${process.env.AGENTROUTER_KEY}`,
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          model:"deepseek-v4-flash",
          messages:[
            {
              role:"system",
              content:"Kamu adalah ADIN AI coding assistant."
            },
            {
              role:"user",
              content:message
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log(data);

    return Response.json(data);

  } catch(error){
    return Response.json({
      error:error.message
    },{
      status:500
    });
  }
}
