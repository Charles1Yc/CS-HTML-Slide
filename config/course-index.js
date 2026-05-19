(function () {
  function normalise(value) {
    return String(value || "").toLowerCase().replace(/\s+/g, " ").trim();
  }

  function countLabel(count, noun) {
    return `${count} 个${noun}`;
  }

  function clearNode(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function sharedCourses() {
    const courses = window.EduHubCourseCatalog && window.EduHubCourseCatalog.courses;
    return Array.isArray(courses) ? courses : [];
  }

  function sharedCourseById(courseId) {
    return sharedCourses().find((course) => course.id === courseId) || null;
  }

  function buildCourseOverviewMarkup(course) {
    const overview = course.overview || {};
    const summary = overview.kind === "progress"
      ? `
        <div class="progress-strip" aria-label="课程覆盖">
          <span class="progress-bar" style="width: ${overview.percent || 0}%"></span>
        </div>
        <div class="progress-meta">
          <span>${overview.left || ""}</span>
          <span>${overview.right || ""}</span>
        </div>
      `
      : `
        <div class="status-note">
          <span>${overview.text || "课件制作中"}</span>
        </div>
      `;

    return `
      <div class="overview-card-top">
        <span class="overview-icon ${course.iconTone || "blue"}" aria-hidden="true">▣</span>
        <span class="track-badge ${course.track?.className || "igcse"}">${course.track?.label || "课程"}</span>
      </div>
      <h3>${course.library?.title || "未命名课程"}</h3>
      <p>${course.library?.subtitle || ""}</p>
      ${summary}
      <div class="overview-card-footer">
        <span>${course.library?.footerLeft || ""}</span>
        <span class="link-arrow">进入课程 →</span>
      </div>
    `;
  }

  function createLibraryCourseCard(course) {
    const link = document.createElement("a");
    link.className = "course-overview-card";
    link.href = course.href || "#";
    link.dataset.libraryCard = "";
    link.dataset.courseId = course.id || "";
    link.dataset.tags = (course.tags || []).join(" ");
    link.dataset.search = course.search || "";
    link.innerHTML = buildCourseOverviewMarkup(course);
    return link;
  }

  function hydrateCourseProfile(root, course) {
    if (!root || !course) {
      return;
    }

    const profile = root.querySelector("[data-course-profile]");
    if (!profile) {
      return;
    }

    profile.innerHTML = `
      <h1>${course.directory?.title || ""}</h1>
      <p>${course.directory?.subtitle || ""}</p>
      <span>${course.directory?.code || ""}</span>
    `;
  }

  function initLibraryPage() {
    if (!document.body.classList.contains("library-page")) {
      return;
    }

    const search = document.getElementById("librarySearch");
    const filters = document.getElementById("libraryFilters");
    const result = document.getElementById("libraryResult");
    const emptyCourses = document.getElementById("libraryEmpty");
    const courseGrid = document.getElementById("courseCardGrid");
    const navButtons = Array.from(document.querySelectorAll("[data-home-target]"));
    const catalogCourses = sharedCourses();

    if (!search || !filters || !result || !emptyCourses || !courseGrid) {
      return;
    }

    if (catalogCourses.length > 0) {
      clearNode(courseGrid);
      catalogCourses.forEach((course) => {
        courseGrid.appendChild(createLibraryCourseCard(course));
      });
    }

    const courseCards = Array.from(courseGrid.querySelectorAll("[data-library-card]"));

    if (courseCards.length === 0) {
      return;
    }

    const storageKey = "eduhub-course-order";
    let activeFilter = "all";
    let draggedCard = null;

    function cardKey(card) {
      return card.getAttribute("href") || card.dataset.search || card.textContent.trim();
    }

    function matchesQuery(element, query) {
      const haystack = normalise(`${element.dataset.search} ${element.textContent}`);
      return query === "" || haystack.includes(query);
    }

    function matchesFilter(element) {
      const tags = normalise(element.dataset.tags).split(" ").filter(Boolean);
      return activeFilter === "all" || tags.includes(activeFilter);
    }

    function updateNavState(targetId) {
      navButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.homeTarget === targetId);
      });
    }

    function restoreCourseOrder() {
      try {
        const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
        if (!Array.isArray(saved) || saved.length === 0) {
          return;
        }

        const lookup = new Map(courseCards.map((card) => [cardKey(card), card]));
        saved.forEach((key) => {
          const card = lookup.get(key);
          if (card) {
            courseGrid.appendChild(card);
            lookup.delete(key);
          }
        });
        lookup.forEach((card) => {
          courseGrid.appendChild(card);
        });
      } catch (error) {
      }
    }

    function persistCourseOrder() {
      try {
        const order = Array.from(courseGrid.querySelectorAll("[data-library-card]")).map(cardKey);
        localStorage.setItem(storageKey, JSON.stringify(order));
      } catch (error) {
      }
    }

    function clearDragState() {
      courseGrid.querySelectorAll(".drag-over").forEach((card) => {
        card.classList.remove("drag-over");
      });
      courseGrid.querySelectorAll(".is-dragging").forEach((card) => {
        card.classList.remove("is-dragging");
      });
    }

    function apply() {
      const query = normalise(search.value);
      let shownCourses = 0;

      courseCards.forEach((card) => {
        const visible = matchesFilter(card) && matchesQuery(card, query);
        card.classList.toggle("is-hidden", !visible);
        if (visible) {
          shownCourses += 1;
        }
      });

      result.textContent = countLabel(shownCourses, "课程");
      emptyCourses.classList.toggle("is-hidden", shownCourses !== 0);
    }

    function setupDragAndDrop() {
      courseCards.forEach((card) => {
        card.draggable = true;
        card.classList.add("is-draggable");

        card.addEventListener("dragstart", (event) => {
          draggedCard = card;
          card.classList.add("is-dragging");
          if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = "move";
            try {
              event.dataTransfer.setData("text/plain", cardKey(card));
            } catch (error) {
            }
          }
        });

        card.addEventListener("dragend", () => {
          clearDragState();
          draggedCard = null;
          persistCourseOrder();
        });

        card.addEventListener("dragover", (event) => {
          if (!draggedCard || draggedCard === card) {
            return;
          }
          event.preventDefault();
          card.classList.add("drag-over");
        });

        card.addEventListener("dragleave", () => {
          card.classList.remove("drag-over");
        });

        card.addEventListener("drop", (event) => {
          if (!draggedCard || draggedCard === card) {
            return;
          }

          event.preventDefault();
          card.classList.remove("drag-over");

          const rect = card.getBoundingClientRect();
          const midX = rect.left + rect.width / 2;
          const midY = rect.top + rect.height / 2;
          const preferVertical = window.innerWidth <= 760 || Math.abs(event.clientY - midY) > Math.abs(event.clientX - midX);
          const insertBefore = preferVertical ? event.clientY < midY : event.clientX < midX;

          courseGrid.insertBefore(draggedCard, insertBefore ? card : card.nextSibling);
          persistCourseOrder();
        });
      });

      courseGrid.addEventListener("dragover", (event) => {
        if (draggedCard) {
          event.preventDefault();
        }
      });
    }

    filters.addEventListener("click", (event) => {
      const button = event.target.closest("[data-library-filter]");
      if (!button) {
        return;
      }

      activeFilter = button.dataset.libraryFilter;
      filters.querySelectorAll(".chip").forEach((chip) => {
        chip.classList.toggle("active", chip === button);
      });
      apply();
    });

    navButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const target = document.getElementById(button.dataset.homeTarget);
        if (!target) {
          return;
        }
        updateNavState(button.dataset.homeTarget);
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    search.addEventListener("input", apply);

    restoreCourseOrder();
    setupDragAndDrop();
    apply();
    updateNavState("courses");
  }

  async function initCourseExplorerPage() {
    const root = document.querySelector("[data-course-explorer]");
    const dataPath = root?.dataset.courseData;

    if (!root || !dataPath) {
      return;
    }

    const sharedCourse = sharedCourseById(root.dataset.courseId || "");
    if (sharedCourse) {
      hydrateCourseProfile(root, sharedCourse);
    }

    const unitTree = document.getElementById("unitTree");
    const breadcrumb = document.getElementById("courseBreadcrumb");
    const search = document.getElementById("courseExplorerSearch");
    const selectedUnitLabel = document.getElementById("selectedUnitLabel");
    const sectionTitleCn = document.getElementById("sectionTitleCn");
    const sectionTitleEn = document.getElementById("sectionTitleEn");
    const sectionSummary = document.getElementById("sectionSummary");
    const topicCards = document.getElementById("topicCards");
    const sidebarToggle = document.getElementById("sidebarToggle");

    function renderCourseLoadError(message) {
      selectedUnitLabel.textContent = sharedCourse?.directory?.short || "课程目录";
      sectionTitleCn.textContent = "课程数据未加载";
      sectionTitleEn.textContent = "Course data could not be loaded";
      sectionSummary.textContent = message;
      clearNode(unitTree);
      clearNode(breadcrumb);
      breadcrumb.innerHTML = `<a href="../index.html">课程</a><span class="crumb-sep">›</span><span>${sharedCourse?.directory?.short || "课程"}</span>`;
      clearNode(topicCards);
      topicCards.innerHTML = `<div class="pending-note">${message}</div>`;
    }

    let catalog;
    try {
      const response = await fetch(dataPath, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      catalog = await response.json();
    } catch (error) {
      const message = location.protocol === "file:"
        ? "当前课程目录已改为从 JSON 文件加载。浏览器直接打开 file:// 页面时，通常会阻止读取本地 JSON。请通过本地服务器或 GitHub Pages 访问。"
        : `未能读取课程数据文件：${dataPath}`;
      renderCourseLoadError(message);
      return;
    }

    if (sharedCourse) {
      catalog.course = {
        ...catalog.course,
        short: sharedCourse.directory?.short || catalog.course?.short || "",
        cn: sharedCourse.directory?.title || catalog.course?.cn || "",
        en: sharedCourse.directory?.subtitle || catalog.course?.en || "",
        code: sharedCourse.directory?.code || catalog.course?.code || ""
      };
    }

    const state = {
      query: "",
      currentUnitId: root.dataset.initialUnit || catalog.units[0]?.id || "",
      currentSectionCode: root.dataset.initialSection || catalog.units[0]?.sections[0]?.code || "",
      currentTopicCode: root.dataset.initialTopic || catalog.units[0]?.sections[0]?.topics[0]?.code || ""
    };

    function unitText(unit) {
      return normalise(`${unit.code} ${unit.cn} ${unit.en}`);
    }

    function sectionText(section) {
      return normalise(`${section.code} ${section.cn} ${section.en} ${section.summary || ""}`);
    }

    function topicText(topic) {
      const decks = (topic.decks || []).map((deck) => `${deck.cn || ""} ${deck.en || ""}`).join(" ");
      return normalise(`${topic.code} ${topic.cn} ${topic.en} ${decks}`);
    }

    function findSection(units, sectionCode) {
      for (const unit of units) {
        for (const section of unit.sections) {
          if (section.code === sectionCode) {
            return { unit, section };
          }
        }
      }
      return null;
    }

    function findTopic(units, topicCode) {
      for (const unit of units) {
        for (const section of unit.sections) {
          for (const topic of section.topics) {
            if (topic.code === topicCode) {
              return { unit, section, topic };
            }
          }
        }
      }
      return null;
    }

    function filteredUnits() {
      const query = normalise(state.query);

      if (!query) {
        return catalog.units;
      }

      return catalog.units
        .map((unit) => {
          const unitMatches = unitText(unit).includes(query);
          const sections = unit.sections
            .map((section) => {
              const sectionMatches = unitMatches || sectionText(section).includes(query);
              let topics = section.topics.filter((topic) => sectionMatches || topicText(topic).includes(query));

              if (sectionMatches && topics.length === 0) {
                topics = section.topics.slice();
              }

              if (topics.length === 0) {
                return null;
              }

              return { ...section, topics };
            })
            .filter(Boolean);

          if (sections.length === 0) {
            return null;
          }

          return { ...unit, sections };
        })
        .filter(Boolean);
    }

    function ensureSelection(units) {
      if (units.length === 0) {
        state.currentUnitId = "";
        state.currentSectionCode = "";
        state.currentTopicCode = "";
        return;
      }

      let current = findSection(units, state.currentSectionCode);

      if (!current) {
        current = { unit: units[0], section: units[0].sections[0] };
      }

      state.currentUnitId = current.unit.id;
      state.currentSectionCode = current.section.code;

      const topic = current.section.topics.find((item) => item.code === state.currentTopicCode);
      state.currentTopicCode = topic ? topic.code : current.section.topics[0]?.code || "";
    }

    function updateHash() {
      const value = state.currentTopicCode || state.currentSectionCode || state.currentUnitId;
      if (value) {
        history.replaceState(null, "", `#${encodeURIComponent(value)}`);
      }
    }

    function renderBreadcrumb(unit, section) {
      clearNode(breadcrumb);

      const crumbs = [
        { label: "课程", href: "../index.html" },
        { label: catalog.course.short },
        { label: unit.cn },
        { label: section.cn }
      ];

      crumbs.forEach((crumb, index) => {
        const node = crumb.href ? document.createElement("a") : document.createElement("span");
        node.textContent = crumb.label;
        if (crumb.href) {
          node.href = crumb.href;
        }
        breadcrumb.appendChild(node);

        if (index < crumbs.length - 1) {
          const sep = document.createElement("span");
          sep.className = "crumb-sep";
          sep.textContent = "›";
          breadcrumb.appendChild(sep);
        }
      });
    }

    function renderUnitTree(units) {
      clearNode(unitTree);

      units.forEach((unit) => {
        const group = document.createElement("div");
        group.className = "unit-tree-group";

        const unitButton = document.createElement("button");
        unitButton.type = "button";
        unitButton.className = "unit-tree-item";
        if (unit.id === state.currentUnitId) {
          unitButton.classList.add("active");
        }
        unitButton.innerHTML = `
          <span class="unit-tree-index">${unit.code}</span>
          <span class="unit-tree-label">
            <span class="tree-cn">${unit.cn}</span>
            <span class="tree-en">${unit.en}</span>
          </span>
          <span class="tree-chevron">›</span>
        `;
        unitButton.addEventListener("click", () => {
          state.currentUnitId = unit.id;
          state.currentSectionCode = unit.sections[0].code;
          state.currentTopicCode = unit.sections[0].topics[0]?.code || "";
          render();
        });
        group.appendChild(unitButton);

        if (unit.id === state.currentUnitId) {
          const sectionTree = document.createElement("div");
          sectionTree.className = "section-tree";

          unit.sections.forEach((section) => {
            const link = document.createElement("button");
            link.type = "button";
            link.className = "section-tree-link";
            if (section.code === state.currentSectionCode) {
              link.classList.add("active");
            }
            link.innerHTML = `
              <strong>${section.code} ${section.cn}</strong>
              <span>${section.en}</span>
            `;
            link.addEventListener("click", () => {
              state.currentUnitId = unit.id;
              state.currentSectionCode = section.code;
              state.currentTopicCode = section.topics[0]?.code || "";
              render();
            });
            sectionTree.appendChild(link);
          });

          group.appendChild(sectionTree);
        }

        unitTree.appendChild(group);
      });
    }

    function buildTopicDetail(topic) {
      const decks = topic.decks || [];

      if (decks.length === 0) {
        const pending = document.createElement("div");
        pending.className = "pending-note";
        pending.textContent = "该主题目录已整理，课件待制作。";
        return pending;
      }

      const list = document.createElement("div");
      list.className = "deck-inline-list";

      decks.forEach((deck) => {
        const link = document.createElement("a");
        link.className = "deck-inline-link";
        link.href = deck.href;
        link.innerHTML = `
          <strong>${deck.cn}</strong>
          <span>${deck.en}</span>
        `;
        list.appendChild(link);
      });

      return list;
    }

    function renderTopicCards(current) {
      clearNode(topicCards);

      current.section.topics.forEach((topic) => {
        const item = document.createElement("article");
        item.className = "section-topic-item";
        if (topic.code === state.currentTopicCode) {
          item.classList.add("active");
        }

        const card = document.createElement("button");
        card.type = "button";
        card.className = "section-topic-card";
        card.innerHTML = `
          <span class="topic-code">${topic.code}</span>
          <span class="topic-copy">
            <strong>${topic.cn}</strong>
            <span>${topic.en}</span>
          </span>
          <span class="topic-arrow">›</span>
        `;
        card.addEventListener("click", () => {
          if (state.currentTopicCode === topic.code) {
            return;
          }
          state.currentTopicCode = topic.code;
          render();
        });
        item.appendChild(card);

        if (topic.code === state.currentTopicCode) {
          const detail = document.createElement("div");
          detail.className = "topic-inline-detail";
          detail.appendChild(buildTopicDetail(topic));
          item.appendChild(detail);
        }

        topicCards.appendChild(item);
      });
    }

    function renderEmpty() {
      selectedUnitLabel.textContent = "搜索结果";
      sectionTitleCn.textContent = "没有匹配内容";
      sectionTitleEn.textContent = "";
      sectionSummary.textContent = "请调整关键词后再试。";
      clearNode(topicCards);
      clearNode(breadcrumb);
      breadcrumb.innerHTML = `<a href="../index.html">课程</a><span class="crumb-sep">›</span><span>${catalog.course.short}</span>`;
      topicCards.innerHTML = `<div class="pending-note">当前搜索没有匹配的单元、主题或课件。</div>`;
    }

    function render() {
      const units = filteredUnits();
      ensureSelection(units);
      renderUnitTree(units);

      if (units.length === 0) {
        renderEmpty();
        return;
      }

      const current = findSection(units, state.currentSectionCode);

      selectedUnitLabel.textContent = `${current.unit.code} ${current.unit.cn}`;
      sectionTitleCn.textContent = `${current.section.code} ${current.section.cn}`;
      sectionTitleEn.textContent = current.section.en;
      sectionSummary.textContent = current.section.summary || "";

      renderBreadcrumb(current.unit, current.section);
      renderTopicCards(current);
      updateHash();
    }

    function applyHash() {
      const raw = decodeURIComponent(location.hash.replace(/^#/, ""));
      if (!raw) {
        return;
      }

      const topicMatch = findTopic(catalog.units, raw);
      if (topicMatch) {
        state.currentUnitId = topicMatch.unit.id;
        state.currentSectionCode = topicMatch.section.code;
        state.currentTopicCode = topicMatch.topic.code;
        return;
      }

      const sectionMatch = findSection(catalog.units, raw);
      if (sectionMatch) {
        state.currentUnitId = sectionMatch.unit.id;
        state.currentSectionCode = sectionMatch.section.code;
        state.currentTopicCode = sectionMatch.section.topics[0]?.code || "";
      }
    }

    search?.addEventListener("input", (event) => {
      state.query = event.target.value;
      render();
    });

    sidebarToggle?.addEventListener("click", () => {
      root.classList.toggle("is-collapsed");
      sidebarToggle.textContent = root.classList.contains("is-collapsed") ? "›" : "‹";
      sidebarToggle.setAttribute("aria-label", root.classList.contains("is-collapsed") ? "展开目录" : "收起目录");
    });

    applyHash();
    render();
  }

  initLibraryPage();
  initCourseExplorerPage();
})();
