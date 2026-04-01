export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px',
    }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>404</h1>
      <p style={{ fontSize: '18px', marginBottom: '30px', color: '#666' }}>ページが見つかりません</p>
      <a href="/" style={{
        padding: '10px 20px',
        backgroundColor: '#0070f3',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
      }}>
        ホームに戻る
      </a>
    </div>
  );
}
