//======================================
// EXPORTAR PDF
// Dashboard Gerencial ENTEL
//======================================

document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("btnPDF");

    if (!btn) return;

    btn.addEventListener("click", exportarPDF);

});

async function exportarPDF() {

    const btn = document.getElementById("btnPDF");

    btn.disabled = true;
    btn.innerHTML = "⏳ Generando PDF...";

    try {

        const dashboard = document.querySelector(".contenido");

        // Esperar a que carguen las fuentes
        if (document.fonts) {
            await document.fonts.ready;
        }

        // Generar imagen HD
        const dataUrl = await htmlToImage.toPng(dashboard, {

            cacheBust: true,

            pixelRatio: 3,

            backgroundColor: "#ffffff"

        });

        const { jsPDF } = window.jspdf;

        const pdf = new jsPDF({

            orientation: "landscape",

            unit: "mm",

            format: "a4"

        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const margen = 8;

        const img = new Image();

        img.src = dataUrl;

        await new Promise(resolve => {

            img.onload = resolve;

        });

        const imgWidth = pdfWidth - margen * 2;

        const imgHeight = (img.height * imgWidth) / img.width;

        let alturaRestante = imgHeight;

        let posicion = margen;

        pdf.addImage(
            dataUrl,
            "PNG",
            margen,
            posicion,
            imgWidth,
            imgHeight,
            "",
            "FAST"
        );

        alturaRestante -= (pdfHeight - margen);

        while (alturaRestante > 0) {

            posicion = alturaRestante - imgHeight + margen;

            pdf.addPage();

            pdf.addImage(
                dataUrl,
                "PNG",
                margen,
                posicion,
                imgWidth,
                imgHeight,
                "",
                "FAST"
            );

            alturaRestante -= (pdfHeight - margen);

        }

        pdf.save("Dashboard_Gerencial_Entel.pdf");

    }

    catch (error) {

        console.error(error);

        alert("No fue posible generar el PDF.");

    }

    btn.disabled = false;

    btn.innerHTML = "📄 Descargar PDF";

}