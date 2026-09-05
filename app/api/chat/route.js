export async function POST(req) {
  try {
    const { message, model = "deepseek-v4-flash" } = await req.json();

    if (!message) return Response.json({ error: "Message kosong" }, { status: 400 });

    const response = await fetch("https://agentrouter.org/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AGENTROUTER_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: "You are ADIN AI, a helpful coding assistant. Answer clearly." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    if (!response.ok) return Response.json({ error: data.error?.message || "API error", raw:data }, {status:response.status});
    return Response.json(data);
  } catch(e) {
    return Response.json({error:e.message},{status:500});
  }
}
