document.addEventListener("DOMContentLoaded", async () => {
  const headerTarget = document.querySelector("#site-header");
  const footerTarget = document.querySelector("#site-footer");

  if (headerTarget) {
    await loadPartial(headerTarget, "header.html", () => {
      setActiveNavLink(headerTarget);
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

  headerTarget.querySelectorAll("nav .hidden.md\\:flex a[href]").forEach((link) => {
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
