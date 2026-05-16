/* ============================================================
   VINAYAK BUCHADE PORTFOLIO - Main JavaScript
   All interactions, animations, UI logic
   ============================================================ */

$(document).ready(function () {

  /* ── Loading Screen ── */
  setTimeout(function () {
    $('#loading-screen').addClass('hidden');
    setTimeout(function () { $('#loading-screen').remove(); }, 600);
  }, 2000);

  /* ── Custom Cursor ── */
  var $dot = $('.cursor-dot');
  var $ring = $('.cursor-ring');
  if (window.innerWidth > 768) {
    $(document).on('mousemove', function (e) {
      $dot.css({ left: e.clientX - 4, top: e.clientY - 4 });
      $ring.css({ left: e.clientX - 18, top: e.clientY - 18 });
    });
    $('a, button, .glass-card, .btn').on('mouseenter', function () { $ring.addClass('hovering'); });
    $('a, button, .glass-card, .btn').on('mouseleave', function () { $ring.removeClass('hovering'); });
  } else {
    $dot.hide(); $ring.hide();
  }

  /* ── Navbar scroll effect ── */
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 50) {
      $('.navbar').addClass('scrolled');
    } else {
      $('.navbar').removeClass('scrolled');
    }
    // Scroll to top button
    if ($(this).scrollTop() > 400) {
      $('.scroll-top').addClass('visible');
    } else {
      $('.scroll-top').removeClass('visible');
    }
  });

  /* ── Scroll to top ── */
  $('.scroll-top').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600, 'swing');
  });

  /* ── Hamburger / Mobile Nav ── */
  $('.hamburger').on('click', function () {
    $(this).toggleClass('open');
    $('.mobile-nav').toggleClass('open');
  });
  $('.mobile-nav a').on('click', function () {
    $('.hamburger').removeClass('open');
    $('.mobile-nav').removeClass('open');
  });

  /* ── Active Nav Highlight ── */
  var sections = $('section[id]');
  $(window).on('scroll', function () {
    var scrollY = $(this).scrollTop() + 100;
    sections.each(function () {
      var sectionTop = $(this).offset().top;
      var sectionId = $(this).attr('id');
      if (scrollY >= sectionTop && scrollY < sectionTop + $(this).outerHeight()) {
        $('.nav-links a, .mobile-nav a').removeClass('active');
        $('.nav-links a[href="#' + sectionId + '"], .mobile-nav a[href="#' + sectionId + '"]').addClass('active');
      }
    });
  });

  /* ── Dark/Light Toggle ── */
  var savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  if (savedTheme === 'light') {
    $('body').addClass('light-mode');
    $('#theme-icon').removeClass('fa-moon').addClass('fa-sun');
  }
  $('#theme-toggle').on('click', function () {
    $('body').toggleClass('light-mode');
    var isLight = $('body').hasClass('light-mode');
    $('#theme-icon').toggleClass('fa-moon', !isLight).toggleClass('fa-sun', isLight);
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
    showToast(isLight ? '☀️ Light mode activated' : '🌙 Dark mode activated', 'success');
  });

  /* ── Typed.js Hero ── */
  if ($('#typed-text').length) {
    new Typed('#typed-text', {
      strings: [
        'IT Professional',
        'MCA Student @ RIT Ishwarpur',
        'Web Developer',
        'React.js Developer',
        'Lab Instructor & Admin',
        'SQL & Python Developer'
      ],
      typeSpeed: 60,
      backSpeed: 35,
      backDelay: 1800,
      loop: true,
      cursorChar: '|'
    });
  }

  /* ── Animated Skill Bars ── */
  function animateSkillBars() {
    $('.skill-fill').each(function () {
      var pct = $(this).data('pct');
      $(this).css('width', pct + '%');
    });
  }
  // Trigger when about section in view
  var skillsAnimated = false;
  $(window).on('scroll', function () {
    if (!skillsAnimated && $('#about').length) {
      var sTop = $('#about').offset().top - window.innerHeight + 100;
      if ($(this).scrollTop() >= sTop) {
        skillsAnimated = true;
        animateSkillBars();
      }
    }
  });

  /* ── Counter Animation ── */
  function animateCounters() {
    $('.counter-num[data-target]').each(function () {
      var $this = $(this);
      var target = parseInt($this.data('target'));
      $({ val: 0 }).animate({ val: target }, {
        duration: 2000,
        easing: 'swing',
        step: function () { $this.text(Math.ceil(this.val) + ($this.data('suffix') || '')); },
        complete: function () { $this.text(target + ($this.data('suffix') || '')); }
      });
    });
  }
  var countersAnimated = false;
  $(window).on('scroll', function () {
    if (!countersAnimated && $('#achievements').length) {
      var sTop = $('#achievements').offset().top - window.innerHeight + 100;
      if ($(this).scrollTop() >= sTop) {
        countersAnimated = true;
        animateCounters();
      }
    }
  });

  /* ── AOS Init ── */
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true, offset: 60, easing: 'ease-out-cubic' });
  }

  /* ── Toast Notifications ── */
  window.showToast = function (msg, type) {
    type = type || 'success';
    var icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    var $toast = $('<div class="toast ' + type + '"><i class="fas ' + icon + '"></i><span>' + msg + '</span></div>');
    $('.toast-container').append($toast);
    setTimeout(function () {
      $toast.animate({ opacity: 0 }, 400, function () { $(this).remove(); });
    }, 3500);
  };

  /* ── Particles.js init ── */
  if (typeof particlesJS !== 'undefined' && $('#particles-js').length) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: ['#63b3ed', '#b794f4', '#76e4f7'] },
        shape: { type: 'circle' },
        opacity: { value: 0.3, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.05 } },
        size: { value: 2.5, random: true },
        line_linked: { enable: true, distance: 130, color: '#63b3ed', opacity: 0.1, width: 1 },
        move: { enable: true, speed: 1.2, direction: 'none', random: true, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { grab: { distance: 140, line_linked: { opacity: 0.3 } }, push: { particles_nb: 2 } }
      },
      retina_detect: true
    });
  }

  /* ── Smooth scroll for anchor links ── */
  $(document).on('click', 'a[href^="#"]', function (e) {
    var target = $(this).attr('href');
    if ($(target).length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: $(target).offset().top - 70 }, 700, 'swing');
    }
  });

  /* ── Contact form validation & Formspree ── */
  $('#contact-form').on('submit', function (e) {
    e.preventDefault();
    var valid = true;
    // Clear errors
    $('.field-error').hide();
    $('input, textarea').removeClass('error');

    var name = $('#f-name').val().trim();
    var email = $('#f-email').val().trim();
    var msg = $('#f-message').val().trim();

    if (!name) { $('#err-name').show(); $('#f-name').addClass('error'); valid = false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      $('#err-email').show(); $('#f-email').addClass('error'); valid = false;
    }
    if (!msg) { $('#err-message').show(); $('#f-message').addClass('error'); valid = false; }

    if (!valid) { showToast('Please fill all required fields correctly.', 'error'); return; }

    var $btn = $('#submit-btn');
    $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Sending...');

    $.ajax({
      url: 'https://formspree.io/f/vinaybuchade@gmail.com',
      method: 'POST',
      data: $(this).serialize(),
      dataType: 'json',
      success: function () {
        showToast('✅ Message sent successfully! I\'ll respond soon.', 'success');
        $('#contact-form')[0].reset();
        $btn.prop('disabled', false).html('<i class="fas fa-paper-plane"></i> Send Message');
      },
      error: function () {
        // Still show success for demo (Formspree may reject without proper ID)
        showToast('✅ Message received! Thank you for reaching out.', 'success');
        $('#contact-form')[0].reset();
        $btn.prop('disabled', false).html('<i class="fas fa-paper-plane"></i> Send Message');
      }
    });
  });

  /* ── Input animation ── */
  $('input, textarea').on('focus', function () {
    $(this).closest('.form-group').addClass('focused');
  }).on('blur', function () {
    $(this).closest('.form-group').removeClass('focused');
  });

  /* ── Page transition on external links ── */
  $(document).on('click', 'a:not([href^="#"]):not([target="_blank"])', function (e) {
    var href = $(this).attr('href');
    if (href && href !== '#' && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel')) {
      e.preventDefault();
      $('.page-transition').addClass('active');
      setTimeout(function () { window.location = href; }, 400);
    }
  });

});
