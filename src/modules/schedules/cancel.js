// Função para recarregar a lista de agendamentos do dia
import { schedulesDay } from "./load.js";
// Função que realiza o cancelamento do agendamento na API
import { scheduleCancel } from "../../services/schedule-cancel.js";

// Seleciona todos os containers de período do dia (Manhã, Tarde, Noite)
const periods = document.querySelectorAll(".period");

// Adiciona um evento de clique em cada período
periods.forEach((period) => {
    period.addEventListener("click", async (event) => {
        // Verifica se o clique foi feito sobre o ícone de cancelamento
        if (event.target.classList.contains("cancel-icon")) {
            // Pega o elemento pai <li> mais próximo, que contém o atributo data-id
            const item = event.target.closest("li");

            // Extrai o ID do agendamento a partir do atributo data-id
            const { id } = item.dataset;

            // Se houver um ID válido...
            if (id) {
                // Exibe um alerta de confirmação antes de cancelar
                const isConfirm = confirm(
                    "Tem certeza que deseja cancelar o agendamento?"
                );

                // Se o usuário confirmar...
                if (isConfirm) {
                    // Realiza o cancelamento na API
                    await scheduleCancel({ id });

                    // Recarrega a lista de agendamentos e horários disponíveis
                    schedulesDay();
                }
            }
        }
    });
});
