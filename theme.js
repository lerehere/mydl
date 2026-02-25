const themeSwitcher = document.getElementById("themeSwitcher");

function setTheme(theme) {
  if (theme === "auto") {
    document.documentElement.setAttribute("data-bs-theme",
      window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    );
  } else {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }

  localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme") || "auto";
themeSwitcher.value = savedTheme;
setTheme(savedTheme);

themeSwitcher.addEventListener("change", () => {
  setTheme(themeSwitcher.value);
});
// ===== РОЛЬ (демо) =====
const role = localStorage.getItem("role") || "editor"; 
// editor / user

if(role === "editor"){
  document.getElementById("addNewsBtn")?.classList.remove("d-none");
  document.getElementById("addAnnouncementBtn")?.classList.remove("d-none");
}

// ===== ПУБЛИКАЦИЯ =====

function addPost(type){
  const title = prompt("Введите заголовок");
  const text = prompt("Введите текст");

  if(!title || !text) return;

  const post = {title, text, date: new Date().toLocaleDateString()};
  const posts = JSON.parse(localStorage.getItem(type)) || [];
  posts.unshift(post);
  localStorage.setItem(type, JSON.stringify(posts));
  renderPosts(type);
}

function renderPosts(type){
  const container = document.getElementById(type+"List");
  if(!container) return;

  const posts = JSON.parse(localStorage.getItem(type)) || [];
  container.innerHTML = "";

  posts.forEach(post=>{
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5>${post.title}</h5>
            <p>${post.text}</p>
            <small class="text-muted">${post.date}</small>
          </div>
        </div>
      </div>
    `;
  });
}

document.getElementById("addNewsBtn")?.addEventListener("click",()=>addPost("news"));
document.getElementById("addAnnouncementBtn")?.addEventListener("click",()=>addPost("announcements"));

renderPosts("news");
renderPosts("announcements");

// ===== СЧЁТЧИК =====

const counters = document.querySelectorAll(".counter");

counters.forEach(counter=>{
  const update = ()=>{
    const target = +counter.dataset.target;
    const current = +counter.innerText;
    const increment = target / 100;

    if(current < target){
      counter.innerText = Math.ceil(current + increment);
      setTimeout(update, 20);
    } else {
      counter.innerText = target;
    }
  };
  update();
});
// ===== СКРОЛЛ К СЕКЦИЯМ ПО КАРТОЧКАМ =====
const cardScrollMap = {
  "Новости": "news",
  "Объявления": "announcements",
  "Мероприятия": "info" // Можно сделать отдельный div или уточнить
};

// Получаем все карточки
document.querySelectorAll(".custom-card").forEach(card => {
  card.addEventListener("click", () => {
    const title = card.querySelector("h5").innerText;
    const targetId = cardScrollMap[title];
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});
