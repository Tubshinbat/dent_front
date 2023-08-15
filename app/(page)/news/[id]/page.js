"use client";
import { faArrowLeft, faClock, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "components/Generals/Loader";
import NotFound from "components/Generals/Notfound";
import base from "lib/base";
import { getIdNews, getNews } from "lib/getFetchers";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const [data, setData] = useState(null);
  const [newNews, setNewNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { news } = await getIdNews(params.id);
      const { news: newNews } = await getNews(`limit=4`);
      setData(news);
      setNewNews(newNews);
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

  if (data) {
    return (
      <section>
        <div className="container">
          <div className="page-back">
            <button className="back-btn" onClick={() => router.back()}>
              <FontAwesomeIcon icon={faArrowLeft} /> Буцах
            </button>
          </div>
          <div className="row">
            <div className="col-lg-9">
              <div className="page-details">
                <div className="page-head">
                  <h2> {data.name} </h2>
                  <div className="news-dtl">
                    <li>
                      <FontAwesomeIcon icon={faClock} />{" "}
                      {moment(data.createAt)
                        .utcOffset("+0800")
                        .format("YYYY-MM-DD HH:mm:ss")}
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faEye} /> {data.views}
                    </li>
                  </div>
                </div>
                <div className="page-content">
                  {data.pictures[0] && (
                    <Image
                      src={`${base.cdnUrl}/${data.pictures[0]}`}
                      className="page-content-picture"
                      width="0"
                      height="0"
                      sizes="100vw"
                      quality="100"
                    />
                  )}
                  <div
                    className="page-details"
                    dangerouslySetInnerHTML={{
                      __html: data.details,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="sides sticky-top">
                <div className="side">
                  <h5> Шинэ зөвлөгөө мэдээлэл</h5>
                  <div className="side-content">
                    {newNews &&
                      newNews.map((el) => (
                        <div className="side-news" key={el._id}>
                          <Link
                            href={`/news/${el._id}`}
                            className="side-news-pic-box"
                          >
                            <Image
                              src={`${base.cdnUrl}/450/${el.pictures[0]}`}
                              width="0"
                              height="0"
                              sizes="100vw"
                              quality="100"
                              className="side-news-picture"
                            />
                          </Link>
                          <Link
                            href={`/news/${el._id}`}
                            className="side-news-title"
                          >
                            {" "}
                            {el.name}
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
