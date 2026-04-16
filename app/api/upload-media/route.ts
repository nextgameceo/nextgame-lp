import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    const res = await fetch('https://media.microcms.io/api/v1/media', {
      method: 'POST',
      headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY! },
      body: uploadFormData,
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json({ url: data.url });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
