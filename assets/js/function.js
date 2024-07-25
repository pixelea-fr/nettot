
(function($){
  $(document).ready(function($) {

    var lastScrollTop = 0;
    
    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();

        if (scrollTop > 200) {
            if (scrollTop > lastScrollTop) {
                // L'utilisateur défile vers le bas
                $('body').addClass('menu-not-on-top');
            } else {
                // L'utilisateur défile vers le haut
                $('body').removeClass('menu-not-on-top');
            }
        } else {
            // Si la position de défilement est en haut de la page
            $('body').removeClass('menu-not-on-top');
        }

        lastScrollTop = scrollTop;
    });
      //_________ AJOUT de la hauteur du header au body (comme variable CSS)__________
      // Obtenez la hauteur de l'élément header avec la classe .fixed
      header_height = $('header.wp-block-template-part>.fixed').height();

      // Fonction pour mettre à jour la variable CSS
      function updateHeaderHeight() {
          var headerHeight = $('header.wp-block-template-part>.fixed').height();

          if (headerHeight) {
              // Définir une variable CSS au body avec la hauteur de l'élément header
              $('body').css('--header-height', headerHeight + 'px');
          }
      }

      // Initialiser la hauteur au chargement de la page
      updateHeaderHeight();

      // Utiliser ResizeObserver pour surveiller les changements de taille
      var headerElement = document.querySelector('header.wp-block-template-part>.fixed');
      if (headerElement) {
          var resizeObserver = new ResizeObserver(function(entries) {
              for (let entry of entries) {
                  if (entry.target === headerElement) {
                      // Mettre à jour la hauteur du header si elle change
                      updateHeaderHeight();
                  }
              }
          });

          // Observer les changements de taille de l'élément header
          resizeObserver.observe(headerElement);
      }
      //__________ FIN AJOUT de la hauteur du header au body (comme variable CSS)__________
      //__________ SCROLL TO TOP __________
      // Fonction pour un défilement fluide vers une cible
      function smoothScrollTo(target) {
          var $id = $(target);
          if ($id.length === 0) {
              return;
          }

          // Position supérieure relative au document
          var pos = $id.offset().top - header_height;
          // Défilement animé vers le haut
          $('body, html').animate({scrollTop: pos});

          var urlWithoutAnchor = window.location.href.split('#')[0];

          // Mettre à jour l'URL dans la barre d'adresse du navigateur
          window.history.replaceState(null, null, urlWithoutAnchor);
      }

      // Gérer les liens avec @href commençant par '#'
      $(document).on('click', 'a[href^="#"]', function(e) {
          // Empêcher le comportement par défaut du lien
          e.preventDefault();
          // ID de l'élément cible
          var id = $(this).attr('href');
          smoothScrollTo(id);
      });

      // Gérer les liens avec @href commençant par '/#'
      $(document).on('click', 'a[href^="/#"]', function(e) {
          if (location.hash) {
              e.preventDefault();
              // ID de l'élément cible
              var id = $(this).attr('href');
              id = id.replace('/', ''); 
              smoothScrollTo(id);
          } else {
              if (window.location.pathname == '/') {
                  e.preventDefault();
                  // ID de l'élément cible
                  var id = $(this).attr('href');
                  id = id.replace('/', ''); 
                  smoothScrollTo(id);
              }
          }
      });

      // Après un court délai, vérifier si un hash est présent dans l'URL et défiler vers l'élément cible
      setTimeout(function() {
          if (location.hash) {
              window.scrollTo(0, 0);
              target = location.hash.split('#');
              smoothScrollTo('#' + target[1]);
          }
      }, 1);

      // Gérer le clic sur l'élément avec la classe .top pour défiler vers le haut de la page
      $( ".top" ).on( "click", function() {
          window.scrollTo({top: 0, behavior: 'smooth'});
      });

      // Gérer l'événement de défilement de la fenêtre
      $(window).scroll(function() {    
          var scroll = $(window).scrollTop();

          if (scroll >= 500) {
              if (!$("body").hasClass("scrolled")) {
                  $("body").addClass("scrolled");
              }
          } else {
              if ($("body").hasClass("scrolled")) {
                  $("body").removeClass("scrolled");
              }
          }
      });

          // Vérifiez si l'élément existe dans la page
    if ($(".ti-widget-container").length > 0) {

        // La classe que vous voulez maintenir
        var classeVoulue = "ti-col-3";
        
        // Sélectionnez votre div
        var $monDiv = $(".ti-widget-container");
        
        // Fonction pour vérifier et restaurer la classe
        function verifierEtRestaurerClasse() {
            if ($(window).width() > 980) {
                if (!$monDiv.hasClass(classeVoulue)) {
                    $($monDiv).removeClass(function(index, className) {
                        return (className.match(/(^|\s)ti-col-\S+/g) || []).join(' ');
                    });
                    $monDiv.addClass(classeVoulue);
                    console.log("Classe restaurée : " + classeVoulue);
                }
            }
        }
        
        // Utilisez MutationObserver pour surveiller les changements de classe
        var observateur = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === "attributes" && mutation.attributeName === "class") {
                    verifierEtRestaurerClasse();
                }
            });
        });
        
        // Configuration de l'observateur
        var config = { attributes: true, attributeFilter: ["class"] };
        
        // Démarrez l'observation
        observateur.observe($monDiv[0], config);
        
        // Vérifiez également périodiquement (au cas où)
        setInterval(verifierEtRestaurerClasse, 1000);
        
        // Ajoutez un écouteur d'événement pour le redimensionnement de la fenêtre
        $(window).resize(function() {
            verifierEtRestaurerClasse();
        });
        
        // Vérifiez immédiatement au chargement de la page
        verifierEtRestaurerClasse();

    }

    });
   
})(jQuery);



