"use client";
import Team from "components/Generals/Team";
import { getTeams } from "lib/getFetchers";
import { useEffect, useState } from "react";

const HomeTeam = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { members } = await getTeams(`limit=4&sort=createAt:ascend`);
      members && setTeams(members);
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  return (
    <section>
      <div className="container">
        <h4 className="seaction-title">
          Манай <span className="yellow-text"> хамт олон</span>
        </h4>
        <div className="teams">
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
  );
};

export default HomeTeam;
