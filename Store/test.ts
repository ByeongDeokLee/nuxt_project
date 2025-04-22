import { defineStore } from "pinia";

export const useTestStore = defineStore("test", () => {
  const posts = ref([
    {
      id: 1,
      title: "첫 번째 게시글입니다.",
      author: "병덕",
      date: "2025-04-20",
    },
    {
      id: 2,
      title: "Vue로 만드는 게시판 예제",
      author: "홍길동",
      date: "2025-04-21",
    },
    { id: 3, title: "Nuxt 3 정말 쉽다!", author: "이순신", date: "2025-04-21" },
  ]);

  return { posts };
});

export const useTestName = defineStore("name", () => {
  const name = ref("나는 장첸이야~");

  return { name };
});
