<template>
  <div class="board-container">
    <h1 class="board-title">게시판</h1>

    <div class="board-table-wrapper">
      <table class="board-table">
        <thead>
          <tr>
            <th>번호</th>
            <th class="text-left">제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, index) in posts.posts" :key="post.id">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-left">
              <!-- <NuxtLink :to="`/board/${post.id}`"> -->
              {{ post.title }}
              <!-- </NuxtLink> -->
            </td>
            <td class="text-center">{{ post.author }}</td>
            <td class="text-center">{{ post.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTestStore } from "@/Store/test";
const posts = useTestStore();
// console.log("게시글 리스트 확인:", posts.posts);
</script>

<style scoped lang="scss">
.board-container {
  max-width: 960px;
  margin: 60px auto;
  padding: 0 16px;
}

.board-title {
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 24px;
  color: #333;
}

.board-table-wrapper {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.board-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  th,
  td {
    padding: 12px 16px;
    border-bottom: 1px solid #eee;
  }

  th {
    background-color: #f5f7fa;
    font-weight: 600;
    color: #555;
  }

  tr:hover {
    background-color: #f0f8ff;
  }

  .text-left {
    text-align: left;
  }

  .text-center {
    text-align: center;
  }
}
</style>
