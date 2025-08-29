export const environment = {
  roduction: false,

  apiUrl: window["env"]["apiUrl"] || "default",
  apiUsuarios: window["env"]["apiUsuarios"] || "default",
  reportsUrl: window["env"]["reportsUrl"] || "default",
  filesUrl: window["env"]["filesUrl"] || "default",
  debug: window["env"]["debug"] || false
};
