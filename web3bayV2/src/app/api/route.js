import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import FormData from "form-data";
import rfs from "recursive-fs";
import basePathConverter from "base-path-converter";
import got from "got";
const JWT = `Bearer ${process.env.PINATA_JWT}`;

let running = true;

/**
 *
 * @param {NextRequest} request
 */
export async function GET(request) {
  if (running) {
    console.log(JWT);
    return new Response("Already running", { status: 200 });
  } else {
    running = true;
  }

  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const src = "./build";

  try {
    const { dirs, files } = await rfs.read(src);
    let data = new FormData();
    for (const file of files) {
      data.append(`file`, fs.createReadStream(file), {
        filepath: basePathConverter(src, file),
      });
    }
    const response = await got(url, {
      method: "POST",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        Authorization: JWT,
      },
      body: data,
    }).on("uploadProgress", (progress) => {
      console.log(progress);
    });

    running = false;
    return NextResponse.json({ data: JSON.parse(response.body) });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
