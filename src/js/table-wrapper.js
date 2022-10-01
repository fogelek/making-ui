tables = document.getElementsByTagName("table");
if (tables && tables.length) {
  for (const table of tables) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("table-wrapper");
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  }
}
