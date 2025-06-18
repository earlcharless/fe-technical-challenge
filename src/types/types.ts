export type ApiResponse<T> = {
  status?: number
  data: T | null,
  errors: string | null
};

export enum PlayerTitle {
 GRAND_MASTER = "GM",
}

export type PlayerProfile = {
  avatar: string;
  followers: number;
  is_streamer: boolean;
  joined: number;
  date_joined?: string;
  last_online: number;
  league: string;
  name: string;
  player_id: number;
  status: "string";
  title: PlayerTitle;
  username: string;
  verified: boolean;
};
