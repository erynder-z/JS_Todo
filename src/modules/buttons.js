import { toggleDetails } from "./addClasses";
import showAllTasks from "./showAllTasks";
import { showCategoryWork, showCategoryHobby, showCategoryHealth, showCategoryChore } from "./filteredTasks";
import { toggleSidebar } from "./sidebar";

import {
    deleteTask,
    markTaskComplete,
    retrieveTaskDetails,
} from "./tasks";

const activateSidebar = () => {

    const allTasks = (() => {
       const button = document.getElementById("all");
        button.addEventListener("click", function () {
            showAllTasks();
            toggleSidebar();
        });
    })();

    const work = (() => {
        const button = document.getElementById("work");
        button.addEventListener("click", function () {
            showCategoryWork();
            toggleSidebar();
        })
    })();

    const hobby = (() => {
        const button = document.getElementById("hobby");
        button.addEventListener("click", function () {
            showCategoryHobby();
            toggleSidebar();
        })
    })();

    const health = (() => {
        const button = document.getElementById("health");
        button.addEventListener("click", function () {
            showCategoryHealth();
            toggleSidebar();
        })
    })();

    const chore = (() => {
        const button = document.getElementById("chore");
        button.addEventListener("click", function () {
            showCategoryChore();
            toggleSidebar();
        })
    })();

}

const activateButtons = () => {

    const activateDeleteButtons = () => {
        document.querySelectorAll(".delete-button").forEach(button => {
            button.addEventListener("click", function () {
                deleteTask(button.parentNode.parentNode.id);
            });
        });
    }

    const activateExpandTaskButton = () => {
        document.querySelectorAll(".expand-button").forEach(button => {
            button.addEventListener("click", function () {
                toggleDetails(button.parentNode.id);
            });
        });
    }

    const activateMarkCompleteButtons = () => {
        document.querySelectorAll(".mark-complete-button").forEach(button => {
            button.addEventListener("click", function () {
                markTaskComplete(button.parentNode.parentNode.id);
            });
        });
    }

    const activateEditButtons = () => {
        document.querySelectorAll(".edit-button").forEach(button => {
            button.addEventListener("click", function () {
                retrieveTaskDetails(button.parentNode.parentNode.id);
            });
        });
    }

    activateDeleteButtons();
    activateExpandTaskButton();
    activateMarkCompleteButtons();
    activateEditButtons();
}
export {
    activateSidebar,
    activateButtons
}