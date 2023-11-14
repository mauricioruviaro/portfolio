const container = document.querySelector("#work");
const backgroundText = document.querySelector("#background-text");
const text = backgroundText.textContent;
const containerHeight = container.offsetHeight;
const numRepeats = Math.ceil(containerHeight / backgroundText.offsetHeight);
const embedElement = document.createElement("img");
embedElement.src = "./icons/arrow-right.svg";

for (let i = 0; i <= numRepeats; i++) {
  const clone = backgroundText.cloneNode(true);
  clone.style.marginTop = `${15 * i}rem`;
  container.appendChild(clone);
}

const navItens = document.querySelectorAll(".default-a-tag");
const contentObject = {
  "#home": "Home",
  "#contact": "Contact",
};

const removeClassFromList = (className, list) => {
  list.forEach((element) => element.classList.remove(className));
};

const addClassFromHashAndReturnElement = (className, text, list) => {
  let element = null;
  list.forEach((el) => {
    if (el.text === text) {
      el.classList.add(className);
      element = el;
    }
  });

  return element;
};

const addIcon = (element) => {
  const text = element.innerText;
  element.innerText = "";
  element.append(embedElement);
  element.append(text);
};

if (contentObject[window.location.hash]) {
  removeClassFromList("selected-a-tag", Array.from(navItens));
  const element = addClassFromHashAndReturnElement(
    "selected-a-tag",
    contentObject[window.location.hash],
    Array.from(navItens)
  );
  addIcon(element);
} else {
  removeClassFromList("selected-a-tag", Array.from(navItens));
  const element = addClassFromHashAndReturnElement(
    "selected-a-tag",
    "Home",
    Array.from(navItens)
  );
  addIcon(element);
}

document.addEventListener("click", ({ target }) => {
  if (contentObject[target.hash]) {
    removeClassFromList("selected-a-tag", Array.from(navItens));
    addClassFromHashAndReturnElement(
      "selected-a-tag",
      contentObject[target.hash],
      Array.from(navItens)
    );
    addIcon(target);
  }
});
