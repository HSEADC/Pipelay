import "../../index.css";
import { getTestCards, type TestCard } from "@entities/Test";
import { ARTICLE_TAG_LABELS } from "@shared/config";
import {
  applyButtonProps,
  applyIcons,
  applyTestOptions,
  initHeaderControls,
  applyNavigationItems,
  initMobileNav,
  initNavigationPlate,
} from "@shared/ui";

interface TestOption {
  id: string;
  text: string;
}

interface TestQuestion {
  id: string;
  question: string;
  options: TestOption[];
  correctOptionId: string;
  explanation?: string;
}

interface ResultRange {
  min: number;
  max: number;
  title: string;
  description: string;
}

interface ResultScale {
  id: string;
  type: "resultScale";
  ranges: ResultRange[];
}

const isResultScale = (x: unknown): x is ResultScale => {
  if (!x || typeof x !== "object") return false;
  const v = x as Partial<ResultScale>;
  return v.type === "resultScale" && Array.isArray(v.ranges);
};

const isQuestion = (x: unknown): x is TestQuestion => {
  if (!x || typeof x !== "object") return false;
  const v = x as Partial<TestQuestion>;
  return (
    typeof v.id === "string" &&
    typeof v.question === "string" &&
    Array.isArray(v.options) &&
    typeof v.correctOptionId === "string"
  );
};

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const getIntroDescription = (test: TestCard): string => {
  const t = test.tag?.[0];
  if (t === "Productivity") {
    return "Ответьте на несколько вопросов, чтобы понять, насколько хорошо у вас организована система управления задачами.";
  }
  if (t === "Automation") {
    return "Ответьте на несколько вопросов, чтобы оценить уровень автоматизации ваших процессов.";
  }
  if (t === "Practice") {
    return "Ответьте на несколько вопросов, чтобы понять, насколько выстроен ваш рабочий процесс.";
  }
  return "Ответьте на вопросы и получите персональные рекомендации.";
};

function mountTestFlow(
  root: HTMLElement,
  test: TestCard,
  questions: TestQuestion[],
  scale: ResultScale | undefined,
): void {
  type Phase = "intro" | "quiz" | "results";

  let phase: Phase = "intro";
  let questionIndex = 0;
  const answers: Record<string, string> = {};
  let score = 0;

  const tagKey = test.tag?.[0] ?? "";
  const tagLabel = ARTICLE_TAG_LABELS[tagKey] ?? tagKey;

  const computeScore = (): number => {
    let s = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctOptionId) s += 1;
    });
    return s;
  };

  const renderIntro = (): void => {
    root.innerHTML = `
      <section class="TestPage">
        <div class="TestPageIntro">
          <div class="TestPageIntroContent">
            <h1 class="text-h1 TestPageIntroTitle">${escapeHtml(test.title)}</h1>
            <h3 class="TestPageIntroDesc">${escapeHtml(getIntroDescription(test))}</h3>
            <span class="TestPageTag text-label">${escapeHtml(tagLabel)}</span>
          </div>
          <A_Button id="test-btn-start" data-href="#" data-label="Начать тест"></A_Button>
          <a class="TestPageBtnOutline text-button" href="/tests/">
            <span>Обратно к тестам</span>
            <Q_Icon data-icon="Arrow_Circle_Right" data-alt=""></Q_Icon>
          </a>
        </div>
      </section>
    `;
  };

  const renderQuiz = (): void => {
    const q = questions[questionIndex];
    const selected = answers[q.id] ?? "";
    const isLast = questionIndex === questions.length - 1;

    root.innerHTML = `
      <section class="TestPage TestPage_Quiz">
        <h3 class="TestPageQuizTitle">${escapeHtml(test.title)}</h3>
        <div class="TestPageQuestionCard">
          <div class="TestPageQuestionHeader">
            <span class="TestPageQuestionChip text-label">
              <Q_Icon data-icon="Triangle" data-alt=""></Q_Icon>
              ${questionIndex + 1} вопрос
            </span>
            <p id="test-question-label" class="text-h4 TestPageQuestionText">${escapeHtml(q.question)}</p>
          </div>
          <div class="TestPageOptionsGrid A_TestOptionList" role="group" aria-labelledby="test-question-label">
            ${q.options
              .map(
                (opt) => `
              <A_TestOption
                data-option-id="${escapeHtml(opt.id)}"
                data-letter="${escapeHtml(`${opt.id}`)}"
                data-label="${escapeHtml(opt.text)}"
                data-selected="${selected === opt.id ? "true" : "false"}"
              ></A_TestOption>
            `,
              )
              .join("")}
          </div>
          <button
            type="button"
            class="TestPageNextQuestionBtn text-label"
            id="test-btn-next"
            ${selected ? "" : "disabled"}
          >
            <span>${isLast ? "Завершить тест" : "Следующий вопрос"}</span>
            <Q_Icon data-icon="Arrow_Circle_Right" data-alt=""></Q_Icon>
          </button>
        </div>
        <div class="TestPageBottomNav effect-background-blur-primary">
          <a class="TestPageBottomNavLink text-label" href="/tests/">Обратно к тестам</a>
          <Q_Icon data-icon="Arrow_Circle_Right" data-alt=""></Q_Icon>
        </div>
      </section>
    `;
  };

  const renderResults = (): void => {
    const matched = scale?.ranges.find((range) => score >= range.min && score <= range.max);
    const summaryTitle = matched?.title ?? `${score} из ${questions.length}`;
    const summaryText =
      matched?.description ??
      "Результат рассчитан. Добавьте шкалу интерпретации в данные теста для точного вывода.";

    root.innerHTML = `
      <section class="TestPage TestPage_Results">
        <h3 class="TestPageQuizTitle">${escapeHtml(test.title)}</h3>
        <div class="TestPageResultCard effect-background-blur-primary">
          <div class="TestPageResultHeader">
            <div class="TestPageResultStarWrap">
              <img src="/assets/images/ResultsImage.png" alt="" class="TestPageResultImage" />
            </div>
            <div class="TestPageResultTextBlock">
              <div class="TestPageResultTitleRow">
                <h4>Результаты теста</h4>
                <span class="TestPageResultStarSmall" aria-hidden="true">
                  <Q_Icon data-icon="Star" data-alt=""></Q_Icon>
                </span>
              </div>
              <p class="TestPageResultBand text-h1">${escapeHtml(summaryTitle)}</p>
              <p class="text-p-2 TestPageResultDesc">${escapeHtml(summaryText)}</p>
            </div>
          </div>
          <button type="button" class="TestPageBtnOutline TestPageBtnOutline_wide text-button" id="test-btn-retake">
            <span>Пройти тест заново</span>
            <Q_Icon data-icon="Arrow_Circle_Right" data-alt=""></Q_Icon>
          </button>
        </div>
        <a class="TestPageBtnOutline text-button TestPageBtnOutline_wide" href="/tests/">
          <span>Обратно к тестам</span>
          <Q_Icon data-icon="Arrow_Circle_Right" data-alt=""></Q_Icon>
        </a>
      </section>
    `;
  };

  const render = (): void => {
    if (phase === "intro") renderIntro();
    else if (phase === "quiz") renderQuiz();
    else renderResults();

    applyTestOptions();
    applyIcons();
    applyButtonProps();
    bind();
  };

  const bind = (): void => {
    root.querySelector("#test-btn-start")?.addEventListener("click", (event: Event) => {
      event.preventDefault();
      phase = "quiz";
      questionIndex = 0;
      render();
    });

    root.querySelectorAll<HTMLButtonElement>(".A_TestOption").forEach((btn) => {
      btn.addEventListener("click", () => {
        const q = questions[questionIndex];
        const oid = btn.dataset.optionId;
        if (!oid || !q) return;
        answers[q.id] = oid;
        render();
      });
    });

    root.querySelector("#test-btn-next")?.addEventListener("click", () => {
      const q = questions[questionIndex];
      if (!q || !answers[q.id]) return;
      if (questionIndex < questions.length - 1) {
        questionIndex += 1;
        render();
        return;
      }
      score = computeScore();
      phase = "results";
      render();
    });

    root.querySelector("#test-btn-retake")?.addEventListener("click", () => {
      phase = "quiz";
      questionIndex = 0;
      Object.keys(answers).forEach((k) => {
        delete answers[k];
      });
      score = 0;
      render();
    });
  };

  render();
}

function bootstrap(): void {
  initNavigationPlate();
  initHeaderControls();
  applyNavigationItems();
  initMobileNav();
  const root = document.getElementById("TEST_PAGE_ROOT");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const test = getTestCards().find((item) => item.id === id) ?? getTestCards()[0];

  if (!test) {
    root.innerHTML = `<p class="text-p-1">Тест не найден.</p>`;
    return;
  }

  const items = Array.isArray(test.questions) ? test.questions : [];
  const questions = items.filter(isQuestion);
  const scale = items.find(isResultScale);

  if (!questions.length) {
    root.innerHTML = `<p class="text-p-1">Для этого теста пока нет вопросов.</p>`;
    return;
  }

  mountTestFlow(root, test, questions, scale);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap);
} else {
  bootstrap();
}
