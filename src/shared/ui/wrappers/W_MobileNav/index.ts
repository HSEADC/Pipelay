function closeMenu(burger: HTMLButtonElement, setOpen: (open: boolean) => void): void {
  setOpen(false);
  burger.focus();
}

export function initMobileNav(): void {
  const root = document.querySelector<HTMLElement>(".W_MobileNav");
  if (!root) return;

  const burger = root.querySelector<HTMLButtonElement>(".W_MobileNavBurger");
  const overlay = root.querySelector<HTMLElement>(".W_MobileNavOverlay");
  if (!burger || !overlay) return;

  const backdrop = overlay.querySelector<HTMLElement>(".W_MobileNavBackdrop");

  const setOpen = (open: boolean): void => {
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    overlay.toggleAttribute("hidden", !open);
    overlay.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.classList.toggle("W_MobileNavBodyLock", open);
  };

  burger.addEventListener("click", () => {
    setOpen(overlay.hasAttribute("hidden"));
  });

  backdrop?.addEventListener("click", () => {
    closeMenu(burger, setOpen);
  });

  overlay.querySelectorAll<HTMLAnchorElement>(".M_NavigationItem").forEach((link) => {
    link.addEventListener("click", () => {
      setOpen(false);
    });
  });

  document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key !== "Escape") return;
    if (overlay.hasAttribute("hidden")) return;
    closeMenu(burger, setOpen);
  });
}
