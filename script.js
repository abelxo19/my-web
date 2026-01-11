// 1. Hero Slider
const images = [
    "1000005407.jpg",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    "https://images.unsplash.com/photo-1501117716987-c8e1ecb210c7"
];
let currentIndex = 0;
const hero = document.querySelector(".hero");

function showSlide(index) {
    hero.style.backgroundImage = `url('${images[index]}')`;
}
function nextSlide() { currentIndex = (currentIndex + 1) % images.length; showSlide(currentIndex); }
function prevSlide() { currentIndex = (currentIndex - 1 + images.length) % images.length; showSlide(currentIndex); }

// 2. Main Logic
document.addEventListener("DOMContentLoaded", () => {
    showSlide(currentIndex);
    setInterval(nextSlide, 5000); // በየ 5 ሰከንዱ ይቀየራል

    // Services Slider
    const slider = document.getElementById('slider');
    document.getElementById('nextBtn').onclick = () => slider.scrollLeft += 250;
    document.getElementById('prevBtn').onclick = () => slider.scrollLeft -= 250;

    // FAQ Accordion
    const faqs = document.querySelectorAll('.faq-item');
    faqs.forEach(item => {
        item.querySelector('.faq-q').onclick = () => {
            faqs.forEach(i => i !== item && i.classList.remove('active'));
            item.classList.toggle('active');
        };
    });

    // Mobile Menu
    document.getElementById('menuToggle').onclick = () => {
        document.getElementById('nav-links').style.display =
            document.getElementById('nav-links').style.display === 'flex' ? 'none' : 'flex';
        document.getElementById('nav-links').style.flexDirection = 'column';
    };

    // Form Submit - Connected to Backend
    document.getElementById('bookingForm').onsubmit = async (e) => {
        e.preventDefault();

        // Get form data
        const form = e.target;
        const bookingData = {
            name: form.querySelector('input[type="text"]').value,
            email: form.querySelector('input[type="email"]').value,
            checkIn: form.querySelectorAll('input[type="date"]')[0].value,
            checkOut: form.querySelectorAll('input[type="date"]')[1].value,
            adults: form.querySelectorAll('select')[0].value,
            children: form.querySelectorAll('select')[1].value,
            roomType: form.querySelectorAll('select')[2].value
        };

        // Show loading message
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;

        try {
            // Send booking to backend
            const response = await fetch('http://localhost:3001/api/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            });

            const result = await response.json();

            if (result.success) {
                // Show success message
                alert(`✅ Booking Confirmed!\n\nBooking ID: ${result.booking.id}\nTotal: ${result.booking.totalPrice} ETB\n\nYour receipt will download automatically.`);

                // Download receipt
                window.open(`http://localhost:3001${result.receiptUrl}`, '_blank');

                // Reset form
                form.reset();
            } else {
                alert('❌ Booking failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Could not connect to server. Make sure the backend is running!\n\nRun: npm start');
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    };
});
