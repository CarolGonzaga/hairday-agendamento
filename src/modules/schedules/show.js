import dayjs from "dayjs";

// Seleciona os elementos <ul> correspondentes a cada período do dia
const periodMorning = document.getElementById("period-morning");
const periodAfternoon = document.getElementById("period-afternoon");
const periodNight = document.getElementById("period-night");

// Função que renderiza os agendamentos em suas respectivas seções
export function schedulesShow({ dailySchedules }) {
    try {
        // Limpa as listas anteriores para não duplicar os itens
        periodMorning.innerHTML = "";
        periodAfternoon.innerHTML = "";
        periodNight.innerHTML = "";

        // Ordena os agendamentos pela hora (mais cedo para mais tarde)
        dailySchedules.sort((a, b) => {
            return new Date(a.when) - new Date(b.when);
        });

        // Para cada agendamento, cria e insere o item na interface
        dailySchedules.forEach((schedule) => {
            const item = document.createElement("li");
            const time = document.createElement("strong");
            const name = document.createElement("span");

            // Define o ID do agendamento no item como data-id (usado no cancelamento)
            item.setAttribute("data-id", schedule.id);

            // Formata o horário como "HH:mm" (ex: "14:00")
            time.textContent = dayjs(schedule.when).format("HH:mm");

            // Insere o nome do cliente
            name.textContent = schedule.name;

            // Cria o ícone de cancelamento
            const cancelIcon = document.createElement("img");
            cancelIcon.classList.add("cancel-icon");
            cancelIcon.setAttribute("src", "./src/assets/cancel.svg");
            cancelIcon.setAttribute("alt", "Cancelar agendamento");

            // Adiciona os elementos ao item <li>
            item.append(time, name, cancelIcon);

            // Verifica em qual período do dia o agendamento se encaixa
            const hour = dayjs(schedule.when).hour();

            if (hour <= 12) {
                periodMorning.appendChild(item);
            } else if (hour > 12 && hour <= 18) {
                periodAfternoon.appendChild(item);
            } else {
                periodNight.appendChild(item);
            }
        });
    } catch (error) {
        console.log(error);
        alert("Não foi possível exibir os agendamentos.");
    }
}
