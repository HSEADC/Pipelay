import { applyIconButtons } from "@shared/ui";

export function initHeaderControls(): void {
  applyIconButtons({
    goBack: () => {
      window.history.back();
    },
    goForward: () => {
      window.history.forward();
    },
    copyLink: () => {
      const url = window.location.href;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).catch(() => {
          // ignore clipboard errors
        });
        return;
      }

      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      try {
        document.execCommand("copy");
      } catch {
        // ignore copy errors
      }
      document.body.removeChild(input);
    },
    reloadPage: () => {
      window.location.reload();
    },
  });
}