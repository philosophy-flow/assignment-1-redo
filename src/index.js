import "./styles.css";
import "table2excel";

import renderPokemon from "./renderPokemon";
import fetchPokemon from "./fetchPokemon";
import updateActivePagination from "./updateActivePagination";
import exportToExcel from "./exportToExcel";
import { setupMultiselect } from "./multi-select";

// set up multiselect;
// getTypes --> returns selected typeds
// updateSelectors --> updates onchange callback w/ new offset
const [getTypes, updateSelectors] = setupMultiselect(main);

// TABLE
const pokeTable = document.getElementById("poke-table");
const tableBody = pokeTable.tBodies[0];

// EXPORT TO EXCEL
const exportBtn = document.getElementById("export-btn");
exportBtn.addEventListener("click", () => exportToExcel(pokeTable));

// Pagination Buttons
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pgnBtn1 = document.getElementById("pgn-1");
const pgnBtn2 = document.getElementById("pgn-2");
const pgnBtn3 = document.getElementById("pgn-3");
const pgnBtn4 = document.getElementById("pgn-4");
const pgnBtn5 = document.getElementById("pgn-5");
const pgnBtn6 = document.getElementById("pgn-6");
const pgnBtn7 = document.getElementById("pgn-7");
const pgnBtn8 = document.getElementById("pgn-8");
const pgnBtn9 = document.getElementById("pgn-9");
const pgnBtn10 = document.getElementById("pgn-10");
const pgnBtnArr = [
  pgnBtn1,
  pgnBtn2,
  pgnBtn3,
  pgnBtn4,
  pgnBtn5,
  pgnBtn6,
  pgnBtn7,
  pgnBtn8,
  pgnBtn9,
  pgnBtn10,
];

// set up event handler for each pagination button
pgnBtnArr.forEach((btn, index) => {
  const offset = index * 10;
  btn.onclick = () => {
    main(offset);
  };
});

function updateTailButtons(page, offset) {
  if (page === 1) {
    prevBtn.classList.add("hidden");
  } else {
    prevBtn.classList.remove("hidden");
  }

  if (page === 10) {
    nextBtn.classList.add("hidden");
  } else {
    nextBtn.classList.remove("hidden");
  }

  prevBtn.onclick = () => {
    main(offset - 10);
  };

  nextBtn.onclick = () => {
    main(offset + 10);
  };
}

export default async function main(offset = 0) {
  const [pokemonArr, page] = await fetchPokemon(offset);

  // clear table
  tableBody.innerHTML = "";

  // render pokemon to table
  pokemonArr.forEach((pokemon) => renderPokemon(tableBody, pokemon));

  // update active pagination button
  updateActivePagination(pgnBtnArr, page);

  // update tail buttons
  updateTailButtons(page, offset);

  // get selected types
  const typesArr = getTypes();

  // compare selected types to each row's type, hide row if no match
  const tableArr = Array.from(tableBody.children);
  if (typesArr.length > 0) {
    tableArr.forEach((row) => {
      const rowType = row.children[2].innerHTML;
      if (!typesArr.includes(rowType)) {
        row.classList.add("display-none");
      }
    });
  }

  // update multiselect callback
  updateSelectors(offset);
}

// fetch pokemon on load
main();
