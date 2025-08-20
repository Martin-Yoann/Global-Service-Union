import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LanguageProvider } from "../context/LanguageContext";

// ✅ 页面元信息（SEO & HTML 标签）
export const metadata = {
  title: "Global Service Union",
  description: "Uniting service businesses across borders.",
};

// ✅ 视口设置（移动端兼容）
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

// ✅ Props 类型定义（增强类型推断）
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#2563eb", // Tailwind: indigo-600
          colorTextOnPrimaryBackground: "#ffffff",
          borderRadius: "0.375rem", // Tailwind 的 rounded-md
        },
      }}
    >
      <LanguageProvider>
        <html lang="en" className="h-full scroll-smooth">
          <body className="h-full bg-gray-50 text-gray-900 flex flex-col">
            {/* 页面整体布局容器 */}
            <div className="min-h-dvh flex flex-col w-full">

              {/* 顶部导航栏 */}
              <Header />

              {/* 主体内容区域（自动扩展） */}
              <main className="flex-1 w-full relative">{children}</main>

              {/* 页脚（固定在底部） */}
              <Footer />
            </div>
          </body>
        </html>
      </LanguageProvider>
    </ClerkProvider>
  );
}
