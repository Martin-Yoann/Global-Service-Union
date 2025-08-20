// components/CommunityBoard/ReplyList.tsx
"use client";

import React from "react";
import { List, Avatar, Button, Popconfirm } from "antd";
import { ReplyDTO } from "./types";

interface ReplyListProps {
  replies?: ReplyDTO[];
  onDelete: (id: string) => void;
  userId?: string;
}

export default function ReplyList({ replies = [], onDelete, userId }: ReplyListProps) {
  if (!replies.length) return null;

  return (
    <List
      dataSource={replies}
      itemLayout="horizontal"
      style={{ marginLeft: 48, marginTop: 8 }}
      renderItem={(reply) => (
        <div>
          <List.Item
            actions={[
              userId === reply.userId && (
                <Popconfirm title="确定删除这条回复吗？" onConfirm={() => onDelete(reply.id)}>
                  <Button danger type="link" size="small">
                    删除
                  </Button>
                </Popconfirm>
              ),
            ].filter(Boolean)}
          >
            <List.Item.Meta
              avatar={
                reply.avatarUrl ? <Avatar src={reply.avatarUrl} /> : <Avatar>{reply.userName?.charAt(0).toUpperCase() ?? "?"}</Avatar>
              }
              title={reply.userName}
              description={
                <>
                  <div style={{ whiteSpace: "pre-wrap" }}>{reply.text}</div>
                  <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
                    {new Date(reply.createdAt).toLocaleString()}
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
}
