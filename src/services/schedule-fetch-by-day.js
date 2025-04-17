import dayjs from "dayjs";
import { apiConfig } from "./api-config";

// Função que retorna apenas os agendamentos do dia selecionado
export async function scheduleFetchByDay({ date }) {
    try {
        // Busca todos os agendamentos da API
        const response = await fetch(`${apiConfig.baseURL}/schedules`);
        const data = await response.json();

        // Filtra os agendamentos para retornar apenas os do mesmo dia
        const dailySchedules = data.filter((schedule) =>
            dayjs(date).isSame(schedule.when, "day")
        );

        return dailySchedules;
    } catch (error) {
        console.log(error);
        alert("Não foi possível buscar os agendamentos do dia selecionado.");
    }
}
