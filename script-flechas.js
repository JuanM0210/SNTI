function dibujarFlechas() {
  const esMovil = window.innerWidth <= 768;

  const canvas = document.getElementById("canvas-flechas");
  const ctx = canvas.getContext("2d");
  canvas.width = document.body.scrollWidth;
  canvas.height = document.body.scrollHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (esMovil) return;

  const colorFlecha = "#800080";

  function flechaCurva(x1, y1, x2, y2, color) {
    const headlen = 8;
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const encoge = 0.85;
    const x2corto = x1 + (x2 - x1) * encoge;
    const y2corto = y1 + (y2 - y1) * encoge;
    const cx = (x1 + x2corto) / 2 + (y2corto - y1) * 0.3;
    const cy = (y1 + y2corto) / 2 - (x2corto - x1) * 0.3;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(cx, cy, x2corto, y2corto);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x2corto, y2corto);
    ctx.lineTo(
      x2corto - headlen * Math.cos(angle - Math.PI / 6),
      y2corto - headlen * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      x2corto - headlen * Math.cos(angle + Math.PI / 6),
      y2corto - headlen * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
  }

  function flechaRecta(x1, y1, x2, y2, color) {
    const headlen = 8;
    const angle = Math.atan2(y2 - y1, x2 - x1);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(
      x2 - headlen * Math.cos(angle - Math.PI / 6),
      y2 - headlen * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      x2 - headlen * Math.cos(angle + Math.PI / 6),
      y2 - headlen * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
  }

  const pares = [
    ["Secretaría General", null, "recta-texto"],
    ["Sría de Prestaciones Económicas,Fom, Dep,Cult y Prev Soc", "img/imagen_7.jpg", "curva"],
    ["Secretaría de Organización, Actas y Acuerdos", "img/imagen_8.jpg", "curva"],
    ["Sría de Formación y Capac, Sindical", "img/imagen_9.jpg", "curva"],
    ["Sría de Trabajo, Conflictos y Acc, Política", "img/imagen_10.jpg", "curva"],
    ["Secretaría de Finanzas", "img/imagen_11.jpg", "curva"],
    ["Secretaría de Escalafón", "img/imagen_12.jpg", "curva"]
  ];

  pares.forEach(([texto, imgSrc, tipo]) => {
    const card = [...document.querySelectorAll(".secretarias .card")]
      .find(el => el.textContent.trim() === texto);

    if (!card) return;

    const cardRect = card.getBoundingClientRect();
    const radioCirculo = cardRect.width / 2;
    const centroCardX = cardRect.left + cardRect.width / 2 + window.scrollX;
    const centroCardY = cardRect.top + cardRect.height / 2 + window.scrollY;

    if (tipo === "recta-texto") {
      const x1 = centroCardX;
      const y1 = centroCardY - radioCirculo - 2;
      const textoSG = [...document.querySelectorAll(".imagen-6-abajo-header p")]
        .find(p => p.textContent.trim().toLowerCase() === "secretaría general");

      if (textoSG) {
        const textoRect = textoSG.getBoundingClientRect();
        const porcentajeET = 0.48; // posición exacta de la "et"
        const x2 = textoRect.left + textoRect.width * porcentajeET + window.scrollX;
        const y2 = textoRect.bottom + window.scrollY;
        flechaRecta(x1, y1, x2, y2, colorFlecha);
      }
    } else if (tipo === "curva") {
      const img = [...document.querySelectorAll("img")]
        .find(el => el.getAttribute("src") === imgSrc);

      if (!img) return;

      const imgRect = img.getBoundingClientRect();
      const centroImgX = imgRect.left + imgRect.width / 2 + window.scrollX;
      const centroImgY = imgRect.top + imgRect.height / 2 + window.scrollY;
      const angulo = Math.atan2(centroImgY - centroCardY, centroImgX - centroCardX);
      const x1 = centroCardX + Math.cos(angulo) * radioCirculo;
      const y1 = centroCardY + Math.sin(angulo) * radioCirculo;
      flechaCurva(x1, y1, centroImgX, centroImgY, colorFlecha);
    }
  });
}

window.addEventListener("load", dibujarFlechas);
window.addEventListener("resize", dibujarFlechas);
window.addEventListener("scroll", dibujarFlechas);
