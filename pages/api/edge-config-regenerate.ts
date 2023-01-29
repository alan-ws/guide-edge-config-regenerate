import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
  regions: ["iad1"],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextRequest) => {
  const url = `${process.env.VERCEL_BASE_URL}${process.env.EDGE_CONFIG_ID}`;
  try {
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AUTHORIZATION_BEARER}`,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
