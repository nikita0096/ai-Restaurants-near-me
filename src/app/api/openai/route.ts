import OpenAI from "openai";
import {NextResponse} from "next/server";

export const runtime = "nodejs"; // обязательно!

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const cache = new Map();

export async function POST(req: Request) {
  try {
    const {prompt, zipCode} = await req.json();
    console.log(cache)
    if (cache.has(prompt)) {
      return NextResponse.json(cache.get(prompt));
    } else {
      const response = await client.responses.create({
        model: "gpt-4o-mini",
        tools: [
          {type: "web_search"},
        ],
        input: prompt,
      });


      cache.set(zipCode, response.output_text);

      return NextResponse.json(response.output_text);
    }

  } catch (err) {
    console.error("OpenAI API error:", err);
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}

export async function GET() {
  try {
    const result = cacheDecoder(cache);
    console.log(result)
    const res = [{
      zipCode: '98036',
      info: {
        name: "Washington Burrito",
        address: "19509 44th Avenue West, Lynnwood, WA 98036",
        rating: "4.5",
        cuisines: ["Mexican", "Latin American", "New Mexican"],
        url: "https://www.google.com/maps/place/Washington+Burrito",
        img: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=PHOTO_REFERENCE&key=YOUR_API_KEY"
      }
    }]
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}

function cacheDecoder(map: Map<string, string>) {
  const newCache = [];

  for (const [key, value] of map.entries()) {
    newCache.push({
      zipCode: key,
      info: JSON.parse(value).restaurants,
    })
  }

  return newCache;
}
