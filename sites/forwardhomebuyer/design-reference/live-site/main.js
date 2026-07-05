const EDGE_FUNCTION_URL = 'https://dqrqbrvkgayhtcxhpczt.supabase.co/functions/v1/notify-web-lead';

function toggleFaq(btn) {
    btn.classList.toggle('active');
    btn.nextElementSibling.classList.toggle('active');
}

async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const btn = document.getElementById('submitBtn');
    const nameVal = form.elements['name'].value.trim();
    const nameParts = nameVal.split(' ');
    btn.disabled = true;
    btn.textContent = 'Submitting...';
    
    try {
        const response = await fetch(EDGE_FUNCTION_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                first_name: nameParts[0] || '',
                last_name: nameParts.slice(1).join(' ') || nameParts[0],
                phone: form.elements['phone'].value.trim(),
                email: form.elements['email'].value.trim(),
                property_address: form.elements['address'].value.trim(),
                notes: 'Submitted via website form'
            })
        });
        if (!response.ok) throw new Error('Failed');
        form.style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
        // Build email link with pre-filled subject and body from form data
        const addr = form.elements['address'].value.trim();
        const emailSubject = encodeURIComponent('Cash Offer Request - ' + addr);
        const emailBody = encodeURIComponent(
            'Hi Ken,\n\nI just submitted my information on your website and would like to discuss selling my property.\n\n' +
            'Name: ' + nameVal + '\n' +
            'Phone: ' + form.elements['phone'].value.trim() + '\n' +
            'Property: ' + addr + '\n\n' +
            'Please let me know the next steps.\n\nThank you'
        );
        const emailLink = document.getElementById('successEmailLink');
        if (emailLink) {
            emailLink.href = 'mailto:forwardhomebuyer@gmail.com?subject=' + emailSubject + '&body=' + emailBody;
        }
    } catch (e) {
        btn.disabled = false;
        btn.textContent = 'Get My Cash Offer →';
        alert('Something went wrong. Please call us directly at 920-397-2922.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Mobile nav: toggle dropdowns on click
    document.querySelectorAll('.nav-dropdown-wrap > a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                this.parentElement.classList.toggle('open');
            }
        });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
        const nav = document.querySelector('.header-nav');
        const btn = document.querySelector('.mobile-menu-btn');
        if (nav && nav.classList.contains('mobile-open') && !nav.contains(e.target) && !btn.contains(e.target)) {
            nav.classList.remove('mobile-open');
        }
    });
});