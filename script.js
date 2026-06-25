document.addEventListener('DOMContentLoaded', function () {
  var startEl = document.getElementById('startDate');
  if (startEl) {
    var today = new Date();
    var opts = { year: 'numeric', month: 'short', day: 'numeric' };
    startEl.textContent = today.toLocaleDateString('en-US', opts);
  }

  var links = Array.prototype.slice.call(document.querySelectorAll('.rail-link'));
  var sections = links.map(function (link) {
    return document.getElementById(link.getAttribute('data-target'));
  });

  links.forEach(function (link) {
    link.addEventListener('click', function () {
      var target = document.getElementById(link.getAttribute('data-target'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  function setActive() {
    var bestIndex = 0;
    var bestDist = Infinity;
    sections.forEach(function (sec, i) {
      if (!sec) return;
      var rect = sec.getBoundingClientRect();
      var dist = Math.abs(rect.top - 80);
      if (rect.top <= 140 && dist < bestDist) {
        bestDist = dist;
        bestIndex = i;
      }
    });
    links.forEach(function (link, i) {
      link.classList.toggle('active', i === bestIndex);
    });
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        setActive();
        ticking = false;
      });
      ticking = true;
    }
  });

  setActive();
});
