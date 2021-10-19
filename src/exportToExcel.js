import "table2excel";

export default function exportToExcel(table) {
  // clone table so that hidden nodes can be removed before export
  let exportTable = table.cloneNode(true);
  exportTable.removeAttribute("id");

  // search for entries that are hidden and remove from cloned table
  let entries = Array.from(exportTable.tBodies[0].children);
  entries.forEach((entry) => {
    if (entry.classList.contains("display-none")) {
      entry.remove();
    }
  });

  // export cloned table
  const table2excel = new Table2Excel();
  table2excel.export(exportTable);
}
