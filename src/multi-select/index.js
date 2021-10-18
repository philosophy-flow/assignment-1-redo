import "./multi-select.css";

const valuesArr = [
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dark",
  "dragon",
  "steel",
  "fairy",
];

export function setupMultiselect(callback, offset = 0) {
  const inputArr = valuesArr.map((value) => {
    // create input element
    const inputEl = document.createElement("input");
    inputEl.type = "checkbox";
    inputEl.id = value;
    inputEl.value = value;

    // create label for input
    const labelEl = document.createElement("label");
    labelEl.setAttribute("for", value);
    labelEl.innerHTML = value;

    // create list item and add input/label
    const listEl = document.createElement("li");
    listEl.appendChild(inputEl);
    listEl.appendChild(labelEl);

    return listEl;
  });

  const dropDownBtn = document.getElementById("drop-down-btn");
  const selectorContainer = document.getElementById("selector-container");
  const chevron = document.getElementById("chevron");
  const activeSelections = document.getElementById("active-selections");

  const selector = document.getElementById("selector");
  inputArr.forEach((input) => {
    selector.appendChild(input);
  });

  // OPEN/CLOSE DROPDOWN
  dropDownBtn.onclick = () => {
    selectorContainer.classList.toggle("hidden");
    chevron.classList.toggle("upside-down");
  };

  const selectorChildren = Array.from(selector.children);
  const selectorOptions = selectorChildren.map((child) => child.children[0]);

  let checkedArr = [];
  selectorOptions.forEach((option) => {
    option.onchange = () => {
      if (option.checked) {
        checkedArr.push(option.value);
      } else {
        checkedArr = checkedArr.filter((selected) => {
          return selected !== option.value;
        });
      }

      if (checkedArr.length >= 5) {
        activeSelections.innerHTML = `${checkedArr.length} types selected`;
      } else {
        const toInsert = checkedArr.join(", ");
        activeSelections.innerHTML = toInsert;
      }

      callback();
    };
  });

  function getTypes() {
    return checkedArr;
  }

  function updateSelectors(offset) {
    selectorOptions.forEach((option) => {
      option.onchange = () => {
        if (option.checked) {
          checkedArr.push(option.value);
        } else {
          checkedArr = checkedArr.filter((selected) => {
            return selected !== option.value;
          });
        }

        if (checkedArr.length >= 5) {
          activeSelections.innerHTML = `${checkedArr.length} types selected`;
        } else {
          const toInsert = checkedArr.join(", ");
          activeSelections.innerHTML = toInsert;
        }

        callback(offset);
      };
    });
  }

  return [getTypes, updateSelectors];
}
