// Importa a biblioteca dayjs para lidar com datas
import dayjs from "dayjs";
// Serviço de criação de agendamentos
import { scheduleNew } from "../../services/schedule-new";
// Função para recarregar os agendamentos
import { schedulesDay } from "../schedules/load.js";

const form = document.querySelector("form");
const clientName = document.getElementById("client");
const selectedDate = document.getElementById("date");

// Gera a data de hoje em formato compatível com input type="date"
const inputToday = dayjs(new Date()).format("YYYY-MM-DD");

// Define data de hoje como valor inicial e mínimo
selectedDate.value = inputToday;
selectedDate.min = inputToday;

// Evento de envio do formulário de agendamento
form.onsubmit = async (event) => {
    // Evita o comportamento padrão de envio
    event.preventDefault();

    try {
        const name = clientName.value.trim();

        // Validação: nome obrigatório
        if (!name) {
            return alert("Informe o nome do cliente!");
        }

        // Validação: horário obrigatório
        const hourSelected = document.querySelector(".hour-selected");
        if (!hourSelected) {
            return alert("Escolha um horário para agendar!");
        }

        // Extrai a hora do horário selecionado (ex: "09" de "09:00")
        const [hour] = hourSelected.innerText.split(":");
        console.log(hour);

        // Combina a data selecionada com a hora escolhida
        const when = dayjs(selectedDate.value).add(hour, "hour");
        console.log(when);

        // Gera um ID único com base no timestamp atual
        const id = new Date().getTime();

        // Envia os dados para a API (ou json-server)
        await scheduleNew({ id, name, when });

        // Recarrega os agendamentos para refletir o novo
        await schedulesDay();

        // Limpa o campo de nome após agendar
        clientName.value = "";
    } catch (error) {
        alert(
            "Não foi possível realizar o agendamento! Tente novamente mais tarde."
        );
        console.log(error);
    }
};
