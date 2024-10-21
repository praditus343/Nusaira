import React from 'react';

function about() {
  return (
    <div>
      <header className="header">
        <h1>About Us</h1>
      </header>

      <section className="about-section">
        <h1>Welcome to Our Platform</h1>
        <p>
          Our mission is to connect farmers directly with buyers, ensuring fair
          prices and high-quality products through transparency and innovation. By
          using this platform, we strive to eliminate the middleman and empower
          both farmers and consumers.
        </p>
      </section>

      <section className="team">
        <div className="team-member">
          <img src="/team1.jpg" alt="Team Member 1" />
          <h3>Ogya Rajendra</h3>
          <p>Founder & CEO</p>
        </div>
        <div className="team-member">
          <img src="/team2.jpg" alt="Team Member 2" />
          <h3>Jane Doe</h3>
          <p>Chief Technology Officer</p>
        </div>
        <div className="team-member">
          <img src="/team3.jpg" alt="Team Member 3" />
          <h3>John Smith</h3>
          <p>Marketing Lead</p>
        </div>
      </section>

      <footer className="footer">
        <p>© 2024 Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default about;
