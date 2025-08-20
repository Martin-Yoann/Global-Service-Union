// src/components/CommunityDashboard.tsx
"use client";

import React, { useState } from "react";
import { Layout, Menu, Grid } from "antd";
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

const MENU_KEYS = {
  HOMEPAGE: "homepage",
  LOGISTICS: "logistics",
  WAREHOUSE: "warehouse",
  MARKETING: "marketing",
  HR: "hr",
} as const;
type MenuKey = (typeof MENU_KEYS)[keyof typeof MENU_KEYS];

const menuItems = [
  { key: MENU_KEYS.HOMEPAGE, icon: <HomeOutlined />, label: "Homepage" },
  { key: MENU_KEYS.LOGISTICS, icon: <CarOutlined />, label: "Logistics" },
  { key: MENU_KEYS.WAREHOUSE, icon: <ShopOutlined />, label: "Warehouse" },
  { key: MENU_KEYS.MARKETING, icon: <NotificationOutlined />, label: "Marketing" },
  { key: MENU_KEYS.HR, icon: <TeamOutlined />, label: "HR" },
];

export default function CommunityDashboard() {
  const screens = Grid.useBreakpoint();
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState<MenuKey>(MENU_KEYS.HOMEPAGE);

  const renderContent = () => {
    switch (activeKey) {
      case MENU_KEYS.HOMEPAGE:
        return <CommunityBoard />;
      case MENU_KEYS.LOGISTICS:
        return <SectionPlaceholder title="Logistics" />;
      case MENU_KEYS.WAREHOUSE:
        return <SectionPlaceholder title="Warehouse" />;
      case MENU_KEYS.MARKETING:
        return <SectionPlaceholder title="Marketing" />;
      case MENU_KEYS.HR:
        return <SectionPlaceholder title="HR" />;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* ✅ 限制 Sider 高度，避免超过 Footer */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        style={{
          height: "100vh",
          position: "sticky",
          top: 0,
          overflow: "hidden",
          borderRight: "1px solid #f0f0f0",
        }}
      >
        {/* ✅ Menu 内部滚动 */}
        <div style={{ height: "100%", overflowY: "auto" }}>
          <Menu
            mode="inline"
            selectedKeys={[activeKey]}
            onClick={(info) => setActiveKey(info.key as MenuKey)}
            items={menuItems}
          />
        </div>
      </Sider>

      {/* ✅ 内容区美化 */}
      <Layout style={{ display: "flex", flexDirection: "column" }}>
        <Content
          style={{
            margin: 24,
            padding: 24,
            background: "#fff",
            borderRadius: 8,
            flex: 1,
            minHeight: "calc(100vh - 48px)", // ✅ 预留 Footer 高度
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
}
