import { applyTestOptions } from "@shared/ui";

export default {
  title: "shared/ui/atoms/A_TestOption",
};

export const Default = {
  render: () => {
    const root = document.createElement("div");
    root.style.padding = "16px";
    root.style.maxWidth = "640px";

    root.innerHTML = `
      <div class="A_TestOptionList" style="display: grid; gap: 12px;">
        <A_TestOption data-option-id="a" data-letter="A" data-label="Первый вариант ответа" data-selected="false"></A_TestOption>
        <A_TestOption data-option-id="b" data-letter="B" data-label="Второй вариант" data-selected="true"></A_TestOption>
        <A_TestOption data-option-id="c" data-letter="C" data-label="Третий вариант" data-selected="false"></A_TestOption>
      </div>
    `;

    document.body.appendChild(root);
    applyTestOptions();
    root.remove();
    return root;
  },
};

export const Single = {
  render: () => {
    const root = document.createElement("div");
    root.style.padding = "16px";
    root.style.maxWidth = "480px";
    root.innerHTML = `
      <A_TestOption data-option-id="only" data-letter="A" data-label="Единственный вариант" data-selected="false"></A_TestOption>
    `;
    document.body.appendChild(root);
    applyTestOptions();
    root.remove();
    return root;
  },
};
