import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/config"


export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const uploadData = await pinata.upload.file(file,{
        groupId: "0194713a-34e4-7e13-88bc-8a1ad9ef70ca"
    });
    const fileUrl= `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/files/${uploadData.cid}`;
    return NextResponse.json(fileUrl, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
