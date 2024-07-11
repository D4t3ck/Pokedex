/**
 * Includes HTML content from external files into elements with the attribute 'include-html'.
 * @returns {Promise<void>} A promise that resolves when HTML content is included successfully.
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

/**
 * Renders a bar chart displaying the basic stats of the current Pokémon.
 */
function renderChart() {
  const ctx = document.getElementById("myChart").getContext("2d");
  if (ctx) {
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["HP", "Attack", "Defense", "Sp-Attack", "Sp-Def", "Speed"],
        datasets: [
          {
            label: "Basic Stats",
            data: [
              currentCard.stats[0].base_stat,
              currentCard.stats[1].base_stat,
              currentCard.stats[2].base_stat,
              currentCard.stats[3].base_stat,
              currentCard.stats[4].base_stat,
              currentCard.stats[5].base_stat,
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
      },
    });
  } else {
    console.error("Chart canvas not found");
  }
}

