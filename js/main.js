document.addEventListener('DOMContentLoaded', () => {

      /* --------------------------------------------------------------------------
         1. NAVBAR SCROLL INTERACTION
         -------------------------------------------------------------------------- */
      const navbar = document.getElementById('navbar');
      
      const handleNavbarScroll = () => {
        if (window.scrollY > 30) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      };
      
      window.addEventListener('scroll', handleNavbarScroll, { passive: true });
      handleNavbarScroll();

      /* --------------------------------------------------------------------------
         2. MENÚ MÓVIL (DRAWER)
         -------------------------------------------------------------------------- */
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      const mobileDrawer = document.getElementById('mobileDrawer');
      const mobileLinks = document.querySelectorAll('.mobile-drawer-link');
      const btnMobileCotiza = document.getElementById('btnMobileCotiza');

      const toggleMobileMenu = () => {
        const isOpen = mobileDrawer.classList.contains('open');
        if (isOpen) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      };

      const openMobileMenu = () => {
        mobileDrawer.classList.add('open');
        mobileMenuBtn.classList.add('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        mobileDrawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      };

      const closeMobileMenu = () => {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      };

      mobileMenuBtn.addEventListener('click', toggleMobileMenu);

      mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
      });

      if (btnMobileCotiza) {
        btnMobileCotiza.addEventListener('click', () => {
          closeMobileMenu();
          openContactModal();
        });
      }

      /* --------------------------------------------------------------------------
         3. MODAL DE CONTACTO
         -------------------------------------------------------------------------- */
      const contactModal = document.getElementById('contactModal');
      const modalCloseBtn = document.getElementById('modalCloseBtn');
      const btnHeroCotizar = document.getElementById('btnHeroCotizar');
      const btnHeroContacto = document.getElementById('btnHeroContacto');
      const btnNavCotiza = document.getElementById('btnNavCotiza');

      const openContactModal = () => {
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        modalCloseBtn.focus();
      };

      const closeContactModal = () => {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
      };

      if (btnHeroCotizar) btnHeroCotizar.addEventListener('click', openContactModal);
      if (btnHeroContacto) btnHeroContacto.addEventListener('click', openContactModal);
      if (btnNavCotiza) btnNavCotiza.addEventListener('click', openContactModal);
      if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeContactModal);

      // Cerrar al hacer clic fuera de la tarjeta
      contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
          closeContactModal();
        }
      });

      // Cerrar con tecla Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (contactModal.classList.contains('active')) {
            closeContactModal();
          }
          if (mobileDrawer.classList.contains('open')) {
            closeMobileMenu();
          }
        }
      });

      /* --------------------------------------------------------------------------
         4. CARRUSEL DE PROYECTOS (VANILLA JS - 9 IMÁGENES)
         -------------------------------------------------------------------------- */
      const track = document.getElementById('projectsTrack');
      const viewport = document.getElementById('projectsViewport');
      const slides = Array.from(track.querySelectorAll('.project-slide'));
      const prevBtn = document.getElementById('btnPrevProject');
      const nextBtn = document.getElementById('btnNextProject');
      const dotsContainer = document.getElementById('carouselDots');

      let currentIndex = 0;
      let autoPlayTimer = null;

      // Calcular tarjetas visibles según ancho de viewport
      const getVisibleCount = () => {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
      };

      const getMaxIndex = () => {
        const visible = getVisibleCount();
        return Math.max(0, slides.length - visible);
      };

      // Crear dots indicadores
      const createDots = () => {
        dotsContainer.innerHTML = '';
        const maxIndex = getMaxIndex();
        const totalPages = maxIndex + 1;

        for (let i = 0; i < totalPages; i++) {
          const dot = document.createElement('button');
          dot.classList.add('carousel-dot');
          dot.setAttribute('aria-label', `Ir a página de proyecto ${i + 1}`);
          if (i === currentIndex) dot.classList.add('active');
          
          dot.addEventListener('click', () => {
            goToSlide(i);
            resetAutoPlay();
          });
          dotsContainer.appendChild(dot);
        }
      };

      const updateDots = () => {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentIndex);
        });
      };

      const updateCarouselPosition = () => {
        if (!slides.length) return;
        const slideWidth = slides[0].getBoundingClientRect().width;
        const gap = 24; // 1.5rem
        const offset = -(currentIndex * (slideWidth + gap));
        track.style.transform = `translateX(${offset}px)`;
        updateDots();
      };

      const goToSlide = (index) => {
        const maxIndex = getMaxIndex();
        if (index < 0) {
          currentIndex = maxIndex;
        } else if (index > maxIndex) {
          currentIndex = 0;
        } else {
          currentIndex = index;
        }
        updateCarouselPosition();
      };

      const nextSlide = () => {
        goToSlide(currentIndex + 1);
      };

      const prevSlide = () => {
        goToSlide(currentIndex - 1);
      };

      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          prevSlide();
          resetAutoPlay();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          nextSlide();
          resetAutoPlay();
        });
      }

      // Auto-rotación del carrusel con pausa en hover
      const startAutoPlay = () => {
        stopAutoPlay();
        autoPlayTimer = setInterval(nextSlide, 5000);
      };

      const stopAutoPlay = () => {
        if (autoPlayTimer) clearInterval(autoPlayTimer);
      };

      const resetAutoPlay = () => {
        stopAutoPlay();
        startAutoPlay();
      };

      viewport.addEventListener('mouseenter', stopAutoPlay);
      viewport.addEventListener('mouseleave', startAutoPlay);

      // Soporte táctil / touch swipe en el carrusel
      let touchStartX = 0;
      let touchEndX = 0;

      viewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
      }, { passive: true });

      viewport.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay();
      }, { passive: true });

      const handleSwipe = () => {
        const threshold = 40;
        if (touchStartX - touchEndX > threshold) {
          nextSlide();
        } else if (touchEndX - touchStartX > threshold) {
          prevSlide();
        }
      };

      // Inicializar Carrusel
      createDots();
      updateCarouselPosition();
      startAutoPlay();

       window.addEventListener('resize', () => {
         const max = getMaxIndex();
         if (currentIndex > max) currentIndex = max;
         createDots();
         updateCarouselPosition();
       }, { passive: true });

       /* --------------------------------------------------------------------------
          4b. CARRUSEL DE PRODUCTOS (5 IMÁGENES)
          -------------------------------------------------------------------------- */
        const productsTrack = document.getElementById('productsTrack');
        const productsViewport = document.getElementById('productsViewport');
        const productSlides = Array.from(productsTrack.querySelectorAll('.product-slide'));
        const btnPrevProduct = document.getElementById('btnPrevProduct');
        const btnNextProduct = document.getElementById('btnNextProduct');
        const productsDotsContainer = document.getElementById('productsDots');
        const productsMobileDotsContainer = document.getElementById('productsMobileDots');
        const btnPrevProductMobile = document.getElementById('btnPrevProductMobile');
        const btnNextProductMobile = document.getElementById('btnNextProductMobile');

        let productsCurrentIndex = 0;
        let productsAutoPlayTimer = null;
        const isProductsMobile = () => window.innerWidth <= 768;

        const getProductsVisibleCount = () => {
          if (isProductsMobile()) return 1;
          if (window.innerWidth <= 1024) return 2;
          return 5;
        };

        const getProductsMaxIndex = () => {
          const visible = getProductsVisibleCount();
          return Math.max(0, productSlides.length - visible);
        };

        const createProductsDots = (dotsContainer) => {
          if (!dotsContainer) return;
          dotsContainer.innerHTML = '';
          const maxIndex = getProductsMaxIndex();
          const totalPages = maxIndex + 1;

          for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.classList.add('products-carousel-dot');
            if (i === productsCurrentIndex) dot.classList.add('active');
            dot.setAttribute('aria-label', `Ir a producto ${i + 1}`);
            dot.addEventListener('click', () => {
              productsCurrentIndex = i;
              if (!isProductsMobile()) {
                updateProductsCarouselPosition();
              } else {
                scrollProductsToIndex(i);
              }
              resetProductsAutoPlay();
            });
            dotsContainer.appendChild(dot);
          }
        };

        const updateProductsDots = (dotsContainer) => {
          if (!dotsContainer) return;
          const dots = dotsContainer.querySelectorAll('.products-carousel-dot');
          dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === productsCurrentIndex);
          });
        };

        const updateProductsCarouselPosition = () => {
          if (!productSlides.length || isProductsMobile()) return;
          const slideWidth = productSlides[0].getBoundingClientRect().width;
          const gap = 24;
          const offset = -(productsCurrentIndex * (slideWidth + gap));
          productsTrack.style.transform = `translateX(${offset}px)`;
        };

        const scrollProductsToIndex = (index) => {
          if (!productsTrack || !productSlides.length) return;
          const cardWidth = productSlides[0].offsetWidth + 16;
          productsTrack.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
        };

        const scrollProducts = (direction) => {
          if (!productsTrack || !productSlides.length) return;
          const cardWidth = productSlides[0].offsetWidth + 16;
          productsTrack.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
        };

        const goToProductSlide = (index) => {
          const maxIndex = getProductsMaxIndex();
          if (index < 0) {
            productsCurrentIndex = maxIndex;
          } else if (index > maxIndex) {
            productsCurrentIndex = 0;
          } else {
            productsCurrentIndex = index;
          }
          if (!isProductsMobile()) {
            updateProductsCarouselPosition();
          } else {
            scrollProductsToIndex(productsCurrentIndex);
          }
        };

        const nextProductSlide = () => {
          goToProductSlide(productsCurrentIndex + 1);
        };

        const prevProductSlide = () => {
          goToProductSlide(productsCurrentIndex - 1);
        };

        if (btnPrevProduct) {
          btnPrevProduct.addEventListener('click', () => {
            prevProductSlide();
            resetProductsAutoPlay();
          });
        }

        if (btnNextProduct) {
          btnNextProduct.addEventListener('click', () => {
            nextProductSlide();
            resetProductsAutoPlay();
          });
        }

        if (btnPrevProductMobile) {
          btnPrevProductMobile.addEventListener('click', () => {
            scrollProducts(-1);
            resetProductsAutoPlay();
          });
        }

        if (btnNextProductMobile) {
          btnNextProductMobile.addEventListener('click', () => {
            scrollProducts(1);
            resetProductsAutoPlay();
          });
        }

        const startProductsAutoPlay = () => {
          stopProductsAutoPlay();
          if (isProductsMobile()) {
            productsAutoPlayTimer = setInterval(() => scrollProducts(1), 5000);
          } else {
            productsAutoPlayTimer = setInterval(nextProductSlide, 5000);
          }
        };

        const stopProductsAutoPlay = () => {
          if (productsAutoPlayTimer) clearInterval(productsAutoPlayTimer);
        };

        const resetProductsAutoPlay = () => {
          stopProductsAutoPlay();
          startProductsAutoPlay();
        };

        if (productsViewport) {
          productsViewport.addEventListener('mouseenter', stopProductsAutoPlay);
          productsViewport.addEventListener('mouseleave', startProductsAutoPlay);
        }

        // Touch swipe en el carrusel de productos (solo desktop)
        if (!isProductsMobile()) {
          let productsTouchStartX = 0;
          let productsTouchEndX = 0;

          if (productsViewport) {
            productsViewport.addEventListener('touchstart', (e) => {
              productsTouchStartX = e.changedTouches[0].screenX;
              stopProductsAutoPlay();
            }, { passive: true });

            productsViewport.addEventListener('touchend', (e) => {
              productsTouchEndX = e.changedTouches[0].screenX;
              const threshold = 40;
              if (productsTouchStartX - productsTouchEndX > threshold) {
                nextProductSlide();
              } else if (productsTouchEndX - productsTouchStartX > threshold) {
                prevProductSlide();
              }
              startProductsAutoPlay();
            }, { passive: true });
          }
        }

        // Inicializar Carrusel de Productos
        createProductsDots(productsDotsContainer);
        createProductsDots(productsMobileDotsContainer);
        updateProductsCarouselPosition();
        startProductsAutoPlay();

        window.addEventListener('resize', () => {
          const max = getProductsMaxIndex();
          if (productsCurrentIndex > max) productsCurrentIndex = max;
          createProductsDots(productsDotsContainer);
          createProductsDots(productsMobileDotsContainer);
          updateProductsCarouselPosition();
        }, { passive: true });

         // Scroll snap tracking para mobile
         if (productsTrack) {
           productsTrack.addEventListener('scroll', () => {
             if (isProductsMobile()) {
               const cardWidth = productSlides[0].offsetWidth + 16;
                const scrollPos = productsTrack.scrollLeft;
               const activeIdx = Math.round(scrollPos / cardWidth);
               const dots = productsMobileDotsContainer.querySelectorAll('.products-carousel-dot');
               dots.forEach((dot, idx) => {
                 dot.classList.toggle('active', idx === activeIdx);
               });
               const dotsDesktop = productsDotsContainer.querySelectorAll('.products-carousel-dot');
               dotsDesktop.forEach((dot, idx) => {
                 dot.classList.toggle('active', idx === activeIdx);
               });
             }
           }, { passive: true });
         }

        /* --------------------------------------------------------------------------
           5b. SECTORES QUE ATENDEMOS - CARRUSEL AUTO-SCROLLING (MÓVIL)
           -------------------------------------------------------------------------- */
        /* --------------------------------------------------------------------------
           5b. SECTORES QUE ATENDEMOS - CARRUSEL CONTINUO Y SUAVE (MÓVIL)
           -------------------------------------------------------------------------- */
        const sectorsGridEl = document.getElementById('sectorsGrid');
        const originalSectorItems = Array.from(sectorsGridEl.querySelectorAll('.sector-item'));
        const isSectorsMobile = () => window.innerWidth <= 768;

        originalSectorItems.forEach(item => {
          const clone = item.cloneNode(true);
          clone.classList.remove('reveal');
          clone.classList.add('sector-clone');
          sectorsGridEl.appendChild(clone);
        });

        let sectorsAnimFrame = null;
        let sectorsSpeed = 0.4;
        let sectorsPaused = false;
        let sectorsOriginalWidth = 0;

        const updateWidth = () => {
          if (!originalSectorItems.length) { sectorsOriginalWidth = 0; return; }
          sectorsOriginalWidth = originalSectorItems[0].getBoundingClientRect().width * originalSectorItems.length;
        };

        setTimeout(updateWidth, 150);

        const autoScroll = () => {
          if (!sectorsGridEl || !isSectorsMobile()) {
            sectorsAnimFrame = requestAnimationFrame(autoScroll);
            return;
          }
          if (!sectorsPaused && sectorsOriginalWidth > 0) {
            sectorsGridEl.scrollLeft += sectorsSpeed;
            if (sectorsGridEl.scrollLeft >= sectorsOriginalWidth) {
              sectorsGridEl.scrollLeft = 0;
            }
          }
          sectorsAnimFrame = requestAnimationFrame(autoScroll);
        };

        if (sectorsGridEl) {
          sectorsGridEl.addEventListener('scroll', () => {
            if (!isSectorsMobile() || sectorsOriginalWidth <= 0) return;
            if (sectorsGridEl.scrollLeft >= sectorsOriginalWidth) {
              sectorsGridEl.scrollLeft = 0;
            }
          }, { passive: true });

          sectorsGridEl.addEventListener('mouseenter', () => { sectorsPaused = true; });
          sectorsGridEl.addEventListener('mouseleave', () => { sectorsPaused = false; });
          sectorsGridEl.addEventListener('touchstart', () => { sectorsPaused = true; }, { passive: true });
          sectorsGridEl.addEventListener('touchend', () => { sectorsPaused = false; }, { passive: true });
        }

        setTimeout(()=>{if(!document.hidden) autoScroll();},5000);

        let resizeTimer;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(updateWidth, 200);
        }, { passive: true });

        /* --------------------------------------------------------------------------
           5. INTERSECTION OBSERVER (REVEAL ANIMATIONS)
           -------------------------------------------------------------------------- */
      const servicesGrid = document.getElementById('servicesGrid');
      const btnPrevService = document.getElementById('btnPrevService');
      const btnNextService = document.getElementById('btnNextService');
      const servicesDotsContainer = document.getElementById('servicesDots');

      if (servicesGrid) {
        const serviceCards = Array.from(servicesGrid.querySelectorAll('.service-card'));
        
        const createServicesDots = () => {
          if (!servicesDotsContainer) return;
          servicesDotsContainer.innerHTML = '';
          serviceCards.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.classList.add('services-dot');
            if (idx === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Ir a servicio ${idx + 1}`);
            dot.addEventListener('click', () => {
      const cardWidth = serviceCards[0].offsetWidth + 16;
              servicesGrid.scrollTo({
                left: idx * cardWidth,
                behavior: 'smooth'
              });
            });
            servicesDotsContainer.appendChild(dot);
          });
        };

        const updateActiveServiceDot = () => {
          if (!servicesDotsContainer || !serviceCards.length) return;
          const cardWidth = serviceCards[0].offsetWidth + 16;
          const scrollPos = servicesGrid.scrollLeft;
          const activeIdx = Math.round(scrollPos / cardWidth);
          const dots = servicesDotsContainer.querySelectorAll('.services-dot');
          dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === activeIdx);
          });
        };

        if (btnPrevService) {
          btnPrevService.addEventListener('click', () => {
            const cardWidth = serviceCards[0] ? serviceCards[0].offsetWidth + 16 : 300;
            servicesGrid.scrollBy({ left: -cardWidth, behavior: 'smooth' });
          });
        }

        if (btnNextService) {
          btnNextService.addEventListener('click', () => {
            const cardWidth = serviceCards[0] ? serviceCards[0].offsetWidth + 16 : 300;
            servicesGrid.scrollBy({ left: cardWidth, behavior: 'smooth' });
          });
        }

        servicesGrid.addEventListener('scroll', updateActiveServiceDot, { passive: true });
        createServicesDots();
        
        window.addEventListener('resize', createServicesDots, { passive: true });
      }

      /* --------------------------------------------------------------------------
         5. INTERSECTION OBSERVER (REVEAL ANIMATIONS)
         -------------------------------------------------------------------------- */
      const revealElements = document.querySelectorAll('.reveal');

      if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.1,
          rootMargin: '0px 0px -30px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
      } else {
        revealElements.forEach(el => el.classList.add('active'));
      }

    });