import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
export const runtime = 'edge';
// ------------------------
// 获取所有留言
// ------------------------
export async function GET(req: NextRequest) {
  const { userId: currentUserId } = getAuth(req) ?? {};

  try {
    const messages = await prisma.message.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: "desc" },
      include: {
        likes: true,
        replies: {
          where: { isDeleted: false },
          orderBy: { createdAt: "asc" }, // 回复按时间升序
          include: { likes: true },
        },
      },
    });

    const result = messages.map((msg) => ({
      id: msg.id,
      userId: msg.userId,
      userName: msg.userName,
      avatarUrl: msg.avatarUrl ?? null,
      text: msg.text,
      createdAt: msg.createdAt.toISOString(),
      updatedAt: msg.updatedAt.toISOString(),
      likeCount: msg.likes?.length ?? 0,
      likedByUser: currentUserId ? msg.likes.some((like) => like.userId === currentUserId) : false,
      replies: msg.replies?.map((r) => ({
        id: r.id,
        userId: r.userId,
        userName: r.userName,
        avatarUrl: r.avatarUrl ?? null,
        text: r.text,
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
        likeCount: r.likes?.length ?? 0,
        likedByUser: currentUserId ? r.likes.some((like) => like.userId === currentUserId) : false,
      })) ?? [],
    }));

    return NextResponse.json(result);
  } catch (err) {
    console.error("获取留言失败:", err);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}


// ------------------------
// 创建留言
// ------------------------
export async function POST(req: NextRequest) {
  const { userId } = getAuth(req) ?? {};
  if (!userId) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const text = (body.text ?? "").trim();
    const userName = body.userName?.trim() || "匿名";
    const avatarUrl = body.avatarUrl ?? null;

    if (!text) {
      return NextResponse.json({ error: "内容不能为空" }, { status: 400 });
    }

    // 确保 User 表里存在当前用户
    let user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          name: userName,
          avatarUrl,
          email: "", // ⚡ 必须传 string
        },
      });
    }

    const newMessage = await prisma.message.create({
      data: {
        userId: user.id,
        userName: user.name || "匿名",
        avatarUrl: user.avatarUrl,
        text,
      },
    });

    return NextResponse.json({
      id: newMessage.id,
      userId: newMessage.userId,
      userName: newMessage.userName,
      avatarUrl: newMessage.avatarUrl,
      text: newMessage.text,
      createdAt: newMessage.createdAt.toISOString(),
      updatedAt: newMessage.updatedAt.toISOString(),
      likeCount: 0,
      likedByUser: false,
    });
  } catch (err) {
    console.error("发布留言失败:", err);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}

// ------------------------
// 删除留言
// ------------------------
// 删除留言
export async function DELETE(req: NextRequest) {
  const { userId } = getAuth(req) ?? {};
  if (!userId) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const messageId = url.searchParams.get("id");
    if (!messageId) {
      return NextResponse.json({ error: "缺少 messageId" }, { status: 400 });
    }

    const message = await prisma.message.findUnique({ where: { id: messageId } });
    if (!message || message.isDeleted) {
      return NextResponse.json({ error: "留言不存在" }, { status: 404 });
    }

    if (message.userId !== userId) {
      return NextResponse.json({ error: "无权限删除该留言" }, { status: 403 });
    }

    await prisma.message.update({
      where: { id: messageId },
      data: { isDeleted: true, updatedAt: new Date() },
    });

    return NextResponse.json({ success: true, error: null }); // ⚡ 保证前端可访问 error 字段
  } catch (err) {
    console.error("删除留言失败:", err);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}
// ------------------------
// 点赞 / 取消点赞
// ------------------------
export async function PUT(req: NextRequest) {
  const { userId } = getAuth(req) ?? {};
  if (!userId) return NextResponse.json({ error: "未登录" }, { status: 401 });

  try {
    const body = await req.json();
    const { messageId, like } = body as { messageId: string; like: boolean };

    if (!messageId) return NextResponse.json({ error: "缺少 messageId" }, { status: 400 });

    if (like) {
      // 点赞
      await prisma.like.upsert({
        where: { userId_messageId: { userId, messageId } },
        update: {},
        create: { userId, messageId },
      });
    } else {
      // 取消点赞
      await prisma.like.deleteMany({
        where: { userId, messageId },
      });
    }

    return NextResponse.json({ success: true, error: null });
  } catch (err) {
    console.error("点赞失败:", err);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}
