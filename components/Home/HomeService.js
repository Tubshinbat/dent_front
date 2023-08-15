"use client";
import base from "lib/base";
import { getServices } from "lib/getFetchers";
import Link from "next/link";
import { useEffect, useState } from "react";

const HomeService = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { services } = await getServices(`limit=6`);
      setServices(services);
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  return (
    <section className="gray">
      <div className="container">
        <h4 className="seaction-title">
          Манай <span className="yellow-text"> үйлчилгээнүүд</span>
        </h4>
        <div className="row home-services gy-4">
          {services &&
            services.map((service) => (
              <div className="col-lg-4 col-md-6 " key={service._id}>
                <Link
                  href={`/services/${service._id}`}
                  className="service-item"
                  data-aos="fade-up"
                  data-aos-duration={300}
                >
                  <div className="service-header">
                    <div className="service-icon">
                      <img src={`${base.cdnUrl}/${service.pictures[0]}`} />
                    </div>
                    <h4> {service.name}</h4>
                  </div>
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        service.details.length > 120
                          ? service.details.substring(0, 120) + "..."
                          : service.details,
                    }}
                  ></p>
                </Link>
              </div>
            ))}
        </div>
        <div className="section-more">
          <Link href="/services">
            <button className="section-more-btn">Бүх үйлчилгээ харах</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeService;
