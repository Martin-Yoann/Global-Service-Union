// components/CommunityBoard/fetchJSON.ts

export async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(url, options);
    if (!res.ok) {
      const err = await res.json().catch(() => ({} as any));
      throw new Error((err as any).error || res.statusText);
    }
    return res.json() as Promise<T>;
  }
  