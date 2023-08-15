"use client";
import base from "lib/base";
import Image from "next/image";
import { Carousel } from "react-bootstrap";
const { getBanners } = require("lib/getFetchers");
const { useEffect, useState, useRef } = require("react");

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const videoEl = useRef();
  useEffect(() => {
    const fetchData = async () => {
      const { banners } = await getBanners();
      setBanners(banners);
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (videoEl && videoEl.current) videoEl.current.play();
  }, [banners]);

  return (
    <Carousel interval={8000}>
      {banners &&
        banners.map((el) => (
          <Carousel.Item key={`banner_${el}`}>
            <div className={`BannerBg`}> </div>
            {el.type === "photo" && (
              <div className={`banner-image-box `}>
                <Image
                  className={`banner-image`}
                  width="0"
                  height="0"
                  sizes="100vw"
                  quality="100"
                  src={`${base.cdnUrl}/${el.picture}`}
                />
              </div>
            )}

            {el.type === "video" && (
              <div className="banner-video-box">
                <video
                  ref={videoEl}
                  className="background__video"
                  autoplay
                  loop
                  muted
                  src={`${base.cdnUrl}/${el.video}`}
                ></video>
              </div>
            )}
            <div className="slider-caption">
              <div className="container">
                <div className="caption-text">
                  <span className={`slider__headname`}>
                    <b>#</b> GERMON DENTAL CLINIC{" "}
                  </span>
                  <h3
                    className={`slider__name`}
                    dangerouslySetInnerHTML={{
                      __html: el.name,
                    }}
                  ></h3>
                  <p className={`slider__description`}>{el.details}</p>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default Banner;
