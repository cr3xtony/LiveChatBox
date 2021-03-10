import React, { useEffect } from 'react';
import '../css/InfoBar.css';
import onlineIcon from '../icons/onlineIcon.png';
import closeIcon from '../icons/closeIcon.png';
let roomName;
const InfoBar = ({ roomId }) => {
  const getRoomName = async () => {
    // const user = JSON.parse(localStorage.getItem('userInfo'));
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${user.token}`,
    //   },
    // };
    // const { data } = await axios.get(`/api/chatrooms/${roomId}`, config);
    // roomName = data.name;
  };
  useEffect(() => {
    getRoomName();
  });

  return (
    <>
      <div className="infoBar">
        <div className="leftInnerContainer">
          <img className="onlineIcon" src={onlineIcon} alt="online icon" />
          <h3>{roomId}</h3>
        </div>
        <div className="rightInnerContainer">
          <a href="/">
            <img src={closeIcon} alt="close icon" />
          </a>
        </div>
      </div>
    </>
  );
};

export default InfoBar;
