export async function callGrok(prompt) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();
  
  if (data?.choices?.[0]?.message?.content) {
    return data.choices[0].message.content;
  } else if (data?.error) {
    return "API Error: " + JSON.stringify(data.error);
  }
  return JSON.stringify(data);
}