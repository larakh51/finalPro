//////לרה חור-211565445-502
///////-313536633-אחמד זוביידאת-502-


"use strict";

document.addEventListener("DOMContentLoaded", () => {
  renderContacts(contacts);
});

function renderContacts(list) {
  const container = document.getElementById("contactsContainer");
  container.innerHTML = "";

  list.forEach((contact, index) => {
    const today = new Date();
    const isBirthday =
      contact.birthDate &&
      new Date(contact.birthDate).getDate() === today.getDate() &&
      new Date(contact.birthDate).getMonth() === today.getMonth();
    const birthdayIcon = isBirthday ? '<span class="birthday">🎂</span>' : "";
  

    const card = document.createElement("div");
    card.className = "contact-card";
    card.addEventListener("mouseover", () => {
      card.classList.add("hovered");
    });
    card.addEventListener("mouseout", () => {
      card.classList.remove("hovered");
    });
    const tagLabel = contact.tag
      ? `<span class="tag-label ${contact.tag}">${contact.tag}</span>`
      : "";


    card.innerHTML = `
      <img class="avatar" src="${contact.imageUrl}" alt="${contact.name}">
      <div class="info">
        <div class="contact-name">${contact.name} ${tagLabel}${birthdayIcon}</div>

        <div class="contact-phone">📞 ${contact.phone}</div>
        <div class="card-buttons">
          <button class="view-btn" data-id="${index}">ℹ️</button>
          <button class="edit-btn" data-id="${index}">✏️</button>
          <button class="delete-btn" data-id="${index}">🗑️</button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  updatePeopleCount();
}

function updatePeopleCount() {
  document.getElementById("peopleCount").textContent = contacts.length;
}





// const events = [
//   {
//     name: "Music Festival",
//     image:
//       "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     date: "2025-06-15",
//   },
//   {
//     name: "Art Exhibition",
//     image:
//       "https://images.pexels.com/photos/69903/pexels-photo-69903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     date: "2025-07-01",
//   },
//   {
//     name: "Tech Conference",
//     image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg",
//     date: "2025-08-10",
//   },
// ];

// const gallery = document.getElementById("eventGallery");

// events.forEach((event) => {
//   const card = document.createElement("div");
//   card.className = "event-card";
//   card.innerHTML = `
//     <img src="${event.image}" alt="${event.name}">
//     <div class="event-info">
//       <h3>${event.name}</h3>
//       <p>${event.date}</p>
//     </div>
//   `;
//   gallery.appendChild(card);
// });
