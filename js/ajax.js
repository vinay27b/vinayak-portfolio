/* ============================================================
   VINAYAK BUCHADE PORTFOLIO - AJAX Module
   Dynamic data loading from JSONPlaceholder API
   ============================================================ */

$(document).ready(function () {

  /* ── Fetch dynamic projects from JSONPlaceholder ── */
  function fetchApiProjects() {
    var $container = $('#ajax-projects-grid');
    var $loader = $('#ajax-loader');
    var $error = $('#ajax-error');

    if (!$container.length) return;

    $loader.show();
    $container.hide();
    $error.hide();

    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'GET',
      timeout: 8000,
      success: function (data) {
        $loader.hide();
        $container.empty();

        // Take first 6 posts
        var posts = data.slice(0, 6);
        var icons = ['fa-code', 'fa-database', 'fa-globe', 'fa-server', 'fa-mobile-alt', 'fa-shield-alt'];
        var colors = ['#63b3ed', '#b794f4', '#76e4f7', '#f6ad55', '#68d391', '#fc8181'];

        $.each(posts, function (i, post) {
          var title = post.title.charAt(0).toUpperCase() + post.title.slice(1, 50) + (post.title.length > 50 ? '...' : '');
          var body = post.body.charAt(0).toUpperCase() + post.body.slice(1, 100) + '...';
          var card = [
            '<div class="api-card glass-card" data-aos="fade-up" data-aos-delay="' + (i * 80) + '">',
            '  <div class="api-id">POST #' + post.id + ' · USER #' + post.userId + '</div>',
            '  <h4>' + title + '</h4>',
            '  <p>' + body + '</p>',
            '  <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;">',
            '    <span class="project-tag">API</span>',
            '    <span class="project-tag">JSONPlaceholder</span>',
            '    <span class="project-tag">AJAX</span>',
            '  </div>',
            '</div>'
          ].join('');
          $container.append(card);
        });

        $container.fadeIn(400);
        if (typeof AOS !== 'undefined') AOS.refresh();
        showToast('📡 ' + posts.length + ' projects loaded via AJAX!', 'success');
      },
      error: function (xhr, status, err) {
        $loader.hide();
        $error.show();
        console.error('AJAX Error:', status, err);
      }
    });
  }

  /* ── Load button click ── */
  $('#load-api-btn').on('click', function () {
    fetchApiProjects();
  });

  /* ── Auto-load when section scrolls into view ── */
  var apiLoaded = false;
  $(window).on('scroll', function () {
    if (!apiLoaded && $('#projects').length) {
      var sTop = $('#projects').offset().top - window.innerHeight + 200;
      if ($(this).scrollTop() >= sTop) {
        apiLoaded = true;
        fetchApiProjects();
      }
    }
  });

  /* ── Retry on error ── */
  $('#retry-ajax').on('click', function () {
    apiLoaded = false;
    fetchApiProjects();
  });

});
