// Importa a biblioteca dayjs para trabalhar com datas
import dayjs from "dayjs";

// Importa a lista de horários de funcionamento
import { openingHours } from "../../utils/opening-hours.js";

// Função que aplica o clique aos horários
import { hoursClick } from "./hours-click.js";

// Seleciona o container da lista de horários
const hours = document.getElementById("hours");

// Função que carrega e renderiza os horários disponíveis para a data escolhida
export function hoursLoad({ date, dailySchedules }) {
    // Limpa a lista atual de horários exibidos
    hours.innerHTML = "";

    // Mapeia os horários que já estão ocupados (agendados) no dia selecionado
    const unavailableHours = dailySchedules.map((schedule) =>
        dayjs(schedule.when).format("HH:mm")
    );

    // Gera a lista de horários com base na agenda do dia e na hora atual
    const opening = openingHours.map((hour) => {
        // Extrai somente a parte da hora da string (ex: "08" de "08:00")
        const [scheduleHour] = hour.split(":");

        // Cria a data e hora combinadas e verifica se ela já passou
        const isHourPast = dayjs(date)
            .add(scheduleHour, "hour")
            .isBefore(dayjs()); // true se já passou

        // Horário é considerado disponível se não estiver agendado e ainda não tiver passado
        const available = !unavailableHours.includes(hour) && !isHourPast;

        return {
            hour, // Ex: "08:00"
            available, // true ou false
        };
    });

    // Renderiza cada horário na interface
    opening.forEach(({ hour, available }) => {
        const li = document.createElement("li");
        li.classList.add("hour");

        // Aplica a classe de disponível ou indisponível
        li.classList.add(available ? "hour-available" : "hour-unavailable");

        li.textContent = hour;

        // Insere um cabeçalho indicando o período do dia
        if (hour === "9:00") {
            hourHeaderAdd("Manhã");
        } else if (hour === "13:00") {
            hourHeaderAdd("Tarde");
        } else if (hour === "19:00") {
            hourHeaderAdd("Noite");
        }

        hours.append(li);
    });

    // Ativa o clique nos horários disponíveis
    hoursClick();
}

// Função auxiliar que adiciona um cabeçalho (ex: "Manhã") na lista de horários
function hourHeaderAdd(title) {
    const header = document.createElement("li");
    header.classList.add("hour-period");
    header.textContent = title;
    hours.append(header);
}
