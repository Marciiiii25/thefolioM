import "../App.css";
import Footer from "../components/Footer";

function AboutPage() {
  return (
    <>
      <section className="content-section">
        <h2>🐱 Purrfect Cat Breeds 🐱</h2>
        <div className="flip-cards-container">
          {/* Card 1 */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="/persian.jpeg" alt="Persian Cat" />
              </div>
              <div className="flip-card-back">
                <h3>🦁 Persian</h3>
                <p>
                  Elegant and calm, Persian cats are known for their luxurious
                  long fur and gentle temperament. Perfect for indoor homes!
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="/siamese.jpeg" alt="Siamese Cat" />
              </div>
              <div className="flip-card-back">
                <h3>✨ Siamese</h3>
                <p>
                  Vocal and intelligent, Siamese cats are known for their
                  striking blue eyes and sleek dark points. Very affectionate!
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="/mainecoon.jpeg" alt="Maine Coon" />
              </div>
              <div className="flip-card-back">
                <h3>🦅 Maine Coon</h3>
                <p>
                  Large and majestic, Maine Coons are gentle giants with long
                  fur and friendly personalities. Great family pets!
                </p>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="/bengal.jpg" alt="Bengal Cat" />
              </div>
              <div className="flip-card-back">
                <h3>🐆 Bengal</h3>
                <p>
                  Exotic and energetic, Bengal cats have a wild appearance with
                  spotted or marbled coats. Perfect for active homes!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section1">
        <h2>🐾 The Meow World Journey 🐾</h2>
        <ol>
          <li>
            Our passion for cats started when we adopted our first kitten in
            2018, which opened our eyes to the wonderful feline world.
          </li>
          <li>
            In 2020, we decided to create this community to share cat care tips,
            breed information, and heartwarming stories.
          </li>
          <li>
            We've helped rescue over 500 cats and found them loving homes
            through our shelter partnerships.
          </li>
          <li>
            Since then, our community has grown to include thousands of cat
            lovers from around the globe sharing their experiences and love for
            cats!
          </li>
        </ol>
        <blockquote>
          "Cats teach us about independence, grace, and the simple joy of a good
          purr. They fill our lives with love, laughter, and unconditional
          companionship."
        </blockquote>
      </section>
      <Footer />
    </>
  );
}

export default AboutPage;
