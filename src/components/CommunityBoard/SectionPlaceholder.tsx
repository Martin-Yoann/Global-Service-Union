"use client";

import React, { ReactNode } from "react";
import { Card, Typography } from "antd";

export default function SectionPlaceholder({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <Card style={{ maxWidth: 1200, margin: "48px auto", textAlign: "center" }}>
      <Typography.Title level={3} style={{ marginBottom: 16 }}>
        {title}
      </Typography.Title>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
        {children || "This module is under development. Stay tuned."}
      </Typography.Paragraph>
    </Card>
  );
}
