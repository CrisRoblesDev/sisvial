document.addEventListener('DOMContentLoaded', () => {

      


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

      
      contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
          closeContactModal();
        }
      });

      
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

      
      const initBelowFold = () => {
      


      const track = document.getElementById('projectsTrack');
      const viewport = document.getElementById('projectsViewport');
      const slides = Array.from(track.querySelectorAll('.project-slide'));
      const prevBtn = document.getElementById('btnPrevProject');
      const nextBtn = document.getElementById('btnNextProject');
      const dotsContainer = document.getElementById('carouselDots');

      let currentIndex = 0;

      
      const getVisibleCount = () => {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
      };

      const getMaxIndex = () => {
        const visible = getVisibleCount();
        return Math.max(0, slides.length - visible);
      };

      
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
        const gap = 24; 
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
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          nextSlide();
        });
      }


      
      let touchStartX = 0;
      let touchEndX = 0;

      viewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      viewport.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });

      const handleSwipe = () => {
        const threshold = 40;
        if (touchStartX - touchEndX > threshold) {
          nextSlide();
        } else if (touchEndX - touchStartX > threshold) {
          prevSlide();
        }
      };

      createDots();
      updateCarouselPosition();

       window.addEventListener('resize', () => {
         const max = getMaxIndex();
         if (currentIndex > max) currentIndex = max;
         createDots();
         updateCarouselPosition();
       }, { passive: true });

       


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

        let prodCardW = 0;
const cachedProdCardW = () => {
if (!prodCardW && productSlides.length) prodCardW = productSlides[0].offsetWidth + 16;
return prodCardW || 300;
};
const scrollProductsToIndex = (index) => {
if (!productsTrack || !productSlides.length) return;
productsTrack.scrollTo({ left: index * cachedProdCardW(), behavior: 'smooth' });
};
const scrollProducts = (direction) => {
if (!productsTrack || !productSlides.length) return;
productsTrack.scrollBy({ left: direction * cachedProdCardW(), behavior: 'smooth' });
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
          });
        }

        if (btnNextProduct) {
          btnNextProduct.addEventListener('click', () => {
            nextProductSlide();
          });
        }

        if (btnPrevProductMobile) {
          btnPrevProductMobile.addEventListener('click', () => {
            scrollProducts(-1);
          });
        }

        if (btnNextProductMobile) {
          btnNextProductMobile.addEventListener('click', () => {
            scrollProducts(1);
          });
        }


        
        if (!isProductsMobile()) {
          let productsTouchStartX = 0;
          let productsTouchEndX = 0;

          if (productsViewport) {
            productsViewport.addEventListener('touchstart', (e) => {
              productsTouchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            productsViewport.addEventListener('touchend', (e) => {
              productsTouchEndX = e.changedTouches[0].screenX;
              const threshold = 40;
              if (productsTouchStartX - productsTouchEndX > threshold) {
                nextProductSlide();
              } else if (productsTouchEndX - productsTouchStartX > threshold) {
                prevProductSlide();
              }
            }, { passive: true });
          }
        }

        createProductsDots(productsDotsContainer);
        createProductsDots(productsMobileDotsContainer);
        updateProductsCarouselPosition();

        window.addEventListener('resize', () => {
          prodCardW = 0;
if (typeof servCardW !== 'undefined') servCardW = 0;
const max = getProductsMaxIndex();
          if (productsCurrentIndex > max) productsCurrentIndex = max;
          createProductsDots(productsDotsContainer);
          createProductsDots(productsMobileDotsContainer);
          updateProductsCarouselPosition();
        }, { passive: true });

         
         let prodTicking = false;
if (productsTrack) {
productsTrack.addEventListener('scroll', () => {
if (!isProductsMobile() || prodTicking) return;
prodTicking = true;
requestAnimationFrame(() => {
const cardWidth = cachedProdCardW();
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
             prodTicking = false;
});
}, { passive: true });
         }

        



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

        let servCardW = 0;
const cachedServCardW = () => {
if (!servCardW && serviceCards.length) servCardW = serviceCards[0].offsetWidth + 16;
return servCardW || 300;
};
const updateActiveServiceDot = () => {
if (!servicesDotsContainer || !serviceCards.length) return;
const cardWidth = cachedServCardW();
          const scrollPos = servicesGrid.scrollLeft;
          const activeIdx = Math.round(scrollPos / cardWidth);
          const dots = servicesDotsContainer.querySelectorAll('.services-dot');
          dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === activeIdx);
          });
        };

        if (btnPrevService) {
          btnPrevService.addEventListener('click', () => {
            servicesGrid.scrollBy({ left: -cachedServCardW(), behavior: 'smooth' });
          });
        }

        if (btnNextService) {
          btnNextService.addEventListener('click', () => {
            servicesGrid.scrollBy({ left: cachedServCardW(), behavior: 'smooth' });
          });
        }

        let servTicking = false;
servicesGrid.addEventListener('scroll', () => {
if (servTicking) return;
servTicking = true;
requestAnimationFrame(() => { updateActiveServiceDot(); servTicking = false; });
}, { passive: true });
        createServicesDots();
        
        window.addEventListener('resize', createServicesDots, { passive: true });
      }

      };
      if ('requestIdleCallback' in window) {
        requestIdleCallback(initBelowFold, { timeout: 1800 });
      } else {
        setTimeout(initBelowFold, 400);
      }

      


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