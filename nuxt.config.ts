import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  // pinia: {
  // 	autoImports: ["defineStore"],
  // },

  // app: {
  //   head: {
  //     script: [
  //       {
  //         src: "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1a76ef30fb41fd810c35632806b6dd5d",
  //         defer: true,
  //       },
  //     ],
  //   },
  // },
});
