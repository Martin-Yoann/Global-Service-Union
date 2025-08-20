import Image from "next/image";

export function Avatar({ avatarUrl, name }: { avatarUrl?: string | null; name: string }) {
  if (avatarUrl) {
    return <Image src={avatarUrl} alt={name} width={32} height={32} className="rounded-full object-cover" />;
  }
  return (
    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-sm font-bold text-white">
      {name?.charAt(0).toUpperCase() || "?"}
    </div>
  );
}
