import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],

  app: {
    head: {
      script: [
        {
          src: "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1a76ef30fb41fd810c35632806b6dd5d&libraries=services",
          defer: true,
        },
      ],
    },
  },

  compatibilityDate: "2025-04-22",
  vite: {
    server: {
      proxy: {
        "/kakao-api": {
          target: "https://map.kakao.com",
          changeOrigin: true, // 이 옵션이 CORS 문제 해결
          // pathRewrite: { "^/kakao-api": "" },
          secure: false,
          // logLevel: "debug", // 프록시 디버깅 활성화
        },
      },
    },
  },
});
