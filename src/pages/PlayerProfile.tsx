import React, { useEffect, useRef, useState } from "react";
import { format, intervalToDuration } from "date-fns";
import { useParams, Link } from "react-router-dom";
import { getPlayerProfile } from "../services/playersService.ts";
import type { PlayerSummary } from "../types/types";
import PageLoader from "../components/PageLoader.tsx";
import styles from "./PlayerProfile.module.scss";
import ErrorMessage from "../components/ErrorMessage.tsx";

const PlayerProfile: React.FC = () => {
  const { userName } = useParams();
  const [profile, setProfile] = useState<PlayerSummary>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const lastOnlineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage("");

      if (userName) {
        const { data, errors } = await getPlayerProfile(userName);

        if (errors) {
          setErrorMessage(errors);
        }

        if (data) {
          const formattedData: PlayerSummary = {...data};
          
          const dateJoined = new Date(formattedData.joined * 1000);
          formattedData.date_joined = format(dateJoined, "MMM d, yyyy");

          setProfile(formattedData);
        }

        setIsLoading(false);
      }
    };

    fetchData();
  }, [userName]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (profile) {
        const dateTimeNow = new Date();
        const lastOnline = new Date(profile.last_online * 1000);
        const duration = intervalToDuration({ start: lastOnline, end: dateTimeNow });
        const hours = String(duration.hours ?? 0).padStart(2, '0');
        const minutes = String(duration.minutes ?? 0).padStart(2, '0');
        const seconds = String(duration.seconds ?? 0).padStart(2, '0');

        if (lastOnlineRef.current) {
          lastOnlineRef.current.textContent  = `${hours}:${minutes}:${seconds}`;
        }
      } else {
        clearInterval(interval)
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [profile]);


  if (errorMessage) {
    return (
      <>
        <Link to="/" className="button">Back</Link>
        <ErrorMessage message={errorMessage} />
      </>
    )
  }

  if (!profile || isLoading) {
    return <PageLoader />
  }

  return (
    <>
      <Link to="/" className="button">Back</Link>
      <div className={styles.profileSummary}>
        <div className={styles.avatar}>
          <img src={profile.avatar ?? "https://www.chess.com/bundles/web/images/user-image.007dad08.svg"} alt={profile.username} />
        </div>

        <div className={styles.summary}>
          <h2><span>{profile.title}</span> {profile.username}</h2> 

          <div className={styles.details}>
            <div>
              {profile.followers} <label>followers</label> <br />
              <label>Name</label> {profile.name ?? "--"}  <br />
              <label>Player ID</label> {profile.player_id ?? "--"}   <br />
              <label>Joined</label> {profile.date_joined ?? "--"}<br />
              <label>Location</label> {profile.location ?? "--"}  <br />
            </div>
            <div>
              <label>Last Online</label> <span ref={lastOnlineRef}></span> <br />
              <label>Streamer</label> {profile.is_streamer ? "Yes" : "No"}  <br />
              <label>League</label> {profile.league ?? "--"} <br />
              <label>Status</label> {profile.status ?? "--"}  <br />
              <label>Verified</label> {profile.verified ? "Yes" : "No"} <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayerProfile;