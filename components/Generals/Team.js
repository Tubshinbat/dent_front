import base from "lib/base";
import Image from "next/image";
import { Button, Modal, Space } from "antd";

const Team = ({ data }) => {
  const info = () => {
    Modal.info({
      title: data.name,
      content: (
        <div
          dangerouslySetInnerHTML={{
            __html: data.about,
          }}
        ></div>
      ),
      onOk() {},
    });
  };

  return (
    <div className="team">
      <div className="team-picture-box">
        <Image
          className="team-picture"
          width="0"
          height="0"
          sizes="100vw"
          quality="100"
          src={`${base.cdnUrl}/${data.picture}`}
        />
      </div>
      <div className="team-info">
        <h4> {data.name}</h4>
        <p className="position"> {data.position}</p>
        <div
          className="team-details"
          dangerouslySetInnerHTML={{
            __html: data.about,
          }}
        ></div>
        <button onClick={info}>Дэлгэрэнгүй</button>
      </div>
    </div>
  );
};

export default Team;
