"use strict";

/* =====================================================
   TEWACHEW MITIKE PORTFOLIO
   JAVASCRIPT
===================================================== */


/* ================= ELEMENTS ================= */

const body =
    document.body;

const header =
    document.getElementById("header");

const menuBtn =
    document.getElementById("menuBtn");

const navMenu =
    document.getElementById("navMenu");

const themeBtn =
    document.getElementById("themeBtn");

const typing =
    document.getElementById("typing");

const form =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");

const year =
    document.getElementById("year");


/* ================= PRELOADER ================= */

window.addEventListener("load", () => {

    const preloader =
        document.getElementById("preloader");

    setTimeout(() => {

        preloader.classList.add("hide");

    }, 500);

});


/* ================= MOBILE MENU ================= */

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    const icon =
        menuBtn.querySelector("i");

    if (
        navMenu.classList.contains("active")
    ) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});


/* Close menu after clicking */

document
    .querySelectorAll(".nav-link")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navMenu.classList.remove(
                    "active"
                );

                const icon =
                    menuBtn.querySelector("i");

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }
        );

    });


/* ================= HEADER ================= */

function updateHeader() {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener(
    "scroll",
    updateHeader
);

updateHeader();


/* ================= DARK/LIGHT MODE ================= */

function updateThemeIcon() {

    const icon =
        themeBtn.querySelector("i");

    if (
        body.classList.contains("light")
    ) {

        icon.classList.remove("fa-moon");

        icon.classList.add("fa-sun");

    } else {

        icon.classList.remove("fa-sun");

        icon.classList.add("fa-moon");

    }

}


const savedTheme =
    localStorage.getItem(
        "portfolio-theme"
    );


if (savedTheme === "light") {

    body.classList.add("light");

}

updateThemeIcon();


themeBtn.addEventListener(
    "click",
    () => {

        body.classList.toggle("light");

        const theme =
            body.classList.contains("light")
                ? "light"
                : "dark";

        localStorage.setItem(
            "portfolio-theme",
            theme
        );

        updateThemeIcon();

    }
);


/* ================= TYPING ANIMATION ================= */

const roles = [

    "Network Administrator",
    "ICT Officer",
    "Web Developer",
    "Database Administrator",
    "ICT Trainer"

];


let roleIndex = 0;

let charIndex = 0;

let deleting = false;


function typeEffect() {

    const role =
        roles[roleIndex];


    if (!deleting) {

        typing.textContent =
            role.substring(
                0,
                charIndex + 1
            );

        charIndex++;


        if (
            charIndex === role.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1500
            );

            return;
        }

    } else {

        typing.textContent =
            role.substring(
                0,
                charIndex - 1
            );

        charIndex--;


        if (charIndex === 0) {

            deleting = false;

            roleIndex =
                (roleIndex + 1)
                % roles.length;

        }

    }


    setTimeout(
        typeEffect,
        deleting ? 50 : 90
    );

}


typeEffect();


/* ================= ACTIVE NAV ================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


function updateActiveNav() {

    const position =
        window.scrollY + 150;


    sections.forEach(section => {

        const top =
            section.offsetTop;

        const height =
            section.offsetHeight;

        const id =
            section.getAttribute("id");


        if (
            position >= top &&
            position < top + height
        ) {

            navLinks.forEach(link => {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute(
                        "href"
                    ) === `#${id}`
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            });

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav
);


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "show"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ================= COUNTERS ================= */

const counters =
    document.querySelectorAll(
        ".stat span[data-target]"
    );


let counterStarted = false;


function startCounters() {

    if (counterStarted) return;


    const stats =
        document.querySelector(
            ".stats"
        );


    if (!stats) return;


    const rect =
        stats.getBoundingClientRect();


    if (
        rect.top <
        window.innerHeight
    ) {

        counterStarted = true;


        counters.forEach(counter => {

            const target =
                Number(
                    counter.dataset.target
                );

            let current = 0;

            const increment =
                Math.max(
                    1,
                    Math.ceil(
                        target / 40
                    )
                );


            const timer =
                setInterval(() => {

                    current += increment;


                    if (
                        current >= target
                    ) {

                        current = target;

                        clearInterval(timer);

                    }


                    counter.textContent =
                        current;

                }, 35);

        });

    }

}


window.addEventListener(
    "scroll",
    startCounters
);

startCounters();


/* ================= PROJECT FILTER ================= */

const filters =
    document.querySelectorAll(
        ".filter"
    );


const projects =
    document.querySelectorAll(
        ".project"
    );


filters.forEach(filter => {

    filter.addEventListener(
        "click",
        () => {

            filters.forEach(button => {

                button.classList.remove(
                    "active"
                );

            });


            filter.classList.add(
                "active"
            );


            const category =
                filter.dataset.filter;


            projects.forEach(project => {

                const projectCategory =
                    project.dataset.category;


                if (
                    category === "all" ||
                    category === projectCategory
                ) {

                    project.classList.remove(
                        "hide"
                    );

                } else {

                    project.classList.add(
                        "hide"
                    );

                }

            });

        }
    );

});


/* ================= CONTACT FORM ================= */

form.addEventListener(
    "submit",
    event => {

        /*
        Netlify Forms handles the actual
        submission after deployment.

        This JavaScript validates the
        user's input first.
        */

        const name =
            document.getElementById(
                "name"
            ).value.trim();


        const email =
            document.getElementById(
                "email"
            ).value.trim();


        const subject =
            document.getElementById(
                "subject"
            ).value.trim();


        const message =
            document.getElementById(
                "message"
            ).value.trim();


        if (
            !name ||
            !email ||
            !subject ||
            !message
        ) {

            event.preventDefault();

            formMessage.textContent =
                "Please complete all fields.";

            formMessage.style.color =
                "#ef4444";

            return;

        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !emailPattern.test(email)
        ) {

            event.preventDefault();

            formMessage.textContent =
                "Please enter a valid email.";

            formMessage.style.color =
                "#ef4444";

            return;

        }

    }
);


/* ================= CURRENT YEAR ================= */

year.textContent =
    new Date().getFullYear();


/* ================= ESCAPE KEY ================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            navMenu.classList.remove(
                "active"
            );

            const icon =
                menuBtn.querySelector("i");

            icon.classList.remove(
                "fa-xmark"
            );

            icon.classList.add(
                "fa-bars"
            );

        }

    }
);


/* ================= BACK TO TOP ================= */

const backTop =
    document.querySelector(
        ".back-top"
    );


backTop.addEventListener(
    "click",
    event => {

        event.preventDefault();

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* ================= CONSOLE ================= */

console.log(
    "Tewachew Mitike Portfolio loaded successfully."
);