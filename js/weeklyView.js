//======================================
// WEEKLYVIEW.JS
// Pinta el comparativo semana actual vs. semana anterior
//======================================

function construirComparativoSemanal(){

  const contenedor = document.getElementById("panelComparativoSemanal");

  if(!contenedor) return;

  const c = obtenerComparativoSemanal();

  if(!c){

      contenedor.innerHTML = `<div class="alerta info">Sin datos suficientes para comparar.</div>`;

      return;

  }

  if(!c.anterior){

      contenedor.innerHTML = `<div class="alerta info">Solo hay datos de la Semana ${c.semanaActual}. Se necesita al menos una semana anterior para comparar.</div>`;

      return;

  }

  const filas = [

      { etiqueta: "Solicitudes", key: "solicitudes", esPorcentaje: false },
      { etiqueta: "Habilitadas", key: "habilitadas", esPorcentaje: false },
      { etiqueta: "Conversión", key: "conversion", esPorcentaje: true },
      { etiqueta: "Productividad", key: "productividad", esPorcentaje: false },
      { etiqueta: "Adherencia", key: "adherencia", esPorcentaje: true }

  ];

  contenedor.innerHTML = `

      <div class="kpis">

      ${filas.map(f => {

          const valorActual = c.actual[f.key];
          const valorAnterior = c.anterior[f.key];
          const variacionPct = c.variaciones[f.key];

          const subio = variacionPct !== null && variacionPct >= 0;

          const flecha = variacionPct === null ? "" : (subio ? "▲" : "▼");
          const colorVariacion = variacionPct === null ? "#666" : (subio ? "#16a34a" : "#dc2626");

          const formato = v => f.esPorcentaje ? v.toFixed(1) + "%" : v.toLocaleString("es-PE", { maximumFractionDigits: 2 });

          return `
              <div class="card">
                  <span>${f.etiqueta}</span>
                  <h2>${formato(valorActual)}</h2>
                  <div style="font-size:13px; color:${colorVariacion}; margin-top:6px;">
                      ${flecha} ${variacionPct === null ? "s/d" : Math.abs(variacionPct).toFixed(1) + "%"}
                      vs. Semana ${c.semanaAnterior} (${formato(valorAnterior)})
                  </div>
              </div>
          `;

      }).join("")}

      </div>

  `;

}