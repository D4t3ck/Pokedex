// INCLUDE HTML //

async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // 'includes/header.html'
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

// BASIC STATS //

function renderChart() {
  const ctx = document.getElementById("myChart");
  ctx.height = 200;

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
      indexAxis: "y",
    },
  });
}
