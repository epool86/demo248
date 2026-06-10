document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC COUNTDOWN TIMER
  // Set target launch date to 30 days from today to keep the countdown active and working
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 30);
  
  const daysVal = document.getElementById('days');
  const hoursVal = document.getElementById('hours');
  const minutesVal = document.getElementById('minutes');
  const secondsVal = document.getElementById('seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate.getTime() - now;

    if (difference <= 0) {
      clearInterval(timerInterval);
      if (daysVal) daysVal.innerText = '00';
      if (hoursVal) hoursVal.innerText = '00';
      if (minutesVal) minutesVal.innerText = '00';
      if (secondsVal) secondsVal.innerText = '00';
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if (daysVal) daysVal.innerText = days.toString().padStart(2, '0');
    if (hoursVal) hoursVal.innerText = hours.toString().padStart(2, '0');
    if (minutesVal) minutesVal.innerText = minutes.toString().padStart(2, '0');
    if (secondsVal) secondsVal.innerText = seconds.toString().padStart(2, '0');
  }

  // Initial call and set interval
  updateCountdown();
  const timerInterval = setInterval(updateCountdown, 1000);

  // 2. EMAIL SUBSCRIPTION FORM HANDLER
  const form = document.getElementById('subscribe-form');
  const emailInput = document.getElementById('email-input');
  const feedback = document.getElementById('form-feedback');

  if (form && emailInput && feedback) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Reset feedback status
      feedback.className = 'form-feedback';
      feedback.innerText = '';

      const emailValue = emailInput.value.trim();

      // Basic Regex validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailValue) {
        showFeedback('Please enter your email address.', 'error');
        return;
      }

      if (!emailRegex.test(emailValue)) {
        showFeedback('Please enter a valid email address.', 'error');
        return;
      }

      // Proceed to mock submit state
      form.classList.add('subscribing');
      emailInput.disabled = true;
      const submitBtn = form.querySelector('.submit-btn');
      if (submitBtn) submitBtn.disabled = true;

      // Mock network latency for premium feel
      setTimeout(() => {
        // Save to local storage for demo persistence
        try {
          const subscribers = JSON.parse(localStorage.getItem('nexus_subscribers') || '[]');
          if (!subscribers.includes(emailValue)) {
            subscribers.push(emailValue);
            localStorage.setItem('nexus_subscribers', JSON.stringify(subscribers));
          }
        } catch (e) {
          console.warn('LocalStorage is not accessible:', e);
        }

        // Show success message
        form.classList.remove('subscribing');
        emailInput.disabled = false;
        if (submitBtn) submitBtn.disabled = false;
        emailInput.value = '';

        showFeedback('Welcome to the waitlist! We\'ll be in touch soon.', 'success');
      }, 1500);
    });
  }

  function showFeedback(message, type) {
    feedback.innerText = message;
    feedback.className = `form-feedback show ${type}`;
  }
});
