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

// ===== Proyecto interno: toggle de ficha técnica (mismo funcionamiento + estado visual del botón) =====
(function() {
  var toggleBtn = document.querySelector('[data-toggle="tech"]');
  var sheet = document.getElementById('tech');
  if (!toggleBtn || !sheet) return;

  sheet.classList.remove('is-open');

  toggleBtn.addEventListener('click', function() {
    var opening = !sheet.classList.contains('is-open');
    sheet.classList.toggle('is-open');

    // estado visual del botón (igual a filtros)
    this.classList.toggle('is-active', opening);

    // accesibilidad + copy
    this.setAttribute('aria-expanded', opening ? 'true' : 'false');
    this.textContent = opening ? 'Ocultar ficha técnica' : 'Ficha técnica';

    if (opening) {
      sheet.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
})();

// ===== Volver a proyectos al hacer clic fuera del contenido =====
// Sólo activar "click fuera = volver" en páginas internas (/pages/)
(function () {
  // Si la ruta no contiene /pages/ (p.ej. estás en index), no hacemos nada
  if (!/\/pages\//.test(window.location.pathname)) return;

  var mainArticle = document.querySelector('#work');
  if (!mainArticle) return;

  document.addEventListener('click', function (e) {
    // Si el clic fue dentro del contenido principal, salimos
    if (mainArticle.contains(e.target)) return;

    // Dejá funcionar nav, enlaces, botones y la ficha técnica
    if (e.target.closest('a, button, nav, .project-header, .tech-sheet')) return;

    // Clic "fuera": volver a Proyectos
    e.preventDefault();
    if (window.history.length > 1) {
      history.back();
    } else {
      window.location.href = '../index.html#work';
    }
  });
})();
