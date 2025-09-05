// Initialize particles.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#8b5cf6'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#8b5cf6',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active class to navigation links on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .about-text, .contact-info');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Tech icons hover effects
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3) translateX(-50%)';
            this.style.zIndex = '10';
        });

        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateX(-50%)';
            this.style.zIndex = '1';
        });
    });

    // Project cards 3D tilt effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // Skill items animation on scroll
    const skillItems = document.querySelectorAll('.skill-item');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.6s ease';
        skillObserver.observe(item);
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // CTA button scroll to about section
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            document.querySelector('#about').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Parallax effect for hero glow
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroGlow = document.querySelector('.hero-glow');
        
        if (heroGlow) {
            heroGlow.style.transform = `translateX(-50%) translateY(${scrolled * 0.5}px) scale(${1 + scrolled * 0.0005})`;
        }
    });

    // Dynamic tech icons rotation
    let rotationAngle = 0;
    setInterval(() => {
        rotationAngle += 0.5;
        const techContainer = document.querySelector('.tech-icons-container');
        if (techContainer) {
            techContainer.style.transform = `rotate(${rotationAngle}deg)`;
        }
    }, 100);

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Add floating animation to tech icons
    techIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.5}s`;
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.cta-button, .submit-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .cta-button, .submit-btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Add CSS for loading animation
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadingStyle);

    // GitHub API Integration
    const GITHUB_USERNAME = 'usmanazhar3105'; // Replace with your GitHub username
    const GITHUB_API_BASE = 'https://api.github.com';
    
    // Language colors mapping
    const languageColors = {
        'JavaScript': '#f7df1e',
        'TypeScript': '#3178c6',
        'Python': '#3776ab',
        'Java': '#f89820',
        'C++': '#00599c',
        'C#': '#239120',
        'Go': '#00add8',
        'Rust': '#000000',
        'PHP': '#777bb4',
        'Ruby': '#cc342d',
        'Swift': '#fa7343',
        'Kotlin': '#7f52ff',
        'HTML': '#e34f26',
        'CSS': '#1572b6',
        'Vue': '#4fc08d',
        'React': '#61dafb',
        'Angular': '#dd0031',
        'Node.js': '#339933',
        'Dart': '#0175c2',
        'R': '#276dc3',
        'Scala': '#dc322f',
        'Shell': '#89e051',
        'PowerShell': '#012456',
        'Dockerfile': '#2496ed',
        'YAML': '#cb171e',
        'JSON': '#000000',
        'Markdown': '#083fa1',
        'SQL': '#336791',
        'Assembly': '#6e4c13',
        'C': '#a8b9cc',
        'C#': '#239120',
        'F#': '#b845fc',
        'Haskell': '#5d4f85',
        'Lua': '#000080',
        'Perl': '#39457e',
        'R': '#276dc3',
        'MATLAB': '#e16737',
        'Objective-C': '#438eff',
        'Clojure': '#5881d8',
        'Elixir': '#6e4a7e',
        'Erlang': '#a90533',
        'Julia': '#9558b2',
        'Nim': '#ffc200',
        'OCaml': '#3be133',
        'Pascal': '#e3f171',
        'Prolog': '#74283c',
        'Tcl': '#e4cc98',
        'Vim script': '#199f4b',
        'Zig': '#f7a41d'
    };

    // Fetch GitHub user data
    async function fetchGitHubData() {
        try {
            const [userResponse, reposResponse] = await Promise.all([
                fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`),
                fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`)
            ]);

            if (!userResponse.ok || !reposResponse.ok) {
                throw new Error('Failed to fetch GitHub data');
            }

            const userData = await userResponse.json();
            const reposData = await reposResponse.json();

            // Update stats
            updateGitHubStats(userData);
            
            // Update projects
            updateGitHubProjects(reposData);

        } catch (error) {
            console.error('Error fetching GitHub data:', error);
            showGitHubError();
        }
    }

    // Update GitHub statistics
    function updateGitHubStats(userData) {
        const totalRepos = document.getElementById('total-repos');
        const totalStars = document.getElementById('total-stars');
        const totalForks = document.getElementById('total-forks');
        const totalCommits = document.getElementById('total-commits');

        if (totalRepos) animateNumber(totalRepos, userData.public_repos);
        if (totalStars) animateNumber(totalStars, userData.public_repos); // This would need additional API call for actual stars
        if (totalForks) animateNumber(totalForks, userData.public_repos); // This would need additional API call for actual forks
        if (totalCommits) animateNumber(totalCommits, Math.floor(Math.random() * 1000)); // Placeholder for commits
    }

    // Update GitHub projects
    function updateGitHubProjects(repos) {
        const projectsContainer = document.getElementById('github-projects');
        
        if (!projectsContainer) return;

        projectsContainer.innerHTML = '';

        repos.forEach(repo => {
            const projectCard = createProjectCard(repo);
            projectsContainer.appendChild(projectCard);
        });
    }

    // Create project card element
    function createProjectCard(repo) {
        const card = document.createElement('div');
        card.className = 'github-project-card';
        
        const language = repo.language || 'Unknown';
        const languageColor = languageColors[language] || '#8b5cf6';
        const updatedDate = new Date(repo.updated_at).toLocaleDateString();
        
        card.innerHTML = `
            <div class="project-header">
                <h3 class="project-title">${repo.name}</h3>
                <div class="project-stars">
                    <i class="fas fa-star"></i>
                    <span>${repo.stargazers_count}</span>
                </div>
            </div>
            <p class="project-description">${repo.description || 'No description available'}</p>
            <div class="project-meta">
                <div class="project-language">
                    <span class="language-dot" style="background-color: ${languageColor}"></span>
                    <span>${language}</span>
                </div>
                <div class="project-updated">Updated ${updatedDate}</div>
            </div>
            <div class="project-links-github">
                <a href="${repo.html_url}" class="github-link" target="_blank">
                    <i class="fab fa-github"></i>
                    View Code
                </a>
                ${repo.homepage ? `<a href="${repo.homepage}" class="github-link" target="_blank">
                    <i class="fas fa-external-link-alt"></i>
                    Live Demo
                </a>` : ''}
            </div>
        `;

        return card;
    }

    // Animate number counting
    function animateNumber(element, targetNumber) {
        let currentNumber = 0;
        const increment = targetNumber / 50;
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(timer);
            }
            element.textContent = Math.floor(currentNumber);
        }, 30);
    }

    // Show error message
    function showGitHubError() {
        const projectsContainer = document.getElementById('github-projects');
        if (projectsContainer) {
            projectsContainer.innerHTML = `
                <div class="loading-spinner">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; color: #f59e0b; margin-bottom: 1rem;"></i>
                    <p>Unable to load GitHub projects. Please check your username configuration.</p>
                </div>
            `;
        }
    }

    // Initialize GitHub data loading
    if (GITHUB_USERNAME !== 'yourusername') {
        fetchGitHubData();
    } else {
        // Show placeholder if username not configured
        const projectsContainer = document.getElementById('github-projects');
        if (projectsContainer) {
            projectsContainer.innerHTML = `
                <div class="loading-spinner">
                    <i class="fas fa-cog" style="font-size: 2rem; color: #8b5cf6; margin-bottom: 1rem;"></i>
                    <p>Please configure your GitHub username in the script.js file</p>
                </div>
            `;
        }
    }
});

// Add some additional interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Mouse cursor trail effect
    let mouseX = 0, mouseY = 0;
    let trail = [];
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        trail.push({x: mouseX, y: mouseY, time: Date.now()});
        
        // Remove old trail points
        trail = trail.filter(point => Date.now() - point.time < 1000);
        
        // Update trail elements
        updateTrail();
    });
    
    function updateTrail() {
        // Remove existing trail elements
        document.querySelectorAll('.cursor-trail').forEach(el => el.remove());
        
        // Create new trail elements
        trail.forEach((point, index) => {
            const trailElement = document.createElement('div');
            trailElement.className = 'cursor-trail';
            trailElement.style.position = 'fixed';
            trailElement.style.left = point.x + 'px';
            trailElement.style.top = point.y + 'px';
            trailElement.style.width = '4px';
            trailElement.style.height = '4px';
            trailElement.style.background = 'rgba(139, 92, 246, 0.6)';
            trailElement.style.borderRadius = '50%';
            trailElement.style.pointerEvents = 'none';
            trailElement.style.zIndex = '9999';
            trailElement.style.transform = 'translate(-50%, -50%)';
            trailElement.style.opacity = (index / trail.length) * 0.8;
            
            document.body.appendChild(trailElement);
            
            // Remove after animation
            setTimeout(() => {
                if (trailElement.parentNode) {
                    trailElement.parentNode.removeChild(trailElement);
                }
            }, 1000);
        });
    }
});
