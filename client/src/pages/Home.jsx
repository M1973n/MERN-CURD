import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>We are the World Best IT Company</p>
              <h1>Welcome to my site</h1>
              <p>
                Are you ready to take your business to the next level with
                cutting-edge IT solutions? Look no further! At me,
                we specialize in providing innovative IT services and solutions
                tailored to meet your unique needs.
              </p>
              <div className="btn btn-group">
                <Link to="/contact">
                  <button className="btn">Connect Now</button>
                </Link>
                <Link to="/services">
                  <button className="btn secondary-btn">Learn More</button>
                </Link>
                {/* Add admin button */}
                <Link to="/admin" className="admin-link">
                  <button className="btn admin-btn">Admin</button>
                </Link>
              </div>
            </div>

            {/* hero images  */}
            <div className="hero-image">
              <img
                src="/images/home2.png"
                alt="coding together"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>

      
      <section className="section-hero">
        <div className="container grid grid-two-cols">
          {/* hero images  */}
          <div className="hero-image">
            <img
              src="/images/home4.png"
              alt="coding together"
              width="400"
              height="500"
            />
          </div>

          <div className="hero-content">
            <p>We are here to help you</p>
            <h1>Get Started Today</h1>
            <p>
              Ready to take the first step towards a more efficient and secure
              IT infrastructure? Contact us today for a free consultation and
              let`s discuss how we can help your business thrive in the digital age.
            </p>
            <div className="btn btn-group">
              <Link to="/contact">
                <button className="btn">Connect Now</button>
              </Link>
              <Link to="/services">
                <button className="btn secondary-btn">Learn More</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
