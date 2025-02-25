/**
 * Write your challenge solution here
 */

let accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((accordionItem) => {
  accordionItem.addEventListener("click", () => {
    let activeAccordionItem = document.querySelector(".accordion-item.active");

    if (activeAccordionItem && activeAccordionItem !== accordionItem) activeAccordionItem.classList.remove("active");

    accordionItem.classList.toggle("active");
  });
});
