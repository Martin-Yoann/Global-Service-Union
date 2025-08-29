"use client";

import React, { useState } from "react";
import { List, Button, Input, Popconfirm, Avatar, Tooltip } from "antd";
import {
  LikeOutlined,
  LikeFilled,
  CommentOutlined,
  ShareAltOutlined,
  StarOutlined,
} from "@ant-design/icons";
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
        <div key={reply.id} style={{ marginBottom: 8 }}>
          <List.Item
            style={{ padding: "8px 0", borderBottom: "1px solid #f0f0f0" }}
            actions={[
              userId === reply.userId && (
                <Popconfirm
                  title="Delete this reply?"
                  onConfirm={() => onDelete(reply.id)}
                >
                  <Button danger type="link" size="small">
                    Delete
                  </Button>
                </Popconfirm>
              ),
            ].filter(Boolean)}
          >
            <List.Item.Meta
              avatar={
                reply.avatarUrl ? (
                  <Avatar src={reply.avatarUrl} />
                ) : (
                  <Avatar>{reply.userName?.charAt(0).toUpperCase()}</Avatar>
                )
              }
              title={<span style={{ fontWeight: 500 }}>{reply.userName}</span>}
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

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  onDelete,
  onToggleLike,
  onReply,
  userId,
}) => {
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});

  return (
    <List
      dataSource={messages}
      renderItem={(item) => {
        const isOwner = userId === item.userId;
        const liked = item.likedByUser ?? false;
        const isReplyOpen = activeReplyId === item.id;

        return (
          <div
            key={item.id}
            style={{
              marginBottom: 12,
              background: "#fff",
              border: "1px solid #eaeaea",
              borderRadius: 8,
              padding: 16,
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            {/* 标题 */}
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>
              {item.title ?? "Untitled Post"}
            </div>

            {/* 作者信息 */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
              <Avatar src={item.avatarUrl} style={{ marginRight: 8 }}>
                {item.userName?.charAt(0).toUpperCase()}
              </Avatar>
              <span style={{ fontWeight: 500, marginRight: 6 }}>{item.userName}</span>
              <span style={{ fontSize: 12, color: "#888" }}>
                {new Date(item.createdAt).toLocaleString("en-US")}
              </span>
            </div>

            {/* 内容正文 */}
            <div style={{ marginBottom: 12, color: "#333", lineHeight: 1.5 }}>
              {item.text}
            </div>

            {/* 操作按钮 */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 14, color: "#555" }}>
              <Tooltip title="Agree">
                <Button
                  size="small"
                  type="text"
                  icon={liked ? <LikeFilled style={{ color: "#1890ff" }} /> : <LikeOutlined />}
                  onClick={() => onToggleLike(item.id, !liked)}
                >
                  {item.likeCount ?? 0}
                </Button>
              </Tooltip>

              <Tooltip title="Comments">
                <Button
                  size="small"
                  type="text"
                  icon={<CommentOutlined />}
                  onClick={() => setActiveReplyId(isReplyOpen ? null : item.id)}
                >
                  {item.replies?.length ?? 0} comments
                </Button>
              </Tooltip>

              <Tooltip title="Share">
                <Button size="small" type="text" icon={<ShareAltOutlined />}>
                  Share
                </Button>
              </Tooltip>

              <Tooltip title="Favorite">
                <Button size="small" type="text" icon={<StarOutlined />}>
                  Favorites
                </Button>
              </Tooltip>

              {isOwner && (
                <Popconfirm title="Delete this post?" onConfirm={() => onDelete(item.id)}>
                  <Button danger type="link" size="small">
                    Delete
                  </Button>
                </Popconfirm>
              )}
            </div>

            {/* 回复输入框 */}
            {isReplyOpen && (
              <div style={{ paddingLeft: 0, marginTop: 8 }}>
                <Input.TextArea
                  rows={2}
                  placeholder="Write a reply..."
                  value={replyTexts[item.id] ?? ""}
                  onChange={(e) =>
                    setReplyTexts({ ...replyTexts, [item.id]: e.target.value })
                  }
                />
                <Button
                  type="primary"
                  size="small"
                  style={{ marginTop: 4 }}
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

            {/* 回复列表 */}
            <ReplyList replies={item.replies} onDelete={onDelete} userId={userId} />
          </div>
        );
      }}
    />
  );
};
