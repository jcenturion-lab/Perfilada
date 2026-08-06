//======================================
// INSIGHTS.JS
// Insights Gerenciales v2
//======================================

function construirInsights() {

  const panel = document.getElementById("panelInsights");

  if (!panel) return;

  const ranking = obtenerRanking();

  if (!ranking.length) {

      panel.innerHTML = `
          <div class="alerta warning">
              No existen datos disponibles.
          </div>
      `;

      return;
  }

  //----------------------------------
  // Datos generales
  //----------------------------------

  const mejor = ranking[0];

  const peor = ranking[ranking.length - 1];

  const promedio =
      ranking.reduce((s,e)=>s+e.score,0)/ranking.length;

  const perdidas =
      totalSolicitudes()-totalHabilitadas();

  const recuperables =
      Math.round(perdidas*0.10);

  //----------------------------------
  // Estado del equipo
  //----------------------------------

  let estado="🟢 Excelente";

  if(promedio<85)
      estado="🟡 Atención";

  if(promedio<70)
      estado="🔴 Riesgo";

  //----------------------------------

  panel.innerHTML=`

  <div class="insight verde">

      <h3>🏆 Mejor Ejecutivo</h3>

      <p>${mejor.ejecutivo}</p>

      <strong>${mejor.score.toFixed(1)}</strong>

  </div>

  <div class="insight rojo">

      <h3>🚨 Requiere Atención</h3>

      <p>${peor.ejecutivo}</p>

      <strong>${peor.score.toFixed(1)}</strong>

  </div>

  <div class="insight azul">

      <h3>📊 Estado del Equipo</h3>

      <p>${estado}</p>

      <strong>${promedio.toFixed(1)}</strong>

  </div>

  <div class="insight naranja">

      <h3>💰 Oportunidad Comercial</h3>

      <p>${perdidas} solicitudes no habilitadas</p>

      <strong>+${recuperables} ventas potenciales</strong>

  </div>

  `;

}