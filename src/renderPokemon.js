export default function renderPokemon(tableBody, pokeDetails) {
  // create new row
  const newRow = tableBody.insertRow();

  // create three new cells in the new row
  const idCell = newRow.insertCell();
  const nameCell = newRow.insertCell();
  const typeCell = newRow.insertCell();

  // insert details into each cell
  idCell.innerHTML = `${pokeDetails.id}`;
  nameCell.innerHTML = `${pokeDetails.name}`;
  typeCell.innerHTML = `${pokeDetails.types[0].type.name}`;
}
