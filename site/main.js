document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('mobile-active');
            
            // Toggle hamburger icon animation
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = nav.classList.contains('mobile-active') ? 'rotate(45deg) translate(5px, 6px)' : 'none';
            spans[1].style.opacity = nav.classList.contains('mobile-active') ? '0' : '1';
            spans[2].style.transform = nav.classList.contains('mobile-active') ? 'rotate(-45deg) translate(5px, -6px)' : 'none';
        });

        // Close menu when clicking a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('mobile-active');
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach(span => span.style.transform = 'none');
                spans[1].style.opacity = '1';
            });
        });
    }

    // 2. Scroll Spy (Highlight active navigation link)
    const sections = document.querySelectorAll('section, .hero');
    const navItems = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // 3. Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.service-card, .problem-card, .about-container, .cta-box');
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        // Initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        revealOnScroll.observe(element);
    });

    // 4. Calculadora de Custo de Inatividade (Downtime Calculator)
    const initCalculator = () => {
        const calcContainer = document.getElementById('calc-container');
        if (!calcContainer) return;

        calcContainer.innerHTML = `
            <div class="calc-card" style="background: var(--bg-card); border: 1px solid var(--border); padding: 2rem; border-radius: 16px; margin-top: 3rem; text-align: left;">
                <h3 style="font-size: 1.5rem; margin-bottom: 1.5rem; color: var(--text-main); font-family: var(--font-heading);">
                    Calculadora de Risco: Quanto custa sua TI lenta ou parada?
                </h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
                    <div>
                        <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem;">
                            Nº de computadores/funcionários:
                        </label>
                        <input type="number" id="calc-staff" value="5" min="1" max="100" style="width: 100%; padding: 0.75rem; background: rgba(0,0,0,0.2); border: 1px solid var(--border); border-radius: 8px; color: var(--text-main); font-family: var(--font-body); font-weight: 600;">
                    </div>
                    <div>
                        <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem;">
                            Custo médio/hora de funcionário (R$):
                        </label>
                        <input type="number" id="calc-rate" value="35" min="1" style="width: 100%; padding: 0.75rem; background: rgba(0,0,0,0.2); border: 1px solid var(--border); border-radius: 8px; color: var(--text-main); font-family: var(--font-body); font-weight: 600;">
                    </div>
                    <div>
                        <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem;">
                            Horas perdidas/mês com lentidão ou falhas:
                        </label>
                        <input type="number" id="calc-hours" value="4" min="1" max="720" style="width: 100%; padding: 0.75rem; background: rgba(0,0,0,0.2); border: 1px solid var(--border); border-radius: 8px; color: var(--text-main); font-family: var(--font-body); font-weight: 600;">
                    </div>
                </div>
                
                <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 12px; padding: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
                    <div>
                        <p style="font-size: 0.85rem; color: var(--text-muted);">Prejuízo mensal estimado por inatividade:</p>
                        <h4 id="calc-result" style="font-size: 1.75rem; color: #ef4444; font-family: var(--font-heading); margin-top: 0.25rem;">R$ 700,00</h4>
                    </div>
                    <div style="text-align: right;">
                        <p style="font-size: 0.85rem; color: var(--text-muted);">Com suporte preventivo ServiDesk:</p>
                        <h4 style="font-size: 1.75rem; color: var(--accent); font-family: var(--font-heading); margin-top: 0.25rem;">Evitado</h4>
                    </div>
                </div>
                <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">
                    * Cálculo baseado no custo de produtividade perdida (Nº funcionários × custo/hora × horas inativas). Não inclui perda de faturamento por pacientes ou clientes que deixam de ser atendidos durante as falhas.
                </p>
            </div>
        `;

        const staffInput = document.getElementById('calc-staff');
        const rateInput = document.getElementById('calc-rate');
        const hoursInput = document.getElementById('calc-hours');
        const resultEl = document.getElementById('calc-result');

        const calculate = () => {
            const staff = parseInt(staffInput.value) || 0;
            const rate = parseFloat(rateInput.value) || 0;
            const hours = parseFloat(hoursInput.value) || 0;
            
            const totalLoss = staff * rate * hours;
            resultEl.textContent = `R$ ${totalLoss.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        };

    initCalculator();

    // 5. FAQ Accordion Interaction
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Toggle state of clicked item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
});
