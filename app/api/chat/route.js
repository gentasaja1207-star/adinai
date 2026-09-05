
export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await fetch(
      "https://agentrouter.org/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.AGENTROUTER_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role:"system", content:"You are ADIN AI, a friendly coding assistant." },
            { role:"user", content:message }
          ]
        })
      }
    );

    return Response.json(await response.json());
  } catch(e) {
    return Response.json({error:e.message},{status:500});
  }
}
