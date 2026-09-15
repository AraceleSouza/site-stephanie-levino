document.addEventListener("DOMContentLoaded", () => {
    /* =========================================================
       MENU MOBILE
       ========================================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("is-open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                nav.classList.remove("is-open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }


    /* =========================================================
       ROLAGEM SUAVE
       ========================================================= */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });


    /* =========================================================
       ANIMAÇÕES AO ROLAR A PÁGINA
       ========================================================= */

    const revealElements = document.querySelectorAll(
        ".section-label, " +
        ".section-heading, " +
        ".procedure-card, " +
        ".why-card, " +
        ".slimming-content, " +
        ".about__content, " +
        ".about__photo, " +
        ".cta__content, " +
        ".cta__image"
    );

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            element.classList.add("reveal");
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }


    /* =========================================================
       MODAL DE PROCEDIMENTOS
       ========================================================= */

    const modal = document.querySelector(".modal");
    const modalTitle = document.querySelector("#modal-title");
    const modalText = document.querySelector("#modal-text");
    const openButtons = document.querySelectorAll(".js-open-modal");
    const closeButtons = document.querySelectorAll(".js-close-modal");

    const openModal = (title, text) => {
        if (!modal || !modalTitle || !modalText) {
            return;
        }

        modalTitle.textContent = title;
        modalText.textContent = text;
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
    };

    const closeModal = () => {
        if (!modal) {
            return;
        }

        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
    };

    openButtons.forEach((button) => {
        button.addEventListener("click", () => {
            openModal(
                button.dataset.title,
                button.dataset.text
            );
        });
    });

    closeButtons.forEach((button) => {
        button.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });
});