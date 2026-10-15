/**
 * CYBER ROSTER • GLOSSY BLACK CODER EDITION
 * 1. Cyber Coder Streams & Laser Rain Canvas Animation
 * 2. Background Audio Autoplay & Loop Engine
 * 3. 3D Card Parallax Tilt & Specular Light Hover
 */

document.addEventListener("DOMContentLoaded", () => {
  /* ============================================================
     0. TIKTOK STYLE WELCOME INTRO ENGINE
     ============================================================ */
  const welcomeIntro = document.getElementById("welcomeIntro");
  let isWelcomeDismissed = false;

  function dismissWelcomeIntro() {
    if (isWelcomeDismissed || !welcomeIntro) return;
    isWelcomeDismissed = true;

    // Kích hoạt animation slide-up rời đi
    welcomeIntro.classList.add("hide-intro");

    // Tự động kích hoạt nhạc nền nếu chưa phát
    if (!isAudioPlaying) {
      startAudioPlayback();
    }

    // Gỡ bỏ hoàn toàn sau hiệu ứng transition 0.85s
    setTimeout(() => {
      welcomeIntro.style.display = "none";
    }, 850);
  }

  if (welcomeIntro) {
    // 1. Nhấp hoặc chạm bất kỳ đâu để vào ngay và bật nhạc
    welcomeIntro.addEventListener("click", () => {
      dismissWelcomeIntro();
    });

    welcomeIntro.addEventListener("touchstart", () => {
      dismissWelcomeIntro();
    }, { passive: true });

    // 2. Tự động chuyển vào trang sau 3.8s (giống video TikTok để xem trọn vẹn intro)
    const autoDismissTimer = setTimeout(() => {
      dismissWelcomeIntro();
    }, 3800);

    // 3. Phím Enter hoặc Space
    window.addEventListener("keydown", (e) => {
      if (!isWelcomeDismissed && (e.key === "Enter" || e.key === " " || e.key === "Escape")) {
        clearTimeout(autoDismissTimer);
        dismissWelcomeIntro();
      }
    });
  }

  /* ============================================================
     1. CYBER CODER STREAMS & MATRIX LASER CANVAS
     ============================================================ */
  const canvas = document.getElementById("cyberCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Ký tự & cú pháp Coder đặc trưng
    const cyberChars = [
      "0", "1", "<>", "</>", "{ }", "=>", "==", "!=", "++", "--",
      "const", "let", "var", "async", "await", "function", "return",
      "import", "export", "class", "void", "true", "false", "null",
      "0xFA", "0x3C", "0x09", "API", "DEV", "ROOT", "SSH", "GIT",
      "while", "try", "catch", "push", "pop", "JSON", "HTTP", "SSL",
      ";", "{", "}", "[", "]", "$", "#", "&", "*", "|", "~"
    ];

    // Tạo các cột dòng code rơi (Coder Streams)
    const columnSpacing = 28; // Khoảng cách giữa các cột
    let columnsCount = Math.floor(width / columnSpacing);
    let streams = [];

    class CodeStream {
      constructor(x) {
        this.x = x;
        this.reset();
        // Cho xuất hiện rải rác từ trước để không bị trống lúc mở trang
        this.y = Math.random() * -height;
      }

      reset() {
        this.y = Math.random() * -200;
        this.speed = 1.6 + Math.random() * 2.8; // Tốc độ rơi mượt mà
        this.length = 12 + Math.floor(Math.random() * 18); // Chiều dài dải code
        this.chars = [];
        this.glowColor = "rgba(255, 255, 255, 0.75)"; // Ánh bạc sang trọng
        this.headColor = "#ffffff"; // Đầu tia phát sáng trắng tinh khôi
        this.isLaser = Math.random() > 0.7; // Dải laser mảnh tốc độ cao

        for (let i = 0; i < this.length; i++) {
          this.chars.push(cyberChars[Math.floor(Math.random() * cyberChars.length)]);
        }
      }

      update() {
        this.y += this.speed;

        // Đổi ngẫu nhiên một vài ký tự trong lúc rơi để tạo cảm giác code đang chạy
        if (Math.random() < 0.08) {
          const randomIndex = Math.floor(Math.random() * this.chars.length);
          this.chars[randomIndex] = cyberChars[Math.floor(Math.random() * cyberChars.length)];
        }

        // Chạm đáy thì hồi sinh lại từ trên đỉnh
        if (this.y - this.length * 20 > height) {
          this.reset();
        }
      }

      draw() {
        if (this.isLaser) {
          // Vẽ tia laser mảnh màu bạc chuyển động
          const laserHeight = 80 + Math.random() * 50;
          const grad = ctx.createLinearGradient(this.x, this.y - laserHeight, this.x, this.y);
          grad.addColorStop(0, "transparent");
          grad.addColorStop(0.7, "rgba(255, 255, 255, 0.2)");
          grad.addColorStop(1, "rgba(255, 255, 255, 0.9)");

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(this.x, this.y - laserHeight);
          ctx.lineTo(this.x, this.y);
          ctx.stroke();

          // Điểm sáng ở đầu tia laser
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "rgba(255, 255, 255, 0.9)";
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(this.x, this.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // Reset shadow
        } else {
          // Vẽ dòng ký tự code rơi màu bạc monochrome
          ctx.font = "12px 'DM Mono', monospace";
          for (let i = 0; i < this.length; i++) {
            const charY = this.y - i * 16;
            if (charY < -20 || charY > height + 20) continue;

            const progress = i / this.length;
            const alpha = (1 - progress) * 0.75;

            if (i === 0) {
              // Ký tự đầu tiên: Màu trắng phát sáng
              ctx.fillStyle = "#ffffff";
              ctx.shadowColor = "rgba(255, 255, 255, 0.9)";
              ctx.shadowBlur = 10;
            } else if (i < 3) {
              ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
              ctx.shadowBlur = 4;
            } else {
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.45})`;
              ctx.shadowBlur = 0;
            }

            ctx.fillText(this.chars[i], this.x, charY);
          }
          ctx.shadowBlur = 0; // Reset
        }
      }
    }

    function initStreams() {
      columnsCount = Math.floor(width / columnSpacing);
      streams = [];
      for (let i = 0; i < columnsCount; i++) {
        streams.push(new CodeStream(i * columnSpacing + 10));
      }
    }

    initStreams();

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStreams();
    });

    // Vòng lặp vẽ mượt mà 60fps
    function animateCyberCanvas() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < streams.length; i++) {
        streams[i].update();
        streams[i].draw();
      }
      requestAnimationFrame(animateCyberCanvas);
    }

    requestAnimationFrame(animateCyberCanvas);
  }

  /* ============================================================
     2. AUDIO AUTOPLAY & CONTINUOUS LOOP ENGINE
     ============================================================ */
  const audio = document.getElementById("bgAudio");
  const musicCapsule = document.getElementById("musicCapsule");
  const musicToggleBtn = document.getElementById("musicToggleBtn");
  const iconPlay = document.getElementById("iconPlay");
  const iconPause = document.getElementById("iconPause");
  const musicStatus = document.getElementById("musicStatus");

  let isAudioPlaying = false;

  if (audio) {
    audio.loop = true; // Luôn luôn lặp lại khi hết nhạc
  }

  function setPlayerPlayingState(playing) {
    isAudioPlaying = playing;
    if (playing) {
      musicCapsule.classList.add("music-playing");
      iconPlay.style.display = "none";
      iconPause.style.display = "block";
      musicStatus.textContent = "Đang phát";
      musicStatus.style.color = "#ffffff";
    } else {
      musicCapsule.classList.remove("music-playing");
      iconPlay.style.display = "block";
      iconPause.style.display = "none";
      musicStatus.textContent = "Tạm dừng";
      musicStatus.style.color = "#94a3b8";
    }
  }

  async function startAudioPlayback() {
    if (!audio) return;
    try {
      await audio.play();
      setPlayerPlayingState(true);
    } catch (err) {
      // Khi trình duyệt chặn lúc chưa có tương tác
      setPlayerPlayingState(false);
    }
  }

  function pauseAudioPlayback() {
    if (!audio) return;
    audio.pause();
    setPlayerPlayingState(false);
  }

  // Tự động phát ngay khi vừa load vào trang
  startAudioPlayback();

  // Nút bật / tắt nhạc duy nhất trên thanh điều khiển
  if (musicToggleBtn) {
    musicToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (isAudioPlaying) {
        pauseAudioPlayback();
      } else {
        startAudioPlayback();
      }
    });
  }

  // Dự phòng khi kết thúc nhạc: Tự động phát lại bài hát ngay lập tức
  if (audio) {
    audio.addEventListener("ended", () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    });
  }

  /* ============================================================
     3. 3D CARD PARALLAX TILT & SPECULAR HIGHLIGHT
     ============================================================ */
  const isTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const cards = document.querySelectorAll(".roster-card");

  if (!isTouchScreen && cards.length > 0) {
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((mouseY - centerY) / centerY) * -6; // Giới hạn 6 độ
        const rotateY = ((mouseX - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
      });
    });
  }
});
