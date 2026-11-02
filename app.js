const wrapper = document.querySelector('#wrapper');
const popUp = document.getElementById("pop");
const modalImg = document.getElementById("modal-img");
const modalCaption = document.getElementById("modal-caption");
const closeBtn = document.getElementById("close");

let gallery = [];


async function loadImages(){
    try {
        const response = await fetch("gallery.json")
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        gallery = await response.json();
        render(gallery);
        
    } catch (error) {
        console.error("Could not load images:", error);
        wrapper.textContent = "Sorry, the images could not be loaded.";
    }        
}

function createThumbnail(item, i) {
  const img = document.createElement("img");
  img.src = item.src;
  img.alt = item.caption;
  img.dataset.index = i;
  return img;
}

function render(list) {
  wrapper.innerHTML = "";
  wrapper.append(...list.map(createThumbnail));
}

function openModal(i) {
  const item = gallery[i];
  modalImg.src = item.src;
  modalImg.alt = item.caption;
  modalCaption.textContent = item.caption;
  popUp.style.display = "flex";
}

function closeModal() {
  popUp.style.display = "none";
}

wrapper.addEventListener("click", (event) => {
  const img = event.target.closest("img");
  if (!img) return;
  openModal(Number(img.dataset.index));
});

closeBtn.addEventListener("click", closeModal);
popUp.addEventListener("click", (event) => {
  if (event.target === popUp) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

loadImages();