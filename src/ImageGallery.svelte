<script>
    import { onMount, onDestroy } from 'svelte';

    let currentIndex = 0;
    let interval;
    /**
     * TODO: Add and change image sources to event posters
     */
    const images = [
        { src: '/images/ucsd1.jpg', alt: 'UCSD Campus View' },
        { src: '/images/ucsd2.jpg', alt: 'Geisel Library' },
        { src: '/images/ucsd3.jpg', alt: 'UCSD Beach' },
        { src: '/images/ucsd4.jpg', alt: 'Price Center' },
        { src: '/images/ucsd5.jpg', alt: 'UCSD Sculpture' }
    ];

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
    }

    onMount(() => {
        interval = setInterval(nextImage, 5000); // Change image every 5 seconds
    });

    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<div class="container">
    <div class="image-gallery">
        {#each images as image, i}
            <img
                src={image.src}
                alt={image.alt}
                class:active={i === currentIndex}
            />
        {/each}
    </div>
    <!-- Google Calendar -->
    <div class="google-calendar">
        <!-- TODO: Change calendar source to HDSI Google Calendar -->
        <iframe 
            title="Calendar" 
            src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FLos_Angeles&bgcolor=%23ffffff&src=ZGF2aWRzdW4yMDAyMDkxNUBnbWFpbC5jb20&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%234285F4" 
            frameborder="0" 
            style="width: 100%; height: 100%;"
            scrolling="no"
        ></iframe>
    </div>
</div>


<style>
    .container {
        display: flex;
        max-width: 1200px;
    }
    .image-gallery {
        position: relative;
        width: 40%;
        aspect-ratio: 3/4;
        overflow: hidden;
        border-radius: 12px;
    }
    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }
    img.active {
        opacity: 1;
    }
    .google-calendar {
        position: relative;
        width: 60%;
        height: auto;
        margin: 0 20px;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
</style>