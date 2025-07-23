document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const kitapInput = document.getElementById("kitap1");
  const yazarInput = document.getElementsByClassName("kitap0")[1];
  const isbnInput = document.getElementsByClassName("kitap0")[2];
  const turSelect = document.getElementById("Tur");
  const bookList = document.getElementById("book");
  let kitaplar = [];

  function kitaplariYukle() {
    const kayitliKitaplar = localStorage.getItem("kitaplar");
    if (kayitliKitaplar) {
      kitaplar = JSON.parse(kayitliKitaplar);
      kitaplar.forEach((kitap) => {
        const yeniSatir = document.createElement("tr");
        const isimTD = document.createElement("td");
        const yazarTD = document.createElement("td");
        const turTD = document.createElement("td");
        const isbnTD = document.createElement("td");
        const deleteButton = document.createElement("button");

        isbnTD.classList.add("isbn");
        deleteButton.textContent = "Sil";
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", function (e) {
          e.target.closest("tr").remove();
          kitapSil(kitap.isbn);
          alert("silindi");
        });

        isimTD.textContent = kitap.kitap;
        yazarTD.textContent = kitap.yazar;
        turTD.textContent = kitap.tur;
        isbnTD.textContent = kitap.isbn;

        isbnTD.appendChild(deleteButton);

        yeniSatir.appendChild(isimTD);
        yeniSatir.appendChild(yazarTD);
        yeniSatir.appendChild(turTD);
        yeniSatir.appendChild(isbnTD);
        bookList.appendChild(yeniSatir);
      });
    }
  }

  function kitapEkle(yeniKitap) {
    const kayitliKitaplar = localStorage.getItem("kitaplar");
    let kitapListesi = kayitliKitaplar ? JSON.parse(kayitliKitaplar) : [];
    kitapListesi.push(yeniKitap);
    localStorage.setItem("kitaplar", JSON.stringify(kitapListesi));
  }

  function kitapSil(isbn) {
    const kayitliKitaplar = localStorage.getItem("kitaplar");
    if (kayitliKitaplar) {
      let kitapListesi = JSON.parse(kayitliKitaplar);
      kitapListesi = kitapListesi.filter((kitap) => kitap.isbn !== isbn);
      localStorage.setItem("kitaplar", JSON.stringify(kitapListesi));
    }
  }

  kitaplariYukle();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const kitap = kitapInput.value.trim();
    const yazar = yazarInput.value.trim();
    const isbn = isbnInput.value.trim();
    const tur = turSelect.value;

    if (!kitap || !yazar || !isbn) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    const yeniSatir = document.createElement("tr");
    const isimTD = document.createElement("td");
    const yazarTD = document.createElement("td");
    const turTD = document.createElement("td");
    const isbnTD = document.createElement("td");
    const deleteButton = document.createElement("button");

    isbnTD.classList.add("isbn");

    deleteButton.textContent = "Sil";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", function (e) {
      e.target.closest("tr").remove();
      kitapSil(isbn); // localStorage'dan sil
      alert("silindi");
    });

    isimTD.textContent = kitap;
    yazarTD.textContent = yazar;
    turTD.textContent = tur;
    isbnTD.textContent = isbn;

    isbnTD.appendChild(deleteButton);

    yeniSatir.appendChild(isimTD);
    yeniSatir.appendChild(yazarTD);
    yeniSatir.appendChild(turTD);
    yeniSatir.appendChild(isbnTD);
    bookList.appendChild(yeniSatir);

    // Yeni kitabı localStorage'a ekleemek için yazdım
    kitapEkle({ kitap, yazar, isbn, tur });

    kitapInput.value = "";
    yazarInput.value = "";
    isbnInput.value = "";
    turSelect.selectedIndex = 0;
  });
});
