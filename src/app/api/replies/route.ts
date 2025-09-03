// src/app/api/replies/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getAuth } from "@clerk/nextjs/server"; // ✅ 修改导入
export async function POST(req: NextRequest) {
  try {
    // 1️⃣ 获取当前登录用户
    const { userId } = getAuth(req); // ✅ 使用 getAuth 并传入 req
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ 获取请求体
    const body = await req.json();
    const { parentId, text } = body;

    if (!parentId || !text) {
      return NextResponse.json({ error: "Missing parentId or text" }, { status: 400 });
    }

    // 3️⃣ 查询用户信息（可选：获取用户名和头像）
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, avatarUrl: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    // 4️⃣ 创建回复
    const reply = await prisma.reply.create({
      data: {
        messageId: parentId,
        userId: user.id,
        userName: user.name || "Anonymous",
        avatarUrl: user.avatarUrl || "",
        text,
      },
    });

    return NextResponse.json(reply);
  } catch (error: any) {
    console.error("Failed to create reply:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}