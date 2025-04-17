import { schedulesDay } from "./schedules/load.js";

// Ao carregar o DOM completamente, executa a função que exibe os agendamentos do dia
document.addEventListener("DOMContentLoaded", function () {
    schedulesDay();
});
