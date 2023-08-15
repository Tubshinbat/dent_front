"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { getWebInfo } from "lib/webinfo";
import { useEffect, useState } from "react";
import { getSocialLinks } from "lib/getFetchers";

const Topbar = () => {
  const [info, setInfo] = useState(null);
  const [phone, setPhone] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { info } = await getWebInfo();
      const { socials } = await getSocialLinks();
      if (info) {
        setInfo(info);
        setPhone(info.phone.split(","));
      }
      if (socials) {
        setSocialLinks(socials);
      }
    };
    fetchData().catch((error) => console.log(error));
  }, []);

  return (
    <div className="topbar">
      <div className="container topbar-main">
        <div className="topbar-left">
          {info && (
            <>
              <li className="contact-link">
                <a href={`callto:${phone[0]}`}>
                  <FontAwesomeIcon icon={faPhone} />{" "}
                  {phone[0].substring(0, 4) + "-" + phone[0].substring(4, 8)}{" "}
                </a>
              </li>
              <li className="contact-link">
                <a href={`mailto:${info.email}`}>
                  <FontAwesomeIcon icon={faEnvelope} /> {info.email}
                </a>
              </li>
            </>
          )}
        </div>
        <div className="topbar-right">
          <ul className="social-links">
            {socialLinks.map((el) => (
              <a href={`${el.link}`} target="_blank" className="social-link">
                <FontAwesomeIcon
                  icon={
                    (el.name === "facebook" && faFacebookF) ||
                    (el.name === "twitter" && faTwitter) ||
                    (el.name === "youtube" && faYoutube)
                  }
                />
              </a>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
