export default function MapSection() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '500px' }}>
      {/* Yandex Map */}
      <iframe
        src="https://yandex.uz/maps/-/CLQqJ6pk"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 'none' }}
        title="School Location"
      ></iframe>

      {/* Overlay: Gerb va matn */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: '5px 10px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
      }}>
        <img src="/uzb-gerb.png" alt="Uzbekistan Gerb" style={{ height: '40px' }} />
        <span style={{ fontWeight: 'bold', fontSize: '18px' }}>School 39</span>
      </div>
    </div>
  );
}
