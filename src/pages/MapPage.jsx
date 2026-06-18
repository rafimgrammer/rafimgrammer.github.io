// pages/MapPage.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './MapPage.css';

const { kakao } = window;

// 💡 1. 모든 데이터의 type을 배열([]) 형태로 통일했습니다.
const markersData = [
  { 
    id: 1, lat:  37.886277235284716, lng: 127.73575180046996,
    type: ['general','can','plastic','paper'], 
    building: '공학관',
    details: [
      { floor: '1F', bins: '일반, 플라스틱, 캔, 종이 (중앙 입구, 1163 앞, 소프트웨어 빌리지 안)' }
    ]
  },
  { 
    id: 2, lat: 37.8870, lng: 127.7360, 
    type: ['can', 'plastic', 'general'], // 배열로 변경 완료!
    building: '학생회관',
    details: [
      { floor: '1F', bins: '모든 종류 수거함 (식당 앞)' },
      { floor: '2F', bins: '캔, 플라스틱 (동아리방 복도)' }
    ]
  },
  { 
    id: 3, lat: 37.8850, lng: 127.7340, 
    type: ['plastic', 'general', 'paper'], // 배열로 변경 완료!
    building: '일송문헌도서관',
    details: [
      { floor: '1F', bins: '일반, 플라스틱 (출입구)' },
      { floor: '4F', bins: '종이 전용 수거함' }
    ]
  }
];

export default function MapPage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const navigate = useNavigate();

  const [mapInstance, setMapInstance] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // 만들어진 모든 말풍선(오버레이)들을 기억해둘 공간
  const overlaysRef = useRef({});

  useEffect(() => {
    const container = document.getElementById('full-map');
    const options = {
      center: new kakao.maps.LatLng(37.8864, 127.7356),
      level: 4
    };
    const map = new kakao.maps.Map(container, options);
    setMapInstance(map);

    // 지도를 새로 그릴 때마다 기존에 기억한 말풍선들 초기화
    overlaysRef.current = {};

    // 💡 2. 여기가 핵심입니다! === 대신 includes를 사용하여 배열 안의 값을 찾습니다.
    const filteredMarkers = category === 'all' 
      ? markersData 
      : markersData.filter(m => m.type.includes(category));

    filteredMarkers.forEach(item => {
      const markerPosition = new kakao.maps.LatLng(item.lat, item.lng);
      
      const marker = new kakao.maps.Marker({
        position: markerPosition,
        map: map
      });

      const tooltipContent = `
        <div class="custom-tooltip">
          <div class="tooltip-header">${item.building}</div>
          <div class="tooltip-body">
            ${item.details.map(d => `
              <div class="tooltip-row">
                <span class="floor-badge">${d.floor}</span>
                <span class="bin-info">${d.bins}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      const customOverlay = new kakao.maps.CustomOverlay({
        position: markerPosition,
        content: tooltipContent,
        yAnchor: 1.3,
        zIndex: 3
      });

      // 생성된 오버레이를 고유 id와 함께 저장해둠 (검색 시 꺼내 쓰기 위해)
      overlaysRef.current[item.id] = customOverlay;

      kakao.maps.event.addListener(marker, 'mouseover', () => customOverlay.setMap(map));
      kakao.maps.event.addListener(marker, 'mouseout', () => customOverlay.setMap(null));
      kakao.maps.event.addListener(marker, 'click', () => {
        customOverlay.setMap(map);
        setTimeout(() => customOverlay.setMap(null), 3000); 
      });
    });

  }, [category]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setSuggestions([]);
    } else {
      const filtered = markersData.filter(m => m.building.includes(value));
      setSuggestions(filtered);
    }
  };

  const handleSelectBuilding = (markerData) => {
    setSearchTerm(markerData.building); 
    setSuggestions([]); 

    if (mapInstance) {
      // 1. 지도를 해당 위치로 부드럽게 이동
      const moveLatLon = new kakao.maps.LatLng(markerData.lat, markerData.lng);
      mapInstance.panTo(moveLatLon);

      // 2. 다른 열려있는 말풍선이 있다면 닫기
      Object.values(overlaysRef.current).forEach(overlay => overlay.setMap(null));

      // 3. 방금 검색한 건물의 말풍선 열어주기!
      const targetOverlay = overlaysRef.current[markerData.id];
      if (targetOverlay) {
        targetOverlay.setMap(mapInstance);

        // 4. 검색으로 뜬 말풍선은 4초 뒤에 스르륵 닫히게 설정 (UX 개선)
        setTimeout(() => {
          targetOverlay.setMap(null);
        }, 4000);
      }
    }
  };

  const handleSearchSubmit = () => {
    if (suggestions.length > 0) {
      handleSelectBuilding(suggestions[0]); 
    } else {
      alert('해당 건물을 찾을 수 없습니다.');
    }
  };

  return (
    <div className="full-map-container">
      <div className="floating-ui">
        <button className="back-btn" onClick={() => navigate('/')}>⬅ 홈으로</button>
        
        <div className="search-bar-container">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="건물명 또는 위치 검색..." 
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
            />
            <button onClick={handleSearchSubmit}>🔍</button>
          </div>
          
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((s, index) => (
                <li key={index} onClick={() => handleSelectBuilding(s)}>
                  📍 {s.building} 
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      <div id="full-map" style={{ width: '100vw', height: '100vh' }}></div>
    </div>
  );
}