function selectionMade(event, selects) {
  let select = event.target;
  let img = document.getElementById(select.id.replace("c", ""));

  img.src = `img/candidatos/${select.value}`;

  let allSelected = false;

  for (let s of selects) {
    if (s.value === "") {
      allSelected = false;
      break;
    } else {
      allSelected = true;
    }
  }

  if (allSelected) {
    for (let s of selects) {
      s.style = "display:none;";
    }
  }
}

function main() {
  const downloadButton = document.getElementById("downloadButton");

  const cells = {
    A1: document.getElementById("A1"),
    A2: document.getElementById("A2"),
    B1: document.getElementById("B1"),
    B2: document.getElementById("B2"),
    C1: document.getElementById("C1"),
    C2: document.getElementById("C2"),
    D1: document.getElementById("D1"),
    D2: document.getElementById("D2"),
    E1: document.getElementById("E1"),
    E2: document.getElementById("E2"),
  };

  const selects = document.querySelectorAll("select.candidatos");

  const candidatosJson = JSON.parse(
    document.querySelector("meta[name='candidatos']").content
  );

  for (let select of selects) {
    let opt = document.createElement("option");
    opt.text = "";
    select.appendChild(opt);

    for (let candidato of candidatosJson.candidatos) {
      let opt = document.createElement("option");
      opt.text = candidato.name;
      opt.value = candidato.img;
      select.appendChild(opt);
    }

    select.addEventListener("change", (e) => {
      selectionMade(e, selects);
    });
  }

  downloadButton.addEventListener("click", (e) => {
    html2canvas(document.querySelector(".table"), { logging: false }).then(
      (canvas) => {
        let a = document.createElement("a");
        a.href = canvas.toDataURL("image/jpeg");
        a.download = "tualianza.jpg";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    );
  });
}

window.addEventListener("DOMContentLoaded", () => {
  main();
});
