import { schedulesDay } from "../schedules/load.js";

// Seleciona o campo de data da página
const selectedDate = document.getElementById("date");

// Sempre que a data for alterada, recarrega os horários disponíveis
selectedDate.onchange = () => schedulesDay();
