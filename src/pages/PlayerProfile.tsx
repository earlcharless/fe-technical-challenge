import React, { useEffect, useRef, useState } from "react";
import { format, intervalToDuration } from "date-fns";
import { useParams } from "react-router-dom";
import { getPlayerProfile } from "../services/playersService.ts";

const PlayerProfile: React.FC = () => {
  const { userName } = useParams();
  const [profile, setProfile] = useState<any>();
  const lastOnlineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (userName) {
        const { data } = await getPlayerProfile(userName);

        if (data) {
          const formattedData: any = {...data};
          
          const dateJoined = new Date(formattedData.joined * 1000);
          formattedData.joined = format(dateJoined, "MMM d, yyyy");

          setProfile(formattedData);
        }
      }
    };

    fetchData();
  }, [userName]);

  useEffect(() => {
    const interval = setInterval(() => {
      const dateTimeNow = new Date();
      const lastOnline = new Date(profile.last_online * 1000);
      const duration = intervalToDuration({ start: lastOnline, end: dateTimeNow });
      const hours = String(duration.hours ?? 0).padStart(2, '0');
      const minutes = String(duration.minutes ?? 0).padStart(2, '0');
      const seconds = String(duration.seconds ?? 0).padStart(2, '0');

      if (lastOnlineRef.current) {
        lastOnlineRef.current.textContent  = `${hours}:${minutes}:${seconds}`;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [profile]);


  if (!profile) {
    return <>Loading</>
  }

  return (
    <>
      <div>
        <img src={profile.avatar} alt={profile.username} />
      </div>


      country: {profile.country} <br />
      followers: {profile.followers}  <br />
      is_streamer: {profile.is_streamer ? "TRUE" : "FALSE"}  <br />


      joined: {profile.joined}  <br /><br />

      
      last_online_duration: <span ref={lastOnlineRef}></span> <br />
      last_online: {profile.last_online} <br />
      now: {profile.now} <br />
      <br />
      
      league: {profile.league} <br />
      location: {profile.location}  <br />
      name: {profile.name}  <br />
      player_id: {profile.player_id}   <br />
      status: {profile.status}  <br />
      {/* streaming_platforms */}
      title: {profile.title} <br />
      username: {profile.username} <br />
      verified: {profile.verified ? "TRUE" : "FALSE"} <br />
    </>
  );
}

export default PlayerProfile;