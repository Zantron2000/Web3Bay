import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import FormData from "form-data";
import rfs from "recursive-fs";
import basePathConverter from "base-path-converter";
import got from "got";
const JWT =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmZGFlNzM5MS05OWY5LTQxMTAtOTQyNy1jMzliMzFlN2NjM2QiLCJlbWFpbCI6InhhbmRlcnBhbG1lcjdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjI5ZjIwZjJmODJiNmM0OGFhZjZkIiwic2NvcGVkS2V5U2VjcmV0IjoiZTI0MmQ2Mzg1MTUyMzc4ZjBkYjk5N2FjYThiYTUzYmRhM2JjYjBhZWI5ZDQ5Mzc1ODAzOTdhNDBkYTdjMTFlYSIsImlhdCI6MTY5NTQ3MjI5OX0.jaulMnkRjwf3bq-5xJIVmH9oVs5q9GHTsdgLUqgTi28";

let running = false;

/**
 *
 * @param {NextRequest} request
 */
export async function GET(request) {
  if (running) {
    return new Response("Already running", { status: 200 });
  } else {
    running = true;
  }

  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const src = "./build";
  var status = 0;
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
