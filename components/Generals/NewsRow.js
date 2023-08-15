import { faClock, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import base from "lib/base";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

const NewsRow = ({ data }) => {
  return (
    <>
      <div className="news-row-item">
        <div className="news-row-picture-box">
          <Link href={`/news/${data._id}`}>
            <Image
              className="news-row-picture"
              width="0"
              height="0"
              sizes="100vw"
              quality="100"
              src={`${base.cdnUrl}/450/${data.pictures[0]}`}
            />
          </Link>
        </div>
        <div className="news-info">
          <Link href={`/news/${data._id}`}>
            <h4>{data.name}</h4>
          </Link>
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
          <p
            dangerouslySetInnerHTML={{
              __html:
                data.details.length > 120
                  ? data.details.substring(0, 120) + "..."
                  : data.details,
            }}
          ></p>
        </div>
      </div>
    </>
  );
};

export default NewsRow;
