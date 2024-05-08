import axios from "axios"
import { DailyPlayers, Player } from "../types/Player.type"

const url = 'http://localhost:3000/'
export const api = {
  getTodayDailyPlayers: async () => {
    const response = await axios.get<DailyPlayers>(`${url}players/today-daily-players`)
    return response.data
  },
  getPlayers: async (name: string) => {
    const response = await axios.get<Player[]>(`${url}players?name=${name}`)
    return response.data
  },
  getRandomsPlayers: async () => {
    const response = await axios.get<DailyPlayers>(`${url}players/randoms`)
    return response.data
  }
}
