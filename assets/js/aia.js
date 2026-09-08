/* Abuja International Academy: small helpers. The page works without this file. */
(function () {
  "use strict";

  var head = document.querySelector(".masthead");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  /* the masthead floats over the hero, then turns solid once you scroll past it */
  function onScroll() {
    if (!head) { return; }
    var open = nav && nav.classList.contains("open");
    head.classList.toggle("stuck", window.scrollY > 40 || open);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
      onScroll();
    });
    /* close the menu after a jump link is tapped */
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
        onScroll();
      }
    });
  }


  /* the calendar marks itself: past weeks dim, the current week is flagged,
     and the bar shows how far into the term we are */
  (function () {
    var cal = document.querySelector(".cal");
    if (!cal) { return; }

    var today = new Date();
    today.setHours(12, 0, 0, 0);
    var day = function (s) { var d = new Date(s + "T12:00:00"); return d; };

    var termStart = day(cal.getAttribute("data-term-start"));
    var termEnd = day(cal.getAttribute("data-term-end"));
    var rows = cal.querySelectorAll(".cal-row");
    var current = null;
    var weekNo = 0;

    Array.prototype.forEach.call(rows, function (row, i) {
      var a = day(row.getAttribute("data-start"));
      var b = day(row.getAttribute("data-end"));
      if (today > b) { row.classList.add("is-past"); }
      if (today >= a && today <= b) { row.classList.add("is-now"); current = row; weekNo = i + 1; }
      if (!current && today < a && weekNo === 0 && today > termStart) { weekNo = i + 1; }
    });

    var status = document.getElementById("cal-status");
    var fill = document.getElementById("cal-fill");
    var msg;

    if (today < termStart) {
      var days = Math.ceil((termStart - today) / 86400000);
      msg = "<b>First term</b> begins in " + days + (days === 1 ? " day" : " days") +
            ", on Monday 14 September 2026";
    } else if (today > termEnd) {
      msg = "<b>First term</b> has ended. Second term dates are published by the office";
    } else {
      msg = "<b>Week " + (weekNo || 1) + " of " + rows.length + "</b> of first term" +
            (current ? "" : ", between weeks");
    }
    if (status) { status.innerHTML = msg; }

    if (fill) {
      var pct = (today - termStart) / (termEnd - termStart) * 100;
      pct = Math.max(0, Math.min(100, pct));
      window.setTimeout(function () { fill.style.width = pct.toFixed(1) + "%"; }, 120);
    }

    if (current && window.matchMedia("(min-width: 900px)").matches === false) {
      /* nothing to scroll on a phone, the list is short */
    }
  })();

  var year = document.getElementById("year");
  if (year) { year.textContent = new Date().getFullYear(); }

  /* keep a parent from double-sending an application on a slow connection */
  Array.prototype.forEach.call(document.querySelectorAll("form[data-guard]"), function (form) {
    form.addEventListener("submit", function () {
      var btn = form.querySelector("button[type=submit]");
      if (btn) {
        btn.disabled = true;
        btn.textContent = btn.getAttribute("data-sending") || "Sending";
      }
    });
  });
})();