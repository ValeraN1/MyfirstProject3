const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d');

  let width, height;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  window.addEventListener('resize', resize);
  resize();

  // Создадим иконку часов в виде изображения (SVG)
  const clockSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="30" stroke="white" stroke-width="4" fill="none"/>
      <line x1="32" y1="32" x2="32" y2="16" stroke="white" stroke-width="4" stroke-linecap="round"/>
      <line x1="32" y1="32" x2="44" y2="32" stroke="white" stroke-width="4" stroke-linecap="round"/>
      <circle cx="32" cy="32" r="3" fill="white"/>
    </svg>
  `;

  // Превратим SVG в Image
  const img = new Image();
  img.src = 'data:image/svg+xml;base64,' + btoa(clockSVG);

  // Массив часов
  let clocks = [];

  function createClocks(count) {
    clocks = [];
    for(let i=0; i<count; i++) {
      clocks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 10 + 5, // размер от 5 до 15
        speed: Math.random() * 0.5 + 0.2
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for(let c of clocks) {
      ctx.drawImage(img, c.x, c.y, c.size, c.size);
      c.y += c.speed;
      if(c.y > height) {
        c.y = -c.size;
        c.x = Math.random() * width;
      }
    }
    requestAnimationFrame(animate);
  }

  // Когда картинка загрузится, запускаем анимацию
  img.onload = () => {
    createClocks(80);
    animate();
  };