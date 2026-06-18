// components/VideoSection.jsx
import React from 'react';
import './VideoSection.css'; // 별도 CSS 파일 생성 권장

export default function VideoSection() {
  return (
    <div className="video-wrapper">
      <video 
        className="intro-video" 
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/assets/intro-video.mp4" type="video/mp4"/>
        브라우저가 비디오 태그를 지원하지 않습니다.
      </video>
      <div className="video-overlay">
        <h2>한림대학교 쓰레기통 위치찾기</h2>
        <p>이제 헤메지 마세요! 제가 도와드립니다</p>
      </div>
    </div>
  );
}