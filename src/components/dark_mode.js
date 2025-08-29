document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('darkModeToggle');
  if (!toggle) return;

  // Load saved theme
  const isDark = localStorage.getItem('theme') === 'dark';
  document.body.classList.toggle('dark-mode', isDark);
  toggle.checked = isDark;

  // Toggle theme on change
  toggle.addEventListener('change', () => {
    const enabled = toggle.checked;
    document.body.classList.toggle('dark-mode', enabled);
    localStorage.setItem('theme', enabled ? 'dark' : 'light');
  });
});