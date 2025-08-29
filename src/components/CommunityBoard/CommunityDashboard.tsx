// src/components/CommunityDashboard.tsx
"use client";

import React, { useState } from "react";
import { Layout, Menu, Grid, Typography } from "antd";
import {
  HomeOutlined,
  NotificationOutlined,
  TeamOutlined,
  CarOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { CommunityBoard } from "./CommunityBoard";
import SectionPlaceholder from "./SectionPlaceholder";

const { Sider, Content } = Layout;
const { Title } = Typography;

// 菜单枚举
export const MENU_KEYS = {
  HOMEPAGE: "homepage",
  LOGISTICS: "logistics",
  WAREHOUSE: "warehouse",
  MARKETING: "marketing",
  HR: "hr",
} as const;
export type MenuKey = (typeof MENU_KEYS)[keyof typeof MENU_KEYS];

// 菜单配置
const menuItems = [
  { key: MENU_KEYS.HOMEPAGE, icon: <HomeOutlined />, label: "Homepage" },
  { key: MENU_KEYS.LOGISTICS, icon: <CarOutlined />, label: "Logistics" },
  { key: MENU_KEYS.WAREHOUSE, icon: <ShopOutlined />, label: "Warehouse" },
  { key: MENU_KEYS.MARKETING, icon: <NotificationOutlined />, label: "Marketing" },
  { key: MENU_KEYS.HR, icon: <TeamOutlined />, label: "HR" },
];

// 内容映射表
const contentMap: Record<MenuKey, React.ReactNode> = {
  [MENU_KEYS.HOMEPAGE]: <CommunityBoard />,
  [MENU_KEYS.LOGISTICS]: <SectionPlaceholder title="Logistics" />,
  [MENU_KEYS.WAREHOUSE]: <SectionPlaceholder title="Warehouse" />,
  [MENU_KEYS.MARKETING]: <SectionPlaceholder title="Marketing" />,
  [MENU_KEYS.HR]: <SectionPlaceholder title="HR" />,
};

export default function CommunityDashboard() {
  const screens = Grid.useBreakpoint();
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState<MenuKey>(MENU_KEYS.HOMEPAGE);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* 🔥 左侧导航 */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        collapsedWidth={screens.xs ? 0 : 80}
        style={{
          height: "100vh",
          position: "sticky",
          top: 0,
          overflow: "hidden",
          borderRight: "1px solid #f0f0f0",
          background: "#fff",
        }}
      >
        {/* Logo 区域 */}
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: collapsed ? 18 : 20,
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          {collapsed ? "C" : "Community"}
        </div>

        {/* Menu 滚动 */}
        <div style={{ height: "calc(100% - 64px)", overflowY: "auto" }}>
          <Menu
            mode="inline"
            selectedKeys={[activeKey]}
            onClick={(info) => setActiveKey(info.key as MenuKey)}
            items={menuItems}
            style={{ border: "none" }}
          />
        </div>
      </Sider>

      {/* 🔥 内容区 */}
      <Layout style={{ display: "flex", flexDirection: "column" }}>
        <Content
          style={{
            margin: screens.sm ? 24 : 12,
            padding: screens.sm ? 24 : 12,
            background: "#fff",
            borderRadius: 8,
            flex: 1,
            overflow: "auto",
          }}
        >
          {contentMap[activeKey]}
        </Content>
      </Layout>
    </Layout>
  );
}