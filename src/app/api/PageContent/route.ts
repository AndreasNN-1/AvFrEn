import { createClient } from "@supabase/supabase-js";
import { NextResponse, NextRequest } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: NextRequest) {
  const { data, error } = await supabase
    .from("PageContent")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Modify the data structure to match what the front-end expects
  const modifiedData = data.map((item) => ({
    id: item.id,
    Title: item.Title,
    Text1: item.Text1,
    Text2: item.Text2,
    Text3: item.Text3,
    Text4: item.Text4,
    Img1: item.Img1,
    Img2: item.Img2,
    Img3: item.Img3,
    Img4: item.Img4,
    Page: item.Page,
    Img1Small: item.Img1Small,
    Img2Small: item.Img2Small,
    Img3Small: item.Img3Small,
    Img4Small: item.Img4Small,
  }));

  const response = NextResponse.json({ data: modifiedData });
  
  // Set cache control headers
  response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');

  return response;
}
