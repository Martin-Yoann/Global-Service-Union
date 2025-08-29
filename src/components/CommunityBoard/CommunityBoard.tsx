"use client";
import React, { useState, useEffect, useCallback, useTransition, useMemo } from "react";
import {
  Input,
  Button,
  Typography,
  Spin,
  message as antdMessage,
  Upload,
  Tabs,
  Card,
  Tooltip,
} from "antd";
import {
  SendOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { MessageList } from "./MessageList";
import {
  MessageDTO,
  ReplyDTO,
  insertReplyRecursively,
  deleteReplyRecursively,
  updateLikeRecursively,
} from "./types";

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({} as any));
    throw new Error((err as any).error || res.statusText);
  }
  return res.json() as Promise<T>;
}

export const CommunityBoard: React.FC = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState<MessageDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [images, setImages] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [posting, setPosting] = useState(false);

  const [activeTab, setActiveTab] = useState<"followed" | "recommended" | "popular">("recommended");

  // 加载消息
  const loadMessages = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchJSON<MessageDTO[]>("/api/messages");
      setMessages(data);
    } catch (error: any) {
      antdMessage.error("Failed to load messages: " + error.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const canPost = useMemo(
    () => (!!text.trim() || images.length > 0 || videos.length > 0) && !!user && !posting,
    [text, images, videos, user, posting]
  );

  // 发布逻辑
  const handlePost = useCallback(async () => {
    if (!canPost || !user) return;
    setPosting(true);

    try {
      const payload = {
        title: title.trim() || null,
        text: text.trim(),
        userName: user.firstName || user.fullName || "Anonymous",
        avatarUrl: user.imageUrl,
        images: images.map((f) => f.url),
        videos: videos.map((f) => f.url),
      };

      const newMessage = await fetchJSON<MessageDTO>("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      startTransition(() => {
        setMessages((prev) => [newMessage, ...prev]);
        setTitle("");
        setText("");
        setImages([]);
        setVideos([]);
      });
      antdMessage.success("Posted successfully");
    } catch (error: any) {
      antdMessage.error("Failed to post: " + error.message);
    }
    setPosting(false);
  }, [canPost, title, text, images, videos, user]);

  // 删除
  const handleDelete = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/messages?id=${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.error) return antdMessage.error(`Failed to delete: ${data?.error || res.statusText}`);
      startTransition(() => setMessages((prev) => deleteReplyRecursively(prev, id)));
      antdMessage.success("Deleted successfully");
    } catch {
      antdMessage.error("Failed to delete: network or server error");
    }
  }, []);

  // 点赞
  const handleToggleLike = useCallback(async (id: string, like: boolean) => {
    startTransition(() => setMessages((prev) => updateLikeRecursively(prev, id, like)));
    try {
      await fetchJSON("/api/messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId: id, like }),
      });
    } catch (error: any) {
      startTransition(() => setMessages((prev) => updateLikeRecursively(prev, id, !like)));
      antdMessage.error((like ? "Like" : "Unlike") + " failed: " + error.message);
    }
  }, []);

  // 回复
  const handleReply = useCallback(async (parentId: string, text: string) => {
    try {
      const newReply = await fetchJSON<ReplyDTO>("/api/replies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentId,
          text,
          userName: user?.firstName || user?.fullName || "Anonymous",
          avatarUrl: user?.imageUrl || null,
        }),
      });
      startTransition(() => setMessages((prev) => insertReplyRecursively(prev, parentId, newReply)));
    } catch (error: any) {
      antdMessage.error("Reply failed: " + error.message);
    }
  }, [user]);

  // 上传组件简化
  const uploadProps = (setter: any, type: "image" | "video") => ({
    beforeUpload: (file: any) => {
      const url = URL.createObjectURL(file);
      setter((prev: any) => [...prev, { url, file }]);
      return false;
    },
    showUploadList: false,
  });

  const filteredMessages = useMemo(() => {
    if (activeTab === "popular") {
      return [...messages].sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
    }
    return messages;
  }, [messages, activeTab]);

  return (
    <section style={{ maxWidth: 1200, margin: "auto", padding: 16 }}>
      <Typography.Title level={2} style={{ textAlign: "center" }}>
        Community Board
      </Typography.Title>

      <SignedOut>
        <Typography.Paragraph style={{ textAlign: "center" }}>
          Please <a href="/sign-in">sign in</a> to post a message.
        </Typography.Paragraph>
      </SignedOut>

      <SignedIn>
        <Card style={{ marginBottom: 24, borderRadius: 12, padding: 16 }}>
          {/* 文本框 */}
          <Input.TextArea
            rows={4}
            placeholder="Topic*  Share your thoughts at this moment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={300}
            style={{ borderRadius: 8, marginBottom: 8 }}
          />

          {/* 底部图标+按钮 */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* 左侧图标 */}
            <div style={{ display: "flex", gap: 12, fontSize: 20, color: "#555" }}>
              <Tooltip title="Add Topic">
                <TagOutlined />
              </Tooltip>
              <Upload {...uploadProps(setImages, "image")}>
                <PictureOutlined style={{ cursor: "pointer" }} />
              </Upload>
              <Upload {...uploadProps(setVideos, "video")}>
                <VideoCameraOutlined style={{ cursor: "pointer" }} />
              </Upload>
            </div>

            {/* 右侧按钮 */}
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handlePost}
              disabled={!canPost}
              loading={posting}
              shape="round"
            >
              Post
            </Button>
          </div>
        </Card>
      </SignedIn>

      {/* 分类 Tab */}
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as any)}
        items={[
          { key: "followed", label: "Followed" },
          { key: "recommended", label: "Recommended" },
          { key: "popular", label: "Popular" },
        ]}
        style={{ marginBottom: 24 }}
      />

      <div>
        {loading || isPending ? (
          <div style={{ textAlign: "center", padding: 40 }}>
            <Spin size="large" />
          </div>
        ) : filteredMessages.length === 0 ? (
          <Typography.Paragraph style={{ textAlign: "center", fontStyle: "italic" }}>
            No messages yet. Be the first to post!
          </Typography.Paragraph>
        ) : (
          <MessageList
            messages={filteredMessages}
            onDelete={handleDelete}
            onToggleLike={handleToggleLike}
            onReply={handleReply}
            userId={user?.id}
          />
        )}
      </div>
    </section>
  );
};
