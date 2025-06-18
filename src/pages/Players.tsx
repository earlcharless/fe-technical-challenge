import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTitledPlayers } from "../services/playersService.ts";
import { PlayerTitle } from "../utils/constants.ts";

const Players: React.FC = () => {
  const navigate = useNavigate();
  const [grandMasters, setGrandMasters] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTitledPlayers(PlayerTitle.GRAND_MASTER);

      if (data) {
        setGrandMasters(data);
      }
    };

    fetchData();
  }, []);

  const handleOpenPlayerProfile = (playerUsername: string) => {
    navigate(`profile/${playerUsername}`);
  };

  return (
    <>
      <h1>Grand Masters</h1>
      <ul>
        {grandMasters.map((playerUsername) => <li onClick={() => handleOpenPlayerProfile(playerUsername)}>{playerUsername}</li>)}
      </ul>
    </>
  );
}

export default Players;