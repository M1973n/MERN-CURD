import { useAuth } from "../store/auth";

export const Service = () => {
  const { services } = useAuth();
  console.log("Services data:", services);

  if (!services) {
    return <p>Loading services...</p>; // Display a loading message when services are not yet available
  }

  if (services.length === 0) {
    return <p>No services available</p>; // Display a message when services are an empty array
  }

  return (
    <section>
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>

      <div className="container grid grid-two-cols">
        {services.map((manElem, index) => {
          return (
            <div className="card" key={index}>
              <div className="card-img">
                <img
                  src="images/web.png"
                  alt="our services info"
                  width="200"
                  height="200"
                />
              </div>
              <div className="card-details">
                <div className="grid grid-two-cols">
                  <p>{manElem.provider}</p>
                  <p>Rs.{manElem.price}</p>
                </div>
                <h2>{manElem.service}</h2>
                <p>{manElem.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
