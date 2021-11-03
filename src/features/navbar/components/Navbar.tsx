export const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>FrontEnd Template</h1>
      <div className="links">
        <a href="/">Home</a>
        <a href="/create" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}>DevOps</a>
      </div>
    </nav>
  );
}