// Função que permite selecionar um horário clicando sobre ele
export function hoursClick() {
    // Seleciona todos os horários disponíveis no momento
    const hours = document.querySelectorAll(".hour-available");

    // Para cada horário disponível, adiciona um ouvinte de clique
    hours.forEach((available) => {
        available.addEventListener("click", (selected) => {
            // Remove a classe de seleção de todos os itens antes de aplicar no novo
            hours.forEach((hour) => {
                hour.classList.remove("hour-selected");
            });

            // Adiciona a classe de seleção no item clicado
            selected.target.classList.add("hour-selected");
        });
    });
}
