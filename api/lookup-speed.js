import OpenAI from 'openai'

export async function POST(request) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const subject = await request.text();
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{
      "role": "system",
      "content": `What is most commonly agreed to be the speed or top-speed related to the following subject: "${subject}"? Respond with only a numerical speed in kilometers per hour. Do not include any unit, commas, or words in your response. If you're not certain reply with your best guess, absolute accuracy is not as important as responding with a pure number.`
    }]
  });

  return new Response(String(completion.choices[0].message.content));
}
