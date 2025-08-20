// src/components/community/MessageList.tsx
"use client";
import React, { useState } from "react";
import { List, Button, Input, Popconfirm, Avatar } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import { MessageDTO, ReplyDTO } from "./types";

interface MessageListProps {
  messages: MessageDTO[];
  onDelete: (id: string) => void;
  onToggleLike: (id: string, like: boolean) => void;
  onReply: (parentId: string, text: string) => void;
  userId?: string;
}

export const ReplyList: React.FC<{
  replies?: ReplyDTO[];
  onDelete: (id: string) => void;
  userId?: string;
}> = ({ replies = [], onDelete, userId }) => {
  if (!replies.length) return null;

  return (
    <List
      dataSource={replies}
      itemLayout="horizontal"
      style={{ marginLeft: 48, marginTop: 8 }}
      renderItem={(reply) => (
        <div key={reply.id}>
          <List.Item
            actions={[
              userId === reply.userId && (
                <Popconfirm title="Are you sure you want to delete this reply?" onConfirm={() => onDelete(reply.id)}>
                  <Button danger type="link" size="small">
                    Delete
                  </Button>
                </Popconfirm>
              ),
            ].filter(Boolean)}
          >
            <List.Item.Meta
              avatar={reply.avatarUrl ? <Avatar src={reply.avatarUrl} /> : <Avatar>{reply.userName?.charAt(0).toUpperCase()}</Avatar>}
              title={reply.userName}
              description={
                <>
                  <div style={{ whiteSpace: "pre-wrap" }}>{reply.text}</div>
                  <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
                    {new Date(reply.createdAt).toLocaleString("en-US")}
                  </div>
                </>
              }
            />
          </List.Item>

          {reply.replies && reply.replies.length > 0 && (
            <ReplyList replies={reply.replies} onDelete={onDelete} userId={userId} />
          )}
        </div>
      )}
    />
  );
};

export const MessageList: React.FC<MessageListProps> = ({ messages, onDelete, onToggleLike, onReply, userId }) => {
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});

  return (
    <List
      itemLayout="horizontal"
      dataSource={messages}
      renderItem={(item) => {
        const isOwner = userId === item.userId;
        const liked = item.likedByUser ?? false;
        const isReplyOpen = activeReplyId === item.id;

        return (
          <div key={item.id} style={{ marginBottom: 16 }}>
            <List.Item
              actions={[
                <Button
                  key="like"
                  type="text"
                  icon={liked ? <LikeFilled style={{ color: "#1890ff" }} /> : <LikeOutlined />}
                  onClick={() => onToggleLike(item.id, !liked)}
                  size="small"
                >
                  {item.likeCount ?? 0}
                </Button>,
                <Button key="reply" type="link" onClick={() => setActiveReplyId(isReplyOpen ? null : item.id)}>
                  Reply
                </Button>,
                isOwner && (
                  <Popconfirm key="delete" title="Are you sure you want to delete this message?" onConfirm={() => onDelete(item.id)}>
                    <Button danger type="link" size="small">
                      Delete
                    </Button>
                  </Popconfirm>
                ),
              ].filter(Boolean)}
            >
              <List.Item.Meta
                avatar={item.avatarUrl ? <Avatar src={item.avatarUrl} /> : <Avatar>{item.userName?.charAt(0).toUpperCase()}</Avatar>}
                title={item.userName}
                description={
                  <>
                    <div style={{ whiteSpace: "pre-wrap" }}>{item.text}</div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 6 }}>
                      {new Date(item.createdAt).toLocaleString("en-US")}
                    </div>
                  </>
                }
              />
            </List.Item>

            {isReplyOpen && (
              <div style={{ paddingLeft: 48, marginTop: 8 }}>
                <Input.TextArea
                  rows={2}
                  placeholder="Write a reply..."
                  value={replyTexts[item.id] ?? ""}
                  onChange={(e) => setReplyTexts({ ...replyTexts, [item.id]: e.target.value })}
                />
                <Button
                  type="link"
                  onClick={() => {
                    const text = replyTexts[item.id]?.trim();
                    if (!text) return;
                    onReply(item.id, text);
                    setReplyTexts({ ...replyTexts, [item.id]: "" });
                    setActiveReplyId(null);
                  }}
                >
                  Send
                </Button>
              </div>
            )}

            <ReplyList replies={item.replies} onDelete={onDelete} userId={userId} />
          </div>
        );
      }}
    />
  );
};
