import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadFormData = new FormData();
    const blob = new Blob([buffer], { type: file.type });
    uploadFormData.append('file', blob, file.name);

    const res = await fetch(
      `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/media`,
      {
        method: 'POST',
        headers: {
          'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY!,
        },
        body: uploadFormData,
      }
    );

    const responseText = await res.text();
    console.log('microCMS status:', res.status);
    console.log('microCMS response:', responseText);

    if (!res.ok) {
      return NextResponse.json({ error: responseText }, { status: 500 });
    }

    const data = JSON.parse(responseText);
    return NextResponse.json({ url: data.url });
  } catch (e) {
    console.error('upload error:', String(e));
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
