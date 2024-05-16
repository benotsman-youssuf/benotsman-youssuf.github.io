window.addEventListener('load', () => {
    const animatedBg = document.querySelector('.animated-bg');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Create spaceships
    for (let i = 0; i < 5; i++) {
        const spaceship = document.createElement('div');
        spaceship.classList.add('spaceship');
        spaceship.style.left = `${Math.random() * 100}vw`;
        spaceship.style.top = `${Math.random() * 100}vh`;
        animatedBg.appendChild(spaceship);
    }

    // Create spaceship2
    for (let i = 0; i < 3; i++) {
        const spaceship2 = document.createElement('div');
        spaceship2.classList.add('spaceship2');
        spaceship2.style.left = `${Math.random() * 100}vw`;
        spaceship2.style.top = `${Math.random() * 100}vh`;
        animatedBg.appendChild(spaceship2);
    }

    // Function to create an alien
    function createAlien() {
        const alien = document.createElement('div');
        alien.classList.add('alien');
        alien.style.left = `${Math.random() * 100}vw`;
        alien.style.top = `${Math.random() * 100}vh`;

        const targetX = Math.random() * window.innerWidth;
        const targetY = Math.random() * window.innerHeight;

        alien.dataset.targetX = targetX;
        alien.dataset.targetY = targetY;

        animatedBg.appendChild(alien);
        moveAlien(alien);
    }

    // Move alien towards its target
    function moveAlien(alien) {
        const targetX = parseFloat(alien.dataset.targetX);
        const targetY = parseFloat(alien.dataset.targetY);

        const interval = setInterval(() => {
            const currentX = parseFloat(alien.style.left);
            const currentY = parseFloat(alien.style.top);

            const distanceX = targetX - currentX;
            const distanceY = targetY - currentY;

            // Move alien towards target position
            alien.style.left = `${currentX + distanceX * 0.01}px`;
            alien.style.top = `${currentY + distanceY * 0.01}px`;

            // Check if alien reaches the target position
            if (Math.abs(currentX - targetX) < 10 && Math.abs(currentY - targetY) < 10) {
                clearInterval(interval);
                alien.classList.add('exploding');

                // Remove the alien after the explosion animation ends
                setTimeout(() => {
                    alien.remove();
                    createAlien();  // Create a new alien
                }, 500);  // Adjust this time to match the explosion animation duration
            }
        }, 20);
    }

    // Create initial aliens
    for (let i = 0; i < 10; i++) {
        createAlien();
    }

    // Create lasers from spaceships
    setInterval(() => {
        const spaceships = document.querySelectorAll('.spaceship');
        spaceships.forEach(spaceship => {
            const spaceshipRect = spaceship.getBoundingClientRect();
            const laser = document.createElement('div');
            laser.classList.add('laser');
            laser.style.left = `${spaceshipRect.left + spaceshipRect.width / 2}px`;
            laser.style.top = `${spaceshipRect.top}px`;
            animatedBg.appendChild(laser);
            setTimeout(() => {
                laser.remove();
            }, 1000);
        });
    }, 1000);

    // Create lasers from spaceship2
    setInterval(() => {
        const spaceships2 = document.querySelectorAll('.spaceship2');
        spaceships2.forEach(spaceship2 => {
            const spaceshipRect2 = spaceship2.getBoundingClientRect();
            const laser2 = document.createElement('div');
            laser2.classList.add('laser');
            laser2.style.left = `${spaceshipRect2.left + spaceshipRect2.width / 2}px`;
            laser2.style.top = `${spaceshipRect2.top}px`;
            animatedBg.appendChild(laser2);
            setTimeout(() => {
                laser2.remove();
            }, 1000);
        });
    }, 1000);

    // Theme toggle event listener
    themeToggle.addEventListener('change', () => {
        body.classList.toggle('night-mode');
    });
});
