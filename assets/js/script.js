document.addEventListener("DOMContentLoaded", async () => {
  const headerTarget = document.querySelector("#site-header");
  const footerTarget = document.querySelector("#site-footer");

  if (headerTarget) {
    await loadPartial(headerTarget, "header.html", () => {
      setActiveNavLink(headerTarget);
      initMobileMenu(headerTarget);
    });
  }

  if (footerTarget) {
    await loadPartial(footerTarget, "footer.html");
  }
});

async function loadPartial(target, path, afterLoad) {
  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`${path} request failed: ${response.status}`);
    }

    target.innerHTML = await response.text();

    if (afterLoad) {
      afterLoad();
    }
  } catch (error) {
    console.error(`Unable to load ${path}`, error);
  }
}

function setActiveNavLink(headerTarget) {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const activeClasses = [
    "text-secondary-fixed-dim",
    "font-bold",
    "border-b-2",
    "border-secondary-fixed-dim",
    "pb-1",
  ];
  const inactiveClasses = [
    "text-on-surface",
    "dark:text-on-surface-variant",
    "hover:text-secondary-fixed-dim",
    "transition-colors",
    "duration-300",
  ];

  headerTarget.querySelectorAll("[data-nav-link]").forEach((link) => {
    const linkPage = link.getAttribute("href");
    link.removeAttribute("aria-current");
    link.classList.remove(...activeClasses);
    link.classList.add(...inactiveClasses);

    if (linkPage === currentPage) {
      link.setAttribute("aria-current", "page");
      link.classList.add(...activeClasses);
      link.classList.remove(...inactiveClasses);
    }
  });
}

function initMobileMenu(headerTarget) {
  const toggle = headerTarget.querySelector("[data-mobile-menu-toggle]");
  const menu = headerTarget.querySelector("[data-mobile-menu]");
  const icon = headerTarget.querySelector("[data-mobile-menu-icon]");

  if (!toggle || !menu) {
    return;
  }

  const closeMenu = () => {
    menu.classList.add("hidden");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");

    if (icon) {
      icon.textContent = "menu";
    }
  };

  const openMenu = () => {
    menu.classList.remove("hidden");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation menu");

    if (icon) {
      icon.textContent = "close";
    }
  };

  toggle.addEventListener("click", () => {
    if (menu.classList.contains("hidden")) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  menu.querySelectorAll("a[href]").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });
}
