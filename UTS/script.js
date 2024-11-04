document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll("[data-aos]");
  const categoryButtons = document.querySelectorAll(".category-button");
  const categories = document.querySelectorAll(".category");

  let currentIndex = 0;
  let currentCategory = "kopi";

  function checkVisibility() {
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        element.classList.add("visible");
      }
    });
  }

  // Fungsi untuk menampilkan kategori yang dipilih
  function showCategory(selectedCategory) {
    let categoryFound = false;

    categories.forEach((cat) => {
      if (cat.classList.contains(selectedCategory)) {
        cat.classList.remove("hidden");
        categoryFound = true;
        currentCategory = selectedCategory;
        currentIndex = 0;
        updateCardDisplay(cat);
      } else {
        cat.classList.add("hidden");
      }
    });

    if (!categoryFound) {
      console.log(`Ups! Maaf produknya belum ada nih`);
    }
  }

  // Fungsi untuk menampilkan satu kartu dari kategori yang dipilih
  function updateCardDisplay(category) {
    const cards = category.querySelectorAll(".card");
    cards.forEach((card, index) => {
      card.classList.remove("active");
      if (index === currentIndex) {
        card.classList.add("active");
      }
    });
  }

  // Fungsi untuk menampilkan kartu berikutnya dalam kategori
  function showNext() {
    const category = document.querySelector(`.category.${currentCategory}`);
    const cards = category.querySelectorAll(".card");
    currentIndex = (currentIndex + 1) % cards.length;
    updateCardDisplay(category);
  }

  // Fungsi untuk menampilkan kartu sebelumnya dalam kategori
  function showPrev() {
    const category = document.querySelector(`.category.${currentCategory}`);
    const cards = category.querySelectorAll(".card");
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCardDisplay(category);
  }

  // Event listener untuk setiap tombol kategori
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");
      showCategory(category);
    });
  });

  // Event listener untuk tombol navigasi
  document.querySelector(".next").addEventListener("click", showNext);
  document.querySelector(".prev").addEventListener("click", showPrev);

  window.addEventListener("scroll", checkVisibility);
  checkVisibility();

  // Tampilkan kategori "Kopi" secara default saat halaman dimuat
  showCategory("kopi");
});
