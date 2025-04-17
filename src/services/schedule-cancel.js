import { apiConfig } from "./api-config.js";

// Função responsável por excluir (cancelar) um agendamento com base no ID
export async function scheduleCancel({ id }) {
    try {
        await fetch(`${apiConfig.baseURL}/schedules/${id}`, {
            method: "DELETE", // Método HTTP para exclusão
        });

        alert("O agendamento foi cancelado com sucesso!");
    } catch (error) {
        console.log(error);
        alert("Não foi possível cancelar o agendamento.");
    }
}
