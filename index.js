

// Navbar Scroll Effect
window.addEventListener('scroll', function () {
  let navbar = document.querySelector('.navbar');
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Burger Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector('.burger');
  const navbarItems = document.querySelector('.navbar-items');

  burger.addEventListener('click', () => {
    navbarItems.classList.toggle('active'); // must match your CSS
  });
});


// let burger = document.querySelector('.burger');
// let nav = document.querySelector('.nav');
// let navbarItems = document.querySelector('.navbar-items');

// burger.addEventListenerI('click',()=>{
//   navbarItems.classList.toggle('h-class')
//   nav.classList.toggle('v-class')
// })


// Gallery Open/Close
function openGallery(type) {
  const gallery = document.getElementById("gallery-" + type);
  if (gallery) {
    gallery.style.display = "flex"; // flex to center
    document.body.classList.add("modal-open");
  }
}

function closeGallery(type) {
  const gallery = document.getElementById("gallery-" + type);
  if (gallery) {
    gallery.style.display = "none";
    document.body.classList.remove("modal-open");
  }
}



// Typing Effect
(function () {
  const phrases = ["Services", "Commitment", "Passion"];
  const typingSpeed = 80;
  const erasingSpeed = 40;
  const pauseAfterType = 2000;
  const pauseBetween = 300;

  const typedEl = document.getElementById("typed-text");
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const current = phrases[phraseIndex];
    if (!isDeleting) {
      typedEl.textContent = current.substring(0, ++charIndex);
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeEffect, pauseAfterType);
        return;
      }
    } else {
      typedEl.textContent = current.substring(0, --charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, pauseBetween);
        return;
      }
    }
    setTimeout(typeEffect, isDeleting ? erasingSpeed : typingSpeed);
  }

  document.addEventListener("DOMContentLoaded", () =>
    setTimeout(typeEffect, 300)
  );
})();


// Testimonials
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  let index = 0;

  function showSlide(i) {
    slides.forEach((slide, idx) => {
      slide.classList.remove("active");
      if (idx === i) {
        slide.classList.add("active");
      }
    });
  }

  // Show first slide
  showSlide(index);

  if (prev) {
    prev.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      showSlide(index);
    });
  }

  if (next) {
    next.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      showSlide(index);
    });
  }

  // Auto slide every 5 sec
  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 9000);
});



// Counter animation
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const updateCount = () => {
      let current = +counter.innerText;
      let increment = Math.ceil(target / 200); // speed

      if (current < target) {
        counter.innerText = current + increment;
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target + "+";
      }
    };
    updateCount();
  };

  // Show animation only when visible
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 1 });

  counters.forEach((counter) => {
    observer.observe(counter);
  });
});


document.addEventListener("DOMContentLoaded", () => {
  // Instead of plain strings, use arrays of objects { word, color }
  const texts = [
    [
      { word: "Transforming", color: "#fff" },
      { word: "Houses", color: "#e5aa70" },
      { word: "into", color: "#fff" },
      { word: "Dream", color: "#e5aa70" },
      { word: "Home", color: "#fff" }
    ],
    [
      { word: "Quality", color: "#e5aa70" },
      { word: "|", color: "#fff" },
      { word: "Trust", color: "#fff" },
      { word: "|", color: "#fff" },
      { word: "Experience", color: "#e5aa70" }
    ]
  ];

  const typingText = document.getElementById("typing-text");
  let textIndex = 0;
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let speed = 100;

  function typeEffect() {
    const currentLine = texts[textIndex];
    const currentWordObj = currentLine[wordIndex];
    const currentWord = currentWordObj.word;

    if (!isDeleting) {
      // Typing characters
      charIndex++;
      renderText(currentLine, wordIndex, charIndex);
      if (charIndex === currentWord.length) {
        wordIndex++;
        charIndex = 0;
        if (wordIndex === currentLine.length) {
          isDeleting = true;
          wordIndex = currentLine.length - 1;
          charIndex = currentLine[wordIndex].word.length;
          speed = 1500; // pause
        }
      }
    } else {
      // Deleting characters
      charIndex--;
      renderText(currentLine, wordIndex, charIndex);
      if (charIndex === 0) {
        wordIndex--;
        if (wordIndex < 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
          wordIndex = 0;
          charIndex = 0;
        } else {
          charIndex = currentLine[wordIndex].word.length;
        }
      }
      speed = 50;
    }

    setTimeout(typeEffect, speed);
  }

  function renderText(line, uptoWord, uptoChar) {
    typingText.innerHTML = "";
    for (let i = 0; i <= uptoWord; i++) {
      let span = document.createElement("span");
      span.style.color = line[i].color;
      if (i === uptoWord) {
        span.textContent = line[i].word.substring(0, uptoChar);
      } else {
        span.textContent = line[i].word;
      }
      typingText.appendChild(span);
      typingText.append(" "); // add space
    }
  }

  typeEffect();
});



