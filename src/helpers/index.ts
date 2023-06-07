export const scrollMaxBottom = () => {
  document.documentElement.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth"
  });
};
