// components/CommunityBoard/PostBox.tsx
"use client";

import React from "react";
import { Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";

interface PostBoxProps {
  text: string;
  onChange: (text: string) => void;
  onPost: () => void;
  disabled?: boolean;
}

export default function PostBox({ text, onChange, onPost, disabled }: PostBoxProps) {
  return (
    <div style={{ marginBottom: 24 }}>
      <Input.TextArea
        rows={4}
        placeholder="说点什么吧..."
        value={text}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        maxLength={500}
      />
      <div style={{ marginTop: 12, textAlign: "right" }}>
        <Button type="primary" icon={<SendOutlined />} onClick={onPost} disabled={disabled}>
          发布
        </Button>
      </div>
    </div>
  );
}
