"use client";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "components/Generals/Loader";
import NotFound from "components/Generals/Notfound";
import base from "lib/base";
import { getServices } from "lib/getFetchers";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { services } = await getServices();
      setServices(services);
      setLoading(false);
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  if (loading === true && !services) {
    return (
      <section>
        <div className="container">
          <Loader />
        </div>
      </section>
    );
  }

  return (
    <>
      <div className="page_breadcrumbs">
        <div className="container">
          <div className="breads">
            <div className="bread-list">
              <li>
                <Link href="/">
                  <FontAwesomeIcon icon={faHouse} />
                </Link>
              </li>
              <span> / </span>
              <li> Эмчилгээ, үйлчилгээ </li>
            </div>
            <h4>Эмчилгээ, үйлчилгээ</h4>
          </div>
        </div>
      </div>
      <section>
        <div className="container">
          <div className="row gy-4">
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

            {services.length <= 0 && <NotFound />}
          </div>
        </div>
      </section>{" "}
    </>
  );
}
