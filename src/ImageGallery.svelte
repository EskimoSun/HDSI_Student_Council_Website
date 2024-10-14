<!-- ImageGallery.svelte -->
<script>
    import { onMount, onDestroy } from 'svelte';

    export let images = [];
    let currentIndex = 0;
    let interval;

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
    <div class="event-container">
        <div class="event_detail">
            <span class="event-title">Halloween Night</span><br>
            <span class="event-description">Come join us at HDSI Multi-purpose room on </span> <a class="date">October 23rd, Wednesday, 6:00 pm</a>
        </div>
        <div class="event_detail">
            <span class="event-title">Study Jam</span><br>
            <span class="event-description">Come join us at HDSI Multi-purpose room on </span> <a class="date">October 23rd, Wednesday, 6:00 pm</a>
        </div>
        <div class="event_detail">
            <span class="event-title">Midterm Movie Night</span><br>
            <span class="event-description">Come join us at HDSI Multi-purpose room on </span> <a class="date">October 23rd, Wednesday, 6:00 pm</a>
        </div>
        <div class="event_detail">
            <span class="event-title">Career Workshop</span><br>
            <span class="event-description">Come join us at HDSI Multi-purpose room on </span> <a class="date">October 23rd, Wednesday, 6:00 pm</a>
        </div>
    </div>
</div>


<style>
    .container {
        display: flex;
        gap: 20px;
    }
    .image-gallery {
        position: relative;
        width: 60%;
        aspect-ratio: 16/9;
        overflow: hidden;
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
    .event_detail {
        font-size: 20px;
        margin: 10px 0;
    }
    .event-title {
        font-weight: 600;
    }
    .event-description {
        font-weight: 100;
    }
    .event-container {
        overflow-y: scroll;
    }
</style>