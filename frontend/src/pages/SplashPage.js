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
    backgroundColor: "var(--light-blue)",
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
    color: "var(--navy)",
    fontSize: "2.5rem",
    margin: 0,
  };

  const basketballsStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
  };

  const basketballStyle = {
    fontSize: "50px",
    animation: "bounce 2s infinite ease-in-out",
    opacity: 0.7,
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
          .basketball:nth-child(1) {
            animation-delay: 0s;
          }
          .basketball:nth-child(2) {
            animation-delay: 0.5s;
          }
          .basketball:nth-child(3) {
            animation-delay: 1s;
          }
          .basketball:nth-child(4) {
            animation-delay: 1.5s;
          }
          .basketball:nth-child(5) {
            animation-delay: 2s;
          }
        `}
      </style>
      <div style={splashContentStyle}>
        <div style={{ textAlign: "center" }}>
          <img src="malogo.png" alt="Marcenita Logo" style={logoImgStyle} />
          <h1 style={logoH1Style}>MARCENITA</h1>
        </div>
        <p>Welcome to My Portfolio</p>
        <div style={basketballsStyle}>
          <div className="basketball" style={basketballStyle}>
            🏀
          </div>
          <div
            className="basketball"
            style={{ ...basketballStyle, animationDelay: "0.5s" }}
          >
            🏀
          </div>
          <div
            className="basketball"
            style={{ ...basketballStyle, animationDelay: "1s" }}
          >
            🏀
          </div>
          <div
            className="basketball"
            style={{ ...basketballStyle, animationDelay: "1.5s" }}
          >
            🏀
          </div>
          <div
            className="basketball"
            style={{ ...basketballStyle, animationDelay: "2s" }}
          >
            🏀
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplashPage;
