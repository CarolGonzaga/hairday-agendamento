import { apiConfig } from "./api-config.js";

// Função que envia um novo agendamento para a API
export async function scheduleNew({ id, name, when }) {
    try {
        await fetch(`${apiConfig.baseURL}/schedules`, {
            method: "POST", // Método HTTP para criar novo recurso
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, name, when }), // Dados do agendamento
        });

        alert("Agendamento realizado com sucesso!");
    } catch (error) {
        console.log(error);
        alert("Não foi possível agendar. Tente novamente mais tarde.");
    }
}
