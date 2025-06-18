import axios from "axios"
import type { PlayerTitle } from "../utils/constants";
import type { ApiResponse } from "../types/types";
import api from "./api";

const getTitledPlayers = async (title: PlayerTitle): Promise<ApiResponse<string[]>> => {
  try {
    const { status, data } = await api.get(`/titled/${title}`);

    return {
      status,
      data: data.players,
      errors: null,
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.status, error.message);
      return {
        status: error.response?.status,
        data: null,
        errors: error.message,
      }
    }

    return {
      data: null,
      errors: "Somethin went wrong",
    }
  }
};

const getPlayerProfile = async (userName: string): Promise<ApiResponse<string[]>> => {
  try {
    const { status, data } = await api.get(`/player/${userName}`);

    return {
      status,
      data,
      errors: null,
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.status, error.message);
      return {
        status: error.response?.status,
        data: null,
        errors: error.message,
      }
    }

    return {
      data: null,
      errors: "Somethin went wrong",
    }
  }
};

export {
  getTitledPlayers,
  getPlayerProfile,
}