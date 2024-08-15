// pages/api/PageContent/[id].ts

import { createClient } from "@supabase/supabase-js";
import { NextResponse, NextRequest } from "next/server";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: NextRequest) {
  // Extract ID from the request URL
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop() || '';

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  // Fetch data from Supabase by ID
  const { data, error } = await supabase
    .from("PageContent")
    .select("*")
    .eq("id", id)
    .single(); // Fetch a single row

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json(
      { error: `Data with ID ${id} not found` },
      { status: 404 }
    );
  }

  // Modify the data structure to match what the front-end expects
  const modifiedData = {
    id: data.id,
    Title: data.Title,
    Text1: data.Text1,
    Text2: data.Text2,
    Text3: data.Text3,
    Text4: data.Text4,
    Img1: data.Img1,
    Img2: data.Img2,
    Img3: data.Img3,
    Img4: data.Img4,
    Page: data.Page,
    Img1Small: data.Img1Small,
    Img2Small: data.Img2Small,
    Img3Small: data.Img3Small,
    Img4Small: data.Img4Small,
  };

  const response = NextResponse.json({ data: modifiedData });

  // Set cache control headers
  response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}
