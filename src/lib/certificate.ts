// Draws a downloadable certificate PNG on an offscreen canvas.
// Runs client-side only — call from a click handler in a client component.
export function downloadCertificate(opts: {
  name: string;
  quizTitle: string;
  scorePercent: number;
  date: string;
}) {
  const { name, quizTitle, scorePercent, date } = opts;

  const width = 1400;
  const height = 990;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const bg = "#0f172a";
  const surface = "#161f38";
  const border = "#2a3a63";
  const primary = "#818cf8";
  const secondary = "#34d399";
  const accent = "#f472b6";
  const text = "#e2e8f0";
  const muted = "#94a3b8";

  // Background
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // Subtle grid dots
  ctx.fillStyle = "rgba(226,232,240,0.05)";
  for (let x = 40; x < width; x += 40) {
    for (let y = 40; y < height; y += 40) {
      ctx.fillRect(x, y, 1, 1);
    }
  }

  // Glow accents
  const glow1 = ctx.createRadialGradient(180, 140, 20, 180, 140, 420);
  glow1.addColorStop(0, "rgba(129,140,248,0.25)");
  glow1.addColorStop(1, "rgba(129,140,248,0)");
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, width, height);

  const glow2 = ctx.createRadialGradient(width - 180, height - 160, 20, width - 180, height - 160, 420);
  glow2.addColorStop(0, "rgba(52,211,153,0.2)");
  glow2.addColorStop(1, "rgba(52,211,153,0)");
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, width, height);

  // Outer border
  ctx.strokeStyle = border;
  ctx.lineWidth = 2;
  ctx.strokeRect(28, 28, width - 56, height - 56);

  // Inner accent border
  ctx.strokeStyle = primary;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(48, 48, width - 96, height - 96);

  // Panel
  ctx.fillStyle = surface;
  ctx.fillRect(70, 70, width - 140, height - 140);
  ctx.strokeStyle = border;
  ctx.lineWidth = 1;
  ctx.strokeRect(70, 70, width - 140, height - 140);

  // Logo mark
  ctx.fillStyle = primary;
  ctx.beginPath();
  ctx.roundRect(width / 2 - 34, 118, 68, 68, 14);
  ctx.fill();
  ctx.fillStyle = bg;
  ctx.font = "600 26px 'JetBrains Mono', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("</>", width / 2, 118 + 36);

  // Eyebrow
  ctx.fillStyle = primary;
  ctx.font = "600 22px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("AI WORKBENCH", width / 2, 232);

  // Title
  ctx.fillStyle = text;
  ctx.font = "700 52px Inter, sans-serif";
  ctx.fillText("Certificate of Completion", width / 2, 300);

  // Subtitle
  ctx.fillStyle = muted;
  ctx.font = "400 24px Inter, sans-serif";
  ctx.fillText("This certifies that", width / 2, 380);

  // Name
  ctx.fillStyle = accent;
  ctx.font = "700 56px Inter, sans-serif";
  ctx.fillText(name || "Anonymous Learner", width / 2, 460);

  // Divider
  ctx.strokeStyle = border;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 220, 500);
  ctx.lineTo(width / 2 + 220, 500);
  ctx.stroke();

  // Completion line
  ctx.fillStyle = muted;
  ctx.font = "400 24px Inter, sans-serif";
  ctx.fillText("has successfully completed the assessment", width / 2, 550);

  ctx.fillStyle = text;
  ctx.font = "700 34px Inter, sans-serif";
  ctx.fillText(quizTitle, width / 2, 600);

  // Score badge
  ctx.fillStyle = "rgba(52,211,153,0.12)";
  ctx.strokeStyle = secondary;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(width / 2 - 140, 640, 280, 64, 32);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = secondary;
  ctx.font = "700 30px 'JetBrains Mono', monospace";
  ctx.fillText(`Score: ${scorePercent}%`, width / 2, 673);

  // Date + footer
  ctx.fillStyle = muted;
  ctx.font = "400 20px Inter, sans-serif";
  ctx.fillText(date, width / 2, height - 130);
  ctx.font = "400 16px 'JetBrains Mono', monospace";
  ctx.fillText("Issued by AI Workbench · aiworkbench.app", width / 2, height - 100);

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${quizTitle.replace(/\s+/g, "-").toLowerCase()}-certificate.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, "image/png");
}
