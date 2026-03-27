export interface SearchInputProps {
  placeholder?: string;
}

export function applySearchInputPlaceholder(): void {
  const main = document.querySelector("main");
  const input = document.querySelector<HTMLInputElement>("[data-search-input]");
  if (input && main?.dataset.searchPlaceholder) {
    input.placeholder = main.dataset.searchPlaceholder;
  }
}
