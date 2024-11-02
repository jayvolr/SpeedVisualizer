import OpenAI from 'openai'

export async function POST(request) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const subject = await request.text();
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{
      "role": "user",
      "content": `What is ${subject}'s top speed? Respond with only a numerical speed in km/h. Do not include any unit, commas, or words. If you're not certain reply with your best guess, absolute accuracy is not important.`
    }]
  });

  return new Response(String(completion.choices[0].message.content));
}
