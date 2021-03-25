/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const sections = document.getElementsByTagName("section");
const sectionsDiv = document.querySelector("#navbar__list");
var activeSection = 0;

navSections(sections);

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function getAttribute(index) {
  return document.getElementById("section" + index).getAttribute("data-nav");
}

function topCoordinate(index) {
  var active = document.getElementById("section" + index);
  var bound = active.getBoundingClientRect();
  return bound.top;
}

function headCoordinate() {
  var head = document.getElementById("main-header");
  var bound = head.getBoundingClientRect();
  return bound.top;
}

function isActive(coordinate) {
  if (coordinate >= 0) {
    return true;
  } else {
    return false;
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function navSections(sections) {
  for (let i = 1; i <= sections.length; i++) {
    const section = document.createElement("li");
    const secNum = getAttribute(i);
    section.innerText = secNum;
    section.setAttribute("class", "nav_anchor");
    section.setAttribute("id", "section_" + i);

    sectionsDiv.appendChild(section);
  }
}

// Add class 'active' to section when near top of viewport

window.onscroll = function active() {
  var old = activeSection;
  var co;

  for (let i = 1; i <= sections.length; i++) {
    co = topCoordinate(i);
    if (isActive(co) && headCoordinate() < 0) {
      activeSection = i;

      // prettier-ignore
      document.getElementById("section_" + activeSection).setAttribute("class", "nav_anchor nav_active");

      // prettier-ignore
      document.getElementById("section" + activeSection).setAttribute("class", "your-active-class");
      break;
    }
  }
  if (old != 0) {
    var oldCo = topCoordinate(old);
    if (!isActive(oldCo) || oldCo > co || oldCo < 0 || headCoordinate() >= 0) {
      document.getElementById("section" + old).removeAttribute("class");

      // prettier-ignore
      document.getElementById("section_" + old).setAttribute("class", "nav_anchor");
    }
  }
};
document.getElementById("go-to-top").onclick = function scrollTop() {
  window.scrollTo(0, 0);
};

for (let i = 1; i <= sections.length; i++) {
  // prettier-ignore
  document.getElementById("section_" + i).onclick = function scrollToSection() {
    var scrollSection = document.getElementById("section" + i);
    scrollSection.scrollIntoView();
  };
}
/**
 * End Main Functions
 * Begin Events
 *
 */
