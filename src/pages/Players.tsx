import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTitledPlayers } from "../services/playersService.ts";
import { PlayerTitle } from "../types/types.ts";
import PageLoader from "../components/PageLoader.tsx";
import styles from "./Players.module.scss";

const Players: React.FC = () => {
  const navigate = useNavigate();
  const [grandMasters, setGrandMasters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data } = await getTitledPlayers(PlayerTitle.GRAND_MASTER);

      if (data) {
        setGrandMasters(data);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenPlayerProfile = (playerUsername: string) => {
    navigate(`profile/${playerUsername}`);
  };

  return (
    <>
      <h1 className={styles.pageTitle}>Grand Masters</h1>

      <div className={styles.listContainer}>
        {
          isLoading
          ? <PageLoader />
          : (
            <ul className={styles.list}>
              {grandMasters.map((playerUsername, index) => <li key={index} onClick={() => handleOpenPlayerProfile(playerUsername)}>{playerUsername}</li>)}
            </ul>
          )
        }
      </div>

      <div className={styles.notes}>
        <b>Sub-optimal Compromises:</b>
        <ul>
          <li>
            The API endpoint <a href="https://api.chess.com/pub/titled/GM">https://api.chess.com/pub/titled/GM</a> does not support server-side pagination,
            which results in the entire list of Grandmasters being displayed on the page at once.
          </li>
          <li>
            I chose not to include icons to support the design, as I was focused on implementing the core functionality.
          </li>
        </ul>
      </div>
    </>
  );
}

export default Players;