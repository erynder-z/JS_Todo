import { toggleDetails } from "./addClasses";
import showAllTasks from "./showAllTasks";
import { showDueToday, showDueWeek, showCategory } from "./filteredTasks";
import { toggleSidebar } from "./sidebar";

import { deleteTask, markTaskComplete, retrieveTaskDetails } from "./tasks";
import {
  categories,
  createNewCategoryModal,
  deleteCustomCategoriesModal,
} from "./categories";
import { createSearchModal } from "./modal";
import { setActiveView } from "./activeView";

const activateSidebar = () => {
  const dueToday = (() => {
    const button = document.getElementById("today");
    button.addEventListener("click", () => {
      showDueToday();
      toggleSidebar();
    });
  })();

  const dueOneWeek = (() => {
    const button = document.getElementById("week");
    button.addEventListener("click", () => {
      showDueWeek();
      toggleSidebar();
    });
  })();

  const allTasks = (() => {
    const button = document.getElementById("all");
    button.addEventListener("click", function () {
      showAllTasks();
      setActiveView(this);
      toggleSidebar();
    });
  })();

  const defaultCategories = (() => {
    document.querySelectorAll("[data-category]").forEach((field) => {
      field.addEventListener("click", function () {
        showCategory(this);
        setActiveView(this);
        toggleSidebar();
      });
    });
  })();

  const newCategory = (() => {
    const button = document.getElementById("myfloat-new-category");
    button.addEventListener("click", () => {
      createNewCategoryModal();
      toggleSidebar();
    });
  })();

  const deleteCategoryBtn = (() => {
    const button = document.getElementById("manageCustomCategories");
    button.addEventListener("click", () => {
      deleteCustomCategoriesModal(categories);
    });
  })();

  const toggleSidebarBtn = (() => {
    const button = document.getElementById("toggleSide");
    button.addEventListener("click", () => {
      button.classList.toggle("expanded");
      toggleSidebar();
    });
  })();
};

const activateButtons = () => {
  const activateDeleteButtons = (() => {
    document.querySelectorAll(".delete-button").forEach((button) => {
      button.addEventListener("click", () => {
        deleteTask(button.parentNode.parentNode.id);
      });
    });
  })();

  const activateExpandTaskButton = (() => {
    document.querySelectorAll(".expand-button").forEach((button) => {
      button.addEventListener("click", () => {
        toggleDetails(button.parentNode.id);
      });
    });
  })();

  const activateMarkCompleteButtons = (() => {
    document.querySelectorAll(".mark-complete-button").forEach((button) => {
      button.addEventListener("click", () => {
        markTaskComplete(button.parentNode.parentNode.id);
      });
    });
  })();

  const activateEditButtons = (() => {
    document.querySelectorAll(".edit-button").forEach((button) => {
      button.addEventListener("click", () => {
        retrieveTaskDetails(button.parentNode.parentNode.id);
      });
    });
  })();
};

const activateNav = () => {
  const searchBtn = document.getElementById("searchBtn");
  searchBtn.addEventListener("click", () => {
    createSearchModal();
  });
};

const activateNewCategories = (elementID) => {
  const catElement = document.getElementById(elementID);
  if (catElement !== null) {
    catElement.addEventListener("click", function () {
      showCategory(this);
      setActiveView(this);
      toggleSidebar();
    });
  }
};

export { activateSidebar, activateButtons, activateNewCategories, activateNav };
