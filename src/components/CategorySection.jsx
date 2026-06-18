import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CategorySection() {
  const navigate = useNavigate();
  const categories = [
    { id: 'general', name: '일반 쓰레기', color: '#6c757d' },
    { id: 'can', name: '캔 종류', color: '#0d6efd' },
    { id: 'plastic', name: '플라스틱', color: '#198754' },
    { id: 'paper', name: '종이류', color: '#ffc107' }
  ];

  const handleCategoryClick = (id) => {
    navigate(`/map?category=${id}`);
  };

  return (
    <div style={{ height: '100%' }}>
      <h3>쓰레기 배출 안내 및 지도 분리</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', height: 'calc(100% - 50px)', marginTop: '10px' }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            style={{
              backgroundColor: cat.color,
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {cat.name} 바로가기
          </button>
        ))}
      </div>
    </div>
  );
}