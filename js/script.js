// =======================================================
// Footer Loader
// =======================================================

fetch("footer.html")
  .then(res => {
    if (!res.ok) throw new Error("footer.html not found");
    return res.text();
  })
  .then(html => {
    const slot = document.getElementById("footer-slot");
    if (slot) slot.innerHTML = html;
  })
  .catch(err => console.error(err));

// =======================================================
// DOM Ready
// =======================================================

document.addEventListener("DOMContentLoaded", () => {
  // Scroll reveal
  const revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));
  }

  // Contact dropdown
  const dropdown = document.querySelector(".contact-dropdown");

  if (dropdown) {
    const trigger = dropdown.querySelector(".contact-trigger");

    trigger.addEventListener("click", e => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle("open");
      trigger.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", e => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        dropdown.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
        trigger.blur();
      }
    });
  }

  // Quote form -> Gmail compose
  const quoteForm = document.querySelector(".quote-form");

  if (quoteForm) {
    quoteForm.addEventListener("submit", e => {
      e.preventDefault();

      const fullName = document.getElementById("full-name")?.value || "";
      const company = document.getElementById("company")?.value || "Not provided";
      const email = document.getElementById("email")?.value || "";
      const phone = document.getElementById("phone")?.value || "";

      const service = document.getElementById("service");
      const serviceText = service?.options?.[service.selectedIndex]?.text || "Not selected";

      const location = document.getElementById("location")?.value || "";
      const description = document.getElementById("description")?.value || "";

      const subject = encodeURIComponent(`New Quote Request - ${serviceText}`);
      const body = encodeURIComponent(
`NEW PROJECT ENQUIRY

----------------------------------------
CONTACT DETAILS
----------------------------------------

Name: ${fullName}
Company: ${company}
Email: ${email}
Phone: ${phone}

----------------------------------------
PROJECT DETAILS
----------------------------------------

Service: ${serviceText}
Location: ${location}

Description:

${description}

----------------------------------------
Submitted via the ZeMbuduma website.
`
      );

      const gmailURL =
        `https://mail.google.com/mail/?view=cm&fs=1` +
        `&to=${encodeURIComponent("info@zembuduma.co.za")}` +
        `&su=${subject}` +
        `&body=${body}`;

      window.open(gmailURL, "_blank", "noopener");
      quoteForm.reset();
    });
  }
});