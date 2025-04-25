<template>
  <div class="kakao-wrap">
    <div id="map" class="map-box"></div>
    <button class="open-sidebar-btn" @click="sidebarOpen = !sidebarOpen">
      {{ sidebarOpen ? "닫기" : "메뉴" }}
    </button>

    <!-- 슬라이딩 사이드바 -->
    <div class="sidebar" :class="{ open: sidebarOpen }">
      <button class="close-btn" @click="sidebarOpen = false">✕</button>
      <h3>기능 선택</h3>
      <button @click="searchAddFun">검색</button>
      <button @click="directionsFun">길찾기</button>
      <button @click="busInfoFun">버스</button>
      <button @click="roadViewFun">로드 뷰</button>

      <div v-if="searchAddYn">
        <input
          v-model="address"
          placeholder="주소를 입력하세요"
          @keydown.enter="searchAddress"
          class="address-input"
        />
      </div>

      <div v-if="directionsYn" class="direction-box">
        <input
          v-model="startName"
          placeholder="출발지를 입력하세요"
          class="address-input"
        />
        <input
          v-model="endName"
          placeholder="도착지를 입력하세요"
          @keydown.enter="searchDirection"
          class="address-input"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";

// 카카오 전역 타입 선언
declare global {
  interface Window {
    kakao: any;
  }
}

const map = ref<any>(null);
const marker = ref<any>(null);
const infowindow = ref<any>(null);
//메뉴
const directionsYn = ref(false);
const searchAddYn = ref(true);
//슬라이딩 도어
const sidebarOpen = ref(false);

const address = ref("서울특별시 중구 세종대로 110");
const startName = ref("");
const endName = ref("");

// //맵클릭
// function mapClickFun(data: ClickedLocationData) {
//   console.log("지도 클릭 정보:", data);

//   // 예: address.value = data.roadAddress;
// }

//버스 정보
const busInfoFun = async () => {
  try {
    const url = "https://ws.bus.go.kr/api/rest/buspos/getBusPosByRtid";
    const respone = await axios.get(url);

    return respone.data;
  } catch (error) {}
};

//로드 뷰
const roadViewFun = () => {
  const width = 500;
  const height = 500;

  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  window.open(
    `https://map.kakao.com/link/roadview/${marker.value.getPosition().Ma},${
      marker.value.getPosition().La
    }`,
    "newWindow",
    `width=${width},height=${height},top=${top},left=${left},scrollbars=yes`
  );
};

//길찾기
const directionsFun = () => {
  directionsYn.value = true;
  searchAddYn.value = false;

  console.log("\n\n\n 확인1 \n\n\n", startName.value);
  console.log("\n\n\n 확인2 \n\n\n", endName.value);
  window.open(
    `https://map.kakao.com/link/to/카카오판교오피스,37.402056,127.10821`,
    "newVindown"
  );
};

//검색
const searchAddFun = () => {
  searchAddYn.value = true;
  directionsYn.value = false;
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

    marker.value = new window.kakao.maps.Marker({
      map: map.value,
    });

    // 지도 클릭 이벤트 등록
    window.kakao.maps.event.addListener(
      map.value,
      "click",
      (mouseEvent: any) => {
        if (infowindow.value) {
          infowindow.value.close();
        }
        const coords = mouseEvent.latLng;

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(
          coords.getLng(),
          coords.getLat(),
          (result: any, status: string) => {
            if (status === window.kakao.maps.services.Status.OK) {
              // const roadAddr = result[0]?.road_address?.address_name || "";
              // const jibunAddr = result[0]?.address?.address_name || "";
              infowindow.value = new window.kakao.maps.InfoWindow({
                zindex: 1,
              });

              var detailAddr = !!result[0].road_address
                ? "<div>도로명주소 : " +
                  result[0].road_address.address_name +
                  "</div>"
                : "";
              detailAddr +=
                "<div>지번 주소 : " + result[0].address.address_name + "</div>";

              var content =
                '<div class="bAddr">' +
                '<span class="title">법정동 주소정보</span>' +
                detailAddr +
                "</div>";
              infowindow.value.setContent(content);
              infowindow.value.open(map.value, marker.value);
            }
          }
        );

        // 마커 위치 갱신
        marker.value.setPosition(coords);
        marker.value.setMap(map.value);
      }
    );

    searchAddress();
  });
});

function searchDirection() {}

function searchAddress() {
  const geocoder = new window.kakao.maps.services.Geocoder();

  geocoder.addressSearch(address.value, (result: any[], status: string) => {
    if (status === window.kakao.maps.services.Status.OK) {
      const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
      map.value.setCenter(coords);
      marker.value.setPosition(coords);

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
  max-width: 100%;
  position: relative;
}
.map-box {
  width: 100%;
  height: 500px;
  border-radius: 8px;
  margin-top: 12px;
}
.address-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  margin-bottom: 10px;
}
.open-sidebar-btn {
  margin-top: 10px;
  padding: 8px 16px;
}
.sidebar {
  position: fixed;
  top: 0;
  right: -300px;
  width: 280px;
  height: 100vh;
  background-color: #f8f8f8;
  border-left: 1px solid #ddd;
  padding: 20px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease-in-out;
  z-index: 999;
}
.sidebar.open {
  right: 0;
}
.sidebar h3 {
  margin-bottom: 10px;
}
.direction-box input {
  margin-top: 10px;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}
</style>
