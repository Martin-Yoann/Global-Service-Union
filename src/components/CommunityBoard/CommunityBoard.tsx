// src/components/community/CommunityBoard.tsx
"use client";
import React, { useState, useEffect, useCallback, useTransition, useMemo } from "react";
import { Input, Button, Typography, Spin, message as antdMessage } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { MessageList } from "./MessageList";
import { MessageDTO, ReplyDTO, insertReplyRecursively, deleteReplyRecursively, updateLikeRecursively } from "./types";

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
  const [newText, setNewText] = useState("");
  const [posting, setPosting] = useState(false);
  const [isPending, startTransition] = useTransition();

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

  const canPost = useMemo(() => !!newText.trim() && !!user && !posting, [newText, user, posting]);

  const handlePost = useCallback(async () => {
    if (!canPost || !user) return;
    setPosting(true);
    try {
      const payload = { userName: user.firstName || user.fullName || "Anonymous", avatarUrl: user.imageUrl, text: newText.trim() };
      const newMessage = await fetchJSON<MessageDTO>("/api/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      startTransition(() => {
        setMessages((prev) => [newMessage, ...prev]);
        setNewText("");
      });
      antdMessage.success("Message posted successfully");
    } catch (error: any) {
      antdMessage.error("Failed to post message: " + error.message);
    }
    setPosting(false);
  }, [canPost, newText, user]);

  const handleDelete = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/messages?id=${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.error) return antdMessage.error(`Failed to delete: ${data?.error || res.statusText || "Unknown error"}`);
      startTransition(() => setMessages((prev) => deleteReplyRecursively(prev, id)));
      antdMessage.success("Deleted successfully");
    } catch {
      antdMessage.error("Failed to delete: network or server error");
    }
  }, []);

  const handleToggleLike = useCallback(async (id: string, like: boolean) => {
    startTransition(() => setMessages((prev) => updateLikeRecursively(prev, id, like)));
    try {
      await fetchJSON("/api/messages", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messageId: id, like }) });
    } catch (error: any) {
      startTransition(() => setMessages((prev) => updateLikeRecursively(prev, id, !like)));
      antdMessage.error((like ? "Like" : "Unlike") + " failed: " + error.message);
    }
  }, []);

  const handleReply = useCallback(async (parentId: string, text: string) => {
    try {
      const newReply = await fetchJSON<ReplyDTO>("/api/replies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parentId, text, userName: user?.firstName || user?.fullName || "Anonymous", avatarUrl: user?.imageUrl || null }),
      });
      startTransition(() => setMessages((prev) => insertReplyRecursively(prev, parentId, newReply)));
    } catch (error: any) {
      antdMessage.error("Reply failed: " + error.message);
    }
  }, [user]);

  return (
    <section style={{ maxWidth: 1200, margin: "auto", padding: 16, backgroundColor: "#fff" }}>
      <Typography.Title level={2} style={{ textAlign: "center" }}>Community Board</Typography.Title>

      <SignedOut>
        <Typography.Paragraph style={{ textAlign: "center" }}>Please <a href="/sign-in">sign in</a> to post a message.</Typography.Paragraph>
      </SignedOut>

      <SignedIn>
        <Input.TextArea rows={4} placeholder="Write something..." value={newText} onChange={(e) => setNewText(e.target.value)} disabled={posting} maxLength={500} />
        <div style={{ marginTop: 12, textAlign: "right" }}>
          <Button type="primary" icon={<SendOutlined />} onClick={handlePost} disabled={!canPost} loading={posting}>Post</Button>
        </div>
      </SignedIn>

      <div style={{ marginTop: 32 }}>
        {loading || isPending ? (
          <div style={{ textAlign: "center", padding: 40 }}><Spin size="large" /></div>
        ) : messages.length === 0 ? (
          <Typography.Paragraph style={{ textAlign: "center", fontStyle: "italic" }}>No messages yet. Be the first to post!</Typography.Paragraph>
        ) : (
          <MessageList messages={messages} onDelete={handleDelete} onToggleLike={handleToggleLike} onReply={handleReply} userId={user?.id} />
        )}
      </div>
    </section>
  );
};
