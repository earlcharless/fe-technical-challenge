import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayerProfile } from "../services/playersService.ts";

const PlayerProfile: React.FC = () => {
  const { userName } = useParams();
  const [profile, setProfile] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      if (userName) {
        const { data } = await getPlayerProfile(userName);

        console.log(data);

        if (data) {
          const formattedData: any = {...data};
          
          const dateJoined = new Date(formattedData.joined * 1000);
          console.log({ dateJoined });
          formattedData.joined = dateJoined.toLocaleDateString();
          setProfile(formattedData);
        }
      }
    };

    fetchData();
  }, [userName]);

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


      joined: {profile.joined}  <br />

      
      last_online: {profile.last_online} <br />
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