import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTitledPlayers } from "../services/playersService.ts";
import { PlayerTitle } from "../types/types.ts";
import PageLoader from "../components/PageLoader.tsx";
import styles from "./Players.module.scss";
import ErrorMessage from "../components/ErrorMessage.tsx";

const Players: React.FC = () => {
  const navigate = useNavigate();
  const [grandMasters, setGrandMasters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage("");

      const { data, errors } = await getTitledPlayers(PlayerTitle.GRAND_MASTER);

      if (errors) {
        setErrorMessage(errors);
      }

      if (data) {
        setGrandMasters(data);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleOpenPlayerProfile = (playerUsername: string) => {
    navigate(`profile/${playerUsername}`);
  };

  if (errorMessage) {
    return <ErrorMessage message={errorMessage} />
  }

  return (
    <>
      <h1 className={styles.pageTitle}>Grand Masters</h1>

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

      {
        isLoading
        ? <PageLoader />
        : (
          <div className={styles.listContainer}>
            <ul className={styles.list}>
              {grandMasters.map((playerUsername, index) => <li key={index} onClick={() => handleOpenPlayerProfile(playerUsername)}>{playerUsername}</li>)}
            </ul>
          </div>
        )
      }
    </>
  );
}

export default Players;