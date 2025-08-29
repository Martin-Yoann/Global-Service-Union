// components/CommunityBoard/types.ts

export interface ReplyDTO {
  id: string;
  userId: string;
  userName: string;
  avatarUrl?: string | null;
  text: string;
  createdAt: string;
  updatedAt?: string;
  likeCount?: number;
  likedByUser?: boolean;
  replies?: ReplyDTO[];
}

export interface MessageDTO {
  id: string;
  userId: string;
  userName: string;
  avatarUrl?: string | null;
  title?: string;  // ✅ 新增可选标题字段
  text: string;
  createdAt: string;
  likedByUser?: boolean;
  likeCount?: number;
  replies?: ReplyDTO[];
}

/**
 * 递归插入回复
 */
export function insertReplyRecursively(
  messages: MessageDTO[],
  parentId: string,
  reply: ReplyDTO
): MessageDTO[] {
  return messages.map((m) => {
    if (m.id === parentId) {
      return { ...m, replies: m.replies ? [...m.replies, reply] : [reply] };
    } else if (m.replies) {
      return { ...m, replies: insertReplyRecursively(m.replies, parentId, reply) };
    }
    return m;
  });
}

/**
 * 递归删除留言或回复
 */
export function deleteReplyRecursively(messages: MessageDTO[], id: string): MessageDTO[] {
  return messages
    .filter((m) => m.id !== id)
    .map((m) => ({
      ...m,
      replies: m.replies ? deleteReplyRecursively(m.replies, id) : [],
    }));
}

/**
 * 递归更新点赞状态
 */
export function updateLikeRecursively(
  messages: MessageDTO[],
  id: string,
  like: boolean
): MessageDTO[] {
  return messages.map((m) => {
    if (m.id === id) {
      const count = m.likeCount ?? 0;
      return { ...m, likedByUser: like, likeCount: like ? count + 1 : Math.max(count - 1, 0) };
    } else if (m.replies) {
      return { ...m, replies: updateLikeRecursively(m.replies, id, like) };
    }
    return m;
  });
}
