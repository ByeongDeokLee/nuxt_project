<template>
  <div class="kakao-wrap">
    <input
      v-model="address"
      placeholder="주소를 입력하세요"
      @keydown.enter="searchAddress"
      class="address-input"
    />
    <div id="map" class="map-box"></div>
    <button @click="roadViewFun">로드 뷰</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// 카카오 전역 타입 선언
declare global {
  interface Window {
    kakao: any;
  }
}

const map = ref<any>(null);
const marker = ref<any>(null);
const address = ref("서울특별시 중구 세종대로 110"); // 기본 주소

const roadViewFun = () => {
  console.log("진입", marker.value.getPosition());
  window.open(
    `https://map.kakao.com/link/roadview/${marker.value.getPosition().Ma},${
      marker.value.getPosition().La
    }`,
    "newWindow"
  );
};

onMounted(() => {
  if (!window.kakao || !window.kakao.maps) return;

  window.kakao.maps.load(() => {
    const container = document.getElementById("map");
    if (!container) return;

    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978),
      level: 3,
    };

    map.value = new window.kakao.maps.Map(container, options);

    // 초기 마커 생성 (비어있을 수 있음)
    marker.value = new window.kakao.maps.Marker({
      map: map.value,
    });

    searchAddress();
  });
});

function searchAddress() {
  const geocoder = new window.kakao.maps.services.Geocoder();

  geocoder.addressSearch(address.value, (result: any[], status: string) => {
    if (status === window.kakao.maps.services.Status.OK) {
      const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

      // 지도 중심 이동
      map.value.setCenter(coords);

      // 마커 위치 재설정
      marker.value.setPosition(coords);
      //클리 이벤트 등록
      window.kakao.maps.event.addListener(marker.value, "click", () => {
        const info = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:8px;"> ${address.value}</div>`,
        });
        info.open(map.value, marker.value);
        setTimeout(() => {
          info.close();
        }, 3000);
      });
    } else {
      alert("주소 검색에 실패했습니다.");
    }
  });
}
</script>

<style scoped>
.kakao-wrap {
  max-width: 600px;
  margin: 30px auto;
}
.map-box {
  width: 100%;
  height: 400px;
  border-radius: 8px;
  margin-top: 12px;
}
.address-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}
</style>
