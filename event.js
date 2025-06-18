//////לרה חור-211565445-502
///////-313536633-אחמד זוביידאת-502-

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const deleteAllBtn = document.getElementById("deleteAllBtn");
  const addBtn = document.getElementById("addContactBtn");
  const popup = document.getElementById("popupOverlay");
  const form = document.getElementById("contactForm");
  const detailsPopup = document.getElementById("detailsPopup");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = contacts.filter((c) =>
      c.name.toLowerCase().includes(query)
    );
    renderContacts(filtered);
  });

  deleteAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all contacts?")) {
      contacts.length = 0;
      renderContacts([]);
    }
  });

  addBtn.addEventListener("click", () => {
    form.reset();
    popup.classList.remove("hidden");
    form.onsubmit = (ev) => {
      ev.preventDefault();

      const tag = document.getElementById("tagInput").value;
      const birthDate = document.getElementById("birthDateInput").value;
      


      const newContact = {
        name: document.getElementById("nameInput").value,
        phone: document.getElementById("phoneInput").value,
        address: document.getElementById("addressInput").value,
        age: document.getElementById("ageInput").value,
        imageUrl:
          document.getElementById("imageUrlInput").value ||
          "https://i.pravatar.cc/200?u=" + Math.random(),
        tag: tag,
        birthDate
      };
      if (!newContact.name || !newContact.phone) {
        alert("Name and phone are required.");
        return;
      }
      // check for duplicate
      const isDuplicate = contacts.some(
        (c) => c.name.toLowerCase() === newContact.name.toLowerCase()
      );
      if (isDuplicate) {
        alert("A contact with this name already exists!");
        return;
      }

      contacts.push(newContact);
      renderContacts(contacts);
      popup.classList.add("hidden");
    };
  });

  document
    .getElementById("contactsContainer")
    .addEventListener("click", (e) => {
      const index = e.target.dataset.id;
      if (e.target.classList.contains("delete-btn")) {
        contacts.splice(index, 1);
        renderContacts(contacts);
      }

      if (e.target.classList.contains("edit-btn")) {
        const contact = contacts[index];
        document.getElementById("nameInput").value = contact.name;
        document.getElementById("phoneInput").value = contact.phone;
        document.getElementById("addressInput").value = contact.address;
        document.getElementById("ageInput").value = contact.age;
        document.getElementById("imageUrlInput").value = contact.imageUrl;

        popup.classList.remove("hidden");

        form.onsubmit = (ev) => {
          ev.preventDefault();
          contacts[index] = {
            name: document.getElementById("nameInput").value,
            phone: document.getElementById("phoneInput").value,
            address: document.getElementById("addressInput").value,
            age: document.getElementById("ageInput").value,
            imageUrl:
              document.getElementById("imageUrlInput").value ||
              "https://i.pravatar.cc/200?u=" + Math.random(),
          };
          renderContacts(contacts);
          popup.classList.add("hidden");
        };
      }

      if (e.target.classList.contains("view-btn")) {
        const contact = contacts[index];
        const today = new Date();
        const isBirthday =
          contact.birthDate &&
          new Date(contact.birthDate).getDate() === today.getDate() &&
          new Date(contact.birthDate).getMonth() === today.getMonth();

        if (isBirthday) {
          alert(`🎉 Happy Birthday to ${contact.name}! 🎂`);
          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
          });
        }
       
        

        const html = `
        <img src="${
          contact.imageUrl
        }" class="avatar" style="margin-bottom:1rem">
        <h3>${contact.name}</h3>
        <p>📞 ${contact.phone}</p>
        ${contact.address ? `<p>📍 ${contact.address}</p>` : ""}
        ${contact.age ? `<p>🎂 ${contact.age} years old</p>` : ""}
         ${
           contact.birthDate ? `<p>📅 Birth Date: ${contact.birthDate}</p>` : ""
         }
      `;
        document.getElementById("detailsContent").innerHTML = html;
        detailsPopup.classList.remove("hidden");
      }
    });

  document.getElementById("closePopup").onclick = () => {
    popup.classList.add("hidden");
  };

  document.getElementById("closeDetails").onclick = () => {
    detailsPopup.classList.add("hidden");
  };
});

document.addEventListener("DOMContentLoaded", () => {
  const cancelBtn = document.getElementById("cancelBtn");
  if (cancelBtn) {
    cancelBtn.onclick = () => {
      document.getElementById("popupOverlay").classList.add("hidden");
    };
  }
});
// 🎭 Mood selector (in header)
document.querySelectorAll(".mood-option").forEach((el) => {
  el.addEventListener("click", () => {
    alert(`You are feeling ${el.dataset.mood} today! `);
  });
});

const myCity = "Haifa";

document.getElementById("findClosestBtn").addEventListener("click", () => {
  const sameCityContacts = contacts.filter((c) => c.address === myCity);

  if (sameCityContacts.length > 0) {
    const name = sameCityContacts[0].name;
    alert(`👋 Closest person to you is ${name} from ${myCity}`);
  } else {
    alert("😢 No one is in your city.");
  }
});

