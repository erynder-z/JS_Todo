import "./normalize.css";
import "./style.css";

import "regenerator-runtime/runtime";
import floatMenu from "./modules/float";
import { createNewTaskModal } from "./modules/modal";
import { activateNav, activateSidebar } from "./modules/buttons";
import { toggleSidebarNav } from "./modules/sidebar";
import { retrieveStorage, retrieveStorageCategories } from "./modules/storage";
import welcomeScreen from "./modules/welcome";
import switchTheme from "./modules/darkmode";
import firebaseAuthentication from "./modules/authentication";

const loginModal = document.querySelector(".login-modal-overlay");
const offlineBtn = document.getElementById("offlineBtn");
const btnLogout = document.getElementById("btnLogout");

const startOffline = () => {
  retrieveStorage();
  retrieveStorageCategories();
  activateNav();
  toggleSidebarNav();
  activateSidebar();
  floatMenu();
  createNewTaskModal();
  switchTheme();
  welcomeScreen();
  btnLogout.classList.add("hidden");
};

const startOnline = () => {
  activateNav();
  toggleSidebarNav();
  activateSidebar();
  floatMenu();
  createNewTaskModal();
  switchTheme();
  welcomeScreen();
};

offlineBtn.addEventListener("click", () => {
  loginModal.classList.add("hidden");
  startOffline();
});

const start = (() => {
  firebaseAuthentication();
})();

export { startOnline };
