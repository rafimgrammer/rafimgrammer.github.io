import React from 'react';

export default function UpdateSection() {
  // 샘플 데이터베이스 대용 데이터
  const updates = [
    { id: 1, date: '2026-06-15', content: '공학관 1층 분리수거함 위치 정밀 수정' },
    { id: 2, date: '2026-06-10', content: '학생회관 뒤편 캔/플라스틱 수거함 추가 반영' },
    { id: 3, date: '2026-06-01', content: '카카오맵 API 연동 및 사용자 위치 추적 기능 안정화' },
    { id: 4, date: '2026-05-20', content: '재활용 정보 안내 웹 서비스 프로토타입 빌드' },
  ];

  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      <h3>최근 업데이트 소식</h3>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '15px' }}>
        {updates.map((item) => (
          <li key={item.id} style={{ padding: '12px 5px', borderBottom: '1px solid #eee', display: 'flex', gap: '20px' }}>
            <span style={{ fontWeight: 'bold', color: '#198754', minWidth: '90px' }}>{item.date}</span>
            <span style={{ color: '#333' }}>{item.content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}