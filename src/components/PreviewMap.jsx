// components/PreviewMap.jsx
import React, { useEffect, useRef } from 'react';

const { kakao } = window;

export default function PreviewMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    // 1. 지도 생성 기본 좌표 (위치 권한 허용 전 임시 좌표)
    const defaultLoc = new kakao.maps.LatLng(37.8864, 127.7356); 
    const options = {
      center: defaultLoc,
      level: 3,
    };
    
    const map = new kakao.maps.Map(mapRef.current, options);

    // 2. 내 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const locPosition = new kakao.maps.LatLng(lat, lon);

        // 내 위치 마커 생성 (빨간색 마커 이미지 적용)
        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
        const imageSize = new kakao.maps.Size(64, 69);
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        const marker = new kakao.maps.Marker({
          map: map,
          position: locPosition,
          image: markerImage
        });

        // 지도 중심을 내 위치로 이동
        map.setCenter(locPosition);
        
        // 여기에 주변 쓰레기통 마커들을 불러와서 지도에 찍어주는 함수 호출
        // displayTrashBins(map, lat, lon);
      });
    }
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: '12px' }} />;
}