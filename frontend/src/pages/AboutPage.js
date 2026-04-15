import "../App.css";
import Footer from "../components/Footer";

function AboutPage() {
  return (
    <>
      <section className="content-section">
        <h2>My Passion Flip Cards</h2>
        <div className="flip-cards-container">
          {/* Card 1 */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="/basketball1.jpeg" alt="Playing Basketball" />
              </div>
              <div className="flip-card-back">
                <h3>Basketball</h3>
                <p>Playing basketball helps me stay active and strong.</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="/drums1.jpeg" alt="Drumming in Band" />
              </div>
              <div className="flip-card-back">
                <h3>Drums</h3>
                <p>
                  Playing the drums allows me to express my feelings and enjoy
                  music.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="/cooking.png" alt="Creative Cooking" />
              </div>
              <div className="flip-card-back">
                <h3>Cooking</h3>
                <p>
                  Cooking makes me feel proud because I can make food for myself
                  and my family.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="/runningman1.jpeg" alt="Running Man Variety Show" />
              </div>
              <div className="flip-card-back">
                <h3>Entertainment</h3>
                <p>
                  Watching Running Man Korea helps me laugh and forget stress
                  from school.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section1">
        <h2>My Journey</h2>
        <ol>
          <li>
            Basketball became my favorite hobby when I was 12, playing in our
            backyard.
          </li>
          <li>
            In 2022, I began learning to play the drums and enjoy making music.
          </li>
          <li>
            Cooking caught my interest as a kid whenever I watched and helped my
            mom.
          </li>
          <li>
            Since 2018, watching Running Man Korea has been one of my comfort
            shows.
          </li>
        </ol>
        <blockquote>
          "Hobbies help me stay happy, learn new skills, and enjoy life every
          day."
        </blockquote>
      </section>
      <Footer />
    </>
  );
}

export default AboutPage;
