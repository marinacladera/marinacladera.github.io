/*
	Astral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var slideIndex = 0;
	var $slides = $('.mySlides');

	// Función para mostrar la diapositiva actual
	function showSlide(index) {
		// Oculta todas las diapositivas
		$slides.hide();
		// Muestra la diapositiva correspondiente al índice
		$slides.eq(index).show();
	}

	// Muestra la primera diapositiva al cargar la página
	showSlide(slideIndex);

	// Función para avanzar o retroceder la diapositiva
	function plusSlides(n) {
		slideIndex += n;
		// Verifica los límites del índice de la diapositiva
		if (slideIndex >= $slides.length) {
		slideIndex = 0;
		} else if (slideIndex < 0) {
		slideIndex = $slides.length - 1;
		}
		// Muestra la diapositiva actualizada
		showSlide(slideIndex);
	}

	// Evento para avanzar la diapositiva al hacer clic en la flecha siguiente
	$('.next').on('click', function() {
		plusSlides(1);
	});

	// Evento para retroceder la diapositiva al hacer clic en la flecha anterior
	$('.prev').on('click', function() {
		plusSlides(-1);
	});


	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$main = $('#main'),
		$panels = $main.children('.panel'),
		$nav = $('#nav'), $nav_links = $nav.children('a');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '361px',   '736px'  ],
			xsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		// $window.on('load', function() {
		// 	window.setTimeout(function() {
		// 		$('#loader').fadeOut();
		// 		$body.removeClass('is-preload');
		// 	}, 100);
		// });

		$window.on('load', function() {
			$('#loader').fadeOut();
			$body.removeClass('is-preload');
		});

	// Nav.
		$nav_links
			.on('click', function(event) {

				var href = $(this).attr('href');

				// Not a panel link? Bail.
					if (href.charAt(0) != '#'
					||	$panels.filter(href).length == 0)
						return;

				// Prevent default.
					event.preventDefault();
					event.stopPropagation();

				// Change panels.
					if (window.location.hash != href)
						window.location.hash = href;

			});

	// Panels.

		// Initialize.
			(function() {

				var $panel, $link;

				// Get panel, link.
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

					}

				// No panel/link? Default to first.
					if (!$panel
					||	$panel.length == 0) {

						$panel = $panels.first();
						$link = $nav_links.first();

					}

				// Deactivate all panels except this one.
					$panels.not($panel)
						.addClass('inactive')
						.hide();

				// Activate link.
					$link
						.addClass('active');

				// Reset scroll.
					$window.scrollTop(0);

			})();

		// Hashchange event.
			$window.on('hashchange', function(event) {

				var $panel, $link;

				// Get panel, link.
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

						// No target panel? Bail.
							if ($panel.length == 0)
								return;

					}

				// No panel/link? Default to first.
					else {

						$panel = $panels.first();
						$link = $nav_links.first();

					}

				// Deactivate all panels.
					$panels.addClass('inactive');

				// Deactivate all links.
					$nav_links.removeClass('active');

				// Activate target link.
					$link.addClass('active');

				// Set max/min height.
					$main
						.css('max-height', $main.height() + 'px')
						.css('min-height', $main.height() + 'px');

				// Delay.
					setTimeout(function() {

						// Hide all panels.
							$panels.hide();

						// Show target panel.
							$panel.show();

						// Set new max/min height.
							$main
								.css('max-height', $panel.outerHeight() + 'px')
								.css('min-height', $panel.outerHeight() + 'px');

						// Reset scroll.
							$window.scrollTop(0);

						// Delay.
							window.setTimeout(function() {

								// Activate target panel.
									$panel.removeClass('inactive');

								// Clear max/min height.
									$main
										.css('max-height', '')
										.css('min-height', '');

								// IE: Refresh.
									$window.triggerHandler('--refresh');

								// Unlock.
									locked = false;

							}, (breakpoints.active('small') ? 0 : 500));

					}, 250);

			});

	// IE: Fixes.
		if (browser.name == 'ie') {

			// Fix min-height/flexbox.
				$window.on('--refresh', function() {

					$wrapper.css('height', 'auto');

					window.setTimeout(function() {

						var h = $wrapper.height(),
							wh = $window.height();

						if (h < wh)
							$wrapper.css('height', '100vh');

					}, 0);

				});

				$window.on('resize load', function() {
					$window.triggerHandler('--refresh');
				});

			// Fix intro pic.
				$('.panel.intro').each(function() {

					var $pic = $(this).children('.pic'),
						$img = $pic.children('img');

					$pic
						.css('background-image', 'url(' + $img.attr('src') + ')')
						.css('background-size', 'cover')
						.css('background-position', 'center');

					$img
						.css('visibility', 'hidden');

				});

		}

})(jQuery);

// ====== Filtros del mosaico ======
(function() {
  var buttons = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('.project-card');
  if (!buttons.length || !cards.length) return;

  function applyFilter(filter) {
    cards.forEach(function(card){
      var cat = card.getAttribute('data-category');
      var show = (filter === 'all') || (cat === filter);
      card.style.display = show ? '' : 'none';
    });
  }

  buttons.forEach(function(btn){
    btn.addEventListener('click', function(){
      buttons.forEach(function(b){ b.classList.remove('is-active'); });
      this.classList.add('is-active');
      applyFilter(this.getAttribute('data-filter'));
    });
  });

  // filtro inicial
  applyFilter('all');
})();


// ===== Volver a proyectos al hacer clic fuera del contenido (solo en /pages/) =====
(function () {
  // Si no es una página interna, no hacemos nada
  if (!/\/pages\//.test(window.location.pathname)) return;

  var mainArticle = document.querySelector('#work');
  if (!mainArticle) return;

  document.addEventListener('click', function (e) {
    // Si el clic fue dentro del contenido principal, salimos
    if (mainArticle.contains(e.target)) return;

    // Permitir nav, enlaces, botones y la ficha técnica
    if (e.target.closest('a, button, nav, .project-header, .tech-sheet')) return;

    // Destino según idioma (en/es)
    var isEnglish = /\/pages\/en\//.test(window.location.pathname);
    var backUrl = isEnglish ? '../index-en.html#work' : '../index.html#work';

    // Clic "fuera": volver a Proyectos
    e.preventDefault();
    if (window.history.length > 1) {
      history.back();
    } else {
      window.location.href = backUrl;
    }
  });
})();

// ==== Toggle "Ficha técnica" / "Project info" (ES/EN) ====
document.addEventListener('DOMContentLoaded', function () {
  var toggleBtn = document.querySelector('[data-toggle="tech"]');
  var sheet = document.getElementById('tech');
  if (!toggleBtn || !sheet) return;

  // Asegura que arranque cerrada
  sheet.classList.remove('is-open');

  toggleBtn.addEventListener('click', function () {
    var opening = !sheet.classList.contains('is-open');
    sheet.classList.toggle('is-open');

    // Estado visual del botón (mismo look que filtros)
    this.classList.toggle('is-active', opening);

    // Labels: usa data-* si están; si no, fallback ES
    var openLabel  = this.getAttribute('data-open-label')  || 'Ocultar ficha técnica';
    var closeLabel = this.getAttribute('data-close-label') || 'Ficha técnica';

    this.setAttribute('aria-expanded', opening ? 'true' : 'false');
    this.textContent = opening ? openLabel : closeLabel;

    if (opening) {
      sheet.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ==== Language switch (mantiene la sección actual) ====
(function () {
  function currentSectionHash() {
    // Si ya hay hash (#work, #curriculum, …) úsalo
    if (location.hash) return location.hash;

    // Si no hay hash, inferir la sección visible (solo index pages)
    var panels = document.querySelectorAll('article.panel[id]');
    if (!panels.length) return '#home';
    var mid = window.innerHeight / 2;
    var best = null, bestOverlap = -1;

    panels.forEach(function (el) {
      var r = el.getBoundingClientRect();
      var overlap = Math.max(0, Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0));
      // usa la que más “pisa” la ventana
      if (overlap > bestOverlap) { bestOverlap = overlap; best = el; }
    });

    return best ? ('#' + best.id) : '#home';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var link = document.getElementById('lang-switch');
    if (!link) return;

    var span = link.querySelector('span') || document.createElement('span');
    if (!link.contains(span)) link.appendChild(span);

    var path = window.location.pathname;
    var file = path.split('/').pop();

    var isIndexES  = /\/index\.html$/.test(path);
    var isIndexEN  = /\/index-en\.html$/.test(path);
    var isProjectEN = /\/pages\/en\//.test(path);
    var isProjectES = /\/pages\//.test(path) && !isProjectEN;

    // Etiqueta del botón según contexto
    if (isIndexEN || isProjectEN) span.textContent = 'Spanish';
    else span.textContent = 'English';

    // Para proyectos, href estático; para index, lo calculamos al hacer clic
    if (isProjectEN) {
      link.href = '../' + file;           // EN -> ES (misma página)
    } else if (isProjectES) {
      link.href = 'en/' + file;           // ES -> EN (misma página)
    } else {
      // Index: resolvemos hash dinámicamente al hacer clic
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var hash = currentSectionHash();
        var target = isIndexEN ? ('index.html' + hash) : ('index-en.html' + hash);
        window.location.href = target;
      });
    }

    // Si querés que también funcione con teclado (Enter/Space) sin seguir hrefs por defecto:
    link.addEventListener('keydown', function (e) {
      if (isIndexEN || isIndexES) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          var hash = currentSectionHash();
          var target = isIndexEN ? ('index.html' + hash) : ('index-en.html' + hash);
          window.location.href = target;
        }
      }
    });
  });
})();