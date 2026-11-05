/* ==========================================
   TIMOR NOVOSELSKY PHOTOGRAPHY - GALLERY & UI CONTROLLER
   ========================================== */

function goBack(defaultUrl) {
    if (document.referrer && document.referrer.indexOf(window.location.host) !== -1) {
        window.history.back();
    } else {
        window.location.href = defaultUrl || (document.documentElement.lang === 'de' || window.location.pathname.includes('-de') ? 'index-de.html' : 'index.html');
    }
}

function toggleFullscreen(event) {
    if (event) {
        event.stopPropagation();
        if (event.preventDefault) event.preventDefault();
    }
    const img = document.getElementById('lightboxImg');
    if (!img) return;
    
    if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (img.requestFullscreen) {
            img.requestFullscreen();
        } else if (img.webkitRequestFullscreen) {
            img.webkitRequestFullscreen();
        } else if (img.msRequestFullscreen) {
            img.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

function cleanSpecialCharacters(str) {
    if (!str) return '';
    return str
        .replace(/B&#25c;rchen|Bc;rchen|B&uuml;rchen/gi, 'Bürchen')
        .replace(/Dossen-H&#25c;tte|Dossenh&#25c;tte/gi, 'Dossen-Hütte')
        .replace(/L&#25c;tschenpass/gi, 'Lötschenpass')
        .replace(/Schwarzwasserbr&#25c;cke/gi, 'Schwarzwasserbrücke')
        .replace(/&#25c;/g, 'ü')
        .replace(/&uuml;/gi, 'ü')
        .replace(/&auml;/gi, 'ä')
        .replace(/&ouml;/gi, 'ö')
        .replace(/&szlig;/gi, 'ß');
}

function openLightbox(imgElement) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxTitle = document.getElementById("lightboxTitle") || document.getElementById("lightboxCaption");
    const lightboxSubtitle = document.getElementById("lightboxSubtitle");
    
    if (!lightbox || !lightboxImg) return;
    
    lightboxImg.src = imgElement.src;
    
    let title = imgElement.getAttribute("data-title") || imgElement.getAttribute("caption") || imgElement.alt || "";
    let subtitle = imgElement.getAttribute("data-subtitle") || "";
    
    title = cleanSpecialCharacters(title);
    subtitle = cleanSpecialCharacters(subtitle);
    
    if (lightboxTitle) {
        lightboxTitle.textContent = title;
        lightboxTitle.style.display = title ? 'block' : 'none';
    }
    if (lightboxSubtitle) {
        lightboxSubtitle.textContent = subtitle;
        lightboxSubtitle.style.display = subtitle ? 'block' : 'none';
    }
    
    lightbox.classList.add("activeLightbox");
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (lightbox) lightbox.classList.remove("activeLightbox");
}

function openStoryModal(imgSrc, title, subtitle, fullText) {
    const modal = document.getElementById("storyModal");
    const modalImg = document.getElementById("storyModalImg");
    const modalTitle = document.getElementById("storyModalTitle");
    const modalSubtitle = document.getElementById("storyModalSubtitle");
    const modalText = document.getElementById("storyModalText");

    if (!modal || !modalImg) return;

    modalImg.src = imgSrc;
    if (modalTitle) modalTitle.textContent = title || "";
    if (modalSubtitle) {
        modalSubtitle.textContent = subtitle || "";
        modalSubtitle.style.display = subtitle ? "block" : "none";
    }
    if (modalText) modalText.innerHTML = fullText || "";

    modal.classList.add("activeStoryModal");
}

function closeStoryModal() {
    const modal = document.getElementById("storyModal");
    if (modal) modal.classList.remove("activeStoryModal");
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
        closeStoryModal();
    }
});
