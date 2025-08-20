// src/components/ViewServiceButton.tsx
"use client";

interface ViewServiceButtonProps {
  serviceName: string;
}

export default function ViewServiceButton({ serviceName }: ViewServiceButtonProps) {
  function handleClick() {
    alert(`查看服务 "${serviceName}" 的详情（演示）`);
  }

  return (
    <button
      onClick={handleClick}
      className="text-indigo-600 hover:text-indigo-800 underline"
      type="button"
    >
      查看
    </button>
  );
}
