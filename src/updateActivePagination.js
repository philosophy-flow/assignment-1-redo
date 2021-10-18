export default function updateActivePagination(btnArr, page) {
  btnArr.forEach((btn, index) => {
    if (page === index + 1) {
      btn.classList.add("active");
      btn.disabled = true;
    } else {
      btn.classList.remove("active");
      btn.disabled = false;
    }
  });
}
