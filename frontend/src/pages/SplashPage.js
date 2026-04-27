import React, { useEffect } from "react";

function SplashPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/home";
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const bodyStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #9370db 0%, #ff8c42 100%)",
    margin: 0,
    fontFamily: '"Segoe UI", Arial, sans-serif',
    overflow: "hidden",
    position: "relative",
  };

  const splashContentStyle = {
    textAlign: "center",
    animation: "fadeIn 2s ease-in",
    zIndex: 1,
  };

  const logoImgStyle = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "20px",
  };

  const logoH1Style = {
    color: "#fff",
    fontSize: "2.5rem",
    margin: 0,
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  };

  const catsStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
  };

  const catStyle = {
    fontSize: "50px",
    animation: "bounce 2s infinite ease-in-out",
    opacity: 0.9,
  };

  return (
    <div style={bodyStyle}>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes bounce {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }
          .cat:nth-child(1) {
            animation-delay: 0s;
          }
          .cat:nth-child(2) {
            animation-delay: 0.5s;
          }
          .cat:nth-child(3) {
            animation-delay: 1s;
          }
          .cat:nth-child(4) {
            animation-delay: 1.5s;
          }
          .cat:nth-child(5) {
            animation-delay: 2s;
          }
        `}
      </style>
      <div style={splashContentStyle}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "100px", marginBottom: "20px" }}>🐱</div>
          <h1 style={logoH1Style}>MEOW WORLD</h1>
        </div>
        <p
          style={{
            color: "#fff",
            fontSize: "1.3rem",
            marginBottom: "30px",
            textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
          }}
        >
          Welcome to the Purrfect Destination
        </p>
        <div style={catsStyle}>
          <div className="cat" style={catStyle}>
            🐱
          </div>
          <div className="cat" style={{ ...catStyle, animationDelay: "0.5s" }}>
            😸
          </div>
          <div className="cat" style={{ ...catStyle, animationDelay: "1s" }}>
            😻
          </div>
          <div className="cat" style={{ ...catStyle, animationDelay: "1.5s" }}>
            😼
          </div>
          <div className="cat" style={{ ...catStyle, animationDelay: "2s" }}>
            😽
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplashPage;
