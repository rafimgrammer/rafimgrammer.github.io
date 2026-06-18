// pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Header from '../components/Header';
import PreviewMap from '../components/PreviewMap';
import VideoSection from '../components/VideoSection';

export default function Home() {
  const navigate = useNavigate();

  // 2번 섹션: 쓰레기 카테고리 클릭 시 이동
  const goToMap = (category) => {
    navigate(`/map?category=${category}`);
  };

  return (
    <>
      <Header /> {/* 헤더는 컨테이너 밖 상단에 배치 */}
      
    <div className="home-container">
      {/* 섹션 1: 프로젝트 소개 영상 */}
      <section className="card video-section">
        <VideoSection />
      </section>

      {/* 섹션 2: 트렌디한 카테고리 버튼 (Bento Grid 스타일) */}
      <section className="card category-section">
        <div className="category-header">
          <h2>어떤 쓰레기를 버리시나요?</h2>
          <p>원하는 종류를 선택하면 가까운 위치를 알려드려요.</p>
        </div>
        
        <div className="bento-grid">
          <button className="bento-item general" onClick={() => goToMap('general')}>
            <div className="icon-circle">🗑️</div>
            <div className="bento-text">
              <span className="bento-title">일반쓰레기</span>
              <span className="bento-desc">휴지, 코팅 종이 등</span>
            </div>
          </button>
          
          <button className="bento-item can" onClick={() => goToMap('can')}>
            <div className="icon-circle">🥫</div>
            <div className="bento-text">
              <span className="bento-title">캔·고철</span>
              <span className="bento-desc">음료 캔, 통조림</span>
            </div>
          </button>
          
          <button className="bento-item plastic" onClick={() => goToMap('plastic')}>
            <div className="icon-circle">🥤</div>
            <div className="bento-text">
              <span className="bento-title">플라스틱</span>
              <span className="bento-desc">페트병, 배달 용기</span>
            </div>
          </button>
          
          <button className="bento-item paper" onClick={() => goToMap('paper')}>
            <div className="icon-circle">📦</div>
            <div className="bento-text">
              <span className="bento-title">종이류</span>
              <span className="bento-desc">박스, 신문, 전단지</span>
            </div>
          </button>
        </div>
      </section>

      {/* 섹션 3: 업데이트 내역 및 통계 */}
      <section className="card update-section">
        <div className="update-header">
          <h2>최근 업데이트 내역</h2>
          <span className="update-badge">New</span>
        </div>
        
        <div className="update-content-split">
          {/* 왼쪽: 타임라인 영역 */}
          <div className="timeline-container">
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot new"></div>
                <div className="timeline-content">
                  <div className="timeline-meta">
                    <span className="date">2026. 05. 20</span>
                    <span className="tag new-tag">추가</span>
                  </div>
                  <p>공학관 앞 플라스틱 수거함 위치 추가</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-meta">
                    <span className="date">2026. 05. 18</span>
                    <span className="tag improve-tag">개선</span>
                  </div>
                  <p>내 위치 기반 검색 속도 최적화</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-meta">
                    <span className="date">2026. 05. 15</span>
                    <span className="tag open-tag">오픈</span>
                  </div>
                  <p>교내 쓰레기통 지도 서비스 베타 오픈</p>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 미니 대시보드 영역 */}
          <div className="update-side-panel">
            <div className="stat-box">
              <span className="stat-label">현재 등록된 수거함</span>
              <span className="stat-value">42<small>개</small></span>
            </div>
            <div className="stat-box">
              <span className="stat-label">이번 주 추가된 위치</span>
              <span className="stat-value">3<small>곳</small></span>
            </div>
            
            <button className="report-btn">
              💡 새로운 수거함 제보
            </button>
          </div>
        </div>
      </section>

      {/* 섹션 4: 내 주변 쓰레기통 프리뷰 지도 (카카오맵 API) */}
      <section className="card map-preview-section">
        <h2>내 주변 가까운 쓰레기통</h2>
        <PreviewMap />
      </section>
    </div>
    </>
  );
}