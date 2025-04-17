// Função que exibe os horários disponíveis para agendamento
import { hoursLoad } from "../form/hours-load";
// Função que busca os agendamentos da API
import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js";
// Função que exibe os agendamentos na interface
import { schedulesShow } from "./show.js";

// Seleciona o input de data do formulário
const selectedDate = document.getElementById("date");

// Função que recarrega os dados de agendamento para o dia selecionado
export async function schedulesDay() {
    // Pega o valor atual do input de data (formato YYYY-MM-DD)
    const date = selectedDate.value;

    // Faz uma requisição para a API buscando todos os agendamentos do dia
    const dailySchedules = await scheduleFetchByDay({ date });

    // Renderiza os agendamentos encontrados na interface
    schedulesShow({ dailySchedules });

    // Carrega e renderiza os horários disponíveis com base nos agendamentos atuais
    hoursLoad({ date, dailySchedules });
}
