"use client";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "components/Generals/Loader";
import NotFound from "components/Generals/Notfound";
import Team from "components/Generals/Team";
import { getTeams } from "lib/getFetchers";
import { getWebInfo } from "lib/webinfo";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState(null);
  const [teams, setTeams] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { info } = await getWebInfo();
      const { members } = await getTeams(`sort=createAt:ascend`);
      setData(info);
      setTeams(members);
      setLoading(false);
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  if (!data && loading === true) {
    return (
      <section>
        <div className="container">
          <Loader />;
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section>
        <div className="container">
          <NotFound />
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
              <li> Бидний тухай </li>
            </div>
            <h4>Бидний тухай</h4>
          </div>
        </div>
      </div>
      <section>
        <div className="container">
          <div
            className=" about-content"
            dangerouslySetInnerHTML={{
              __html: data.policy,
            }}
          ></div>
          <h4 className="seaction-title mt-4">
            Манай <span className="yellow-text"> хамт олон</span>
          </h4>
          <div className="teams ">
            <div className="row">
              {teams &&
                teams.map((team, index) => (
                  <div
                    className={`col-lg-6 ${index == 1 && "mt-4"}`}
                    key={team._id}
                    data-aos="fade-down"
                    data-aos-duration={800}
                  >
                    <Team data={team} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
