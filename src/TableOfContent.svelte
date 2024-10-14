<!-- TableOfContents.svelte -->
<script>
    import { onMount } from 'svelte';

    let sections = [];
    let activeSection = '';

    onMount(() => {
        sections = Array.from(document.querySelectorAll('h2, h3'))
            .map(heading => ({
                id: heading.id || heading.innerText.toLowerCase().replace(/\s+/g, '-'),
                text: heading.innerText,
                level: parseInt(heading.tagName.charAt(1))
            }));

        if (sections.length > 0) {
            activeSection = sections[0].id;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    activeSection = entry.target.id;
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => {
            const element = document.getElementById(section.id);
            if (element) observer.observe(element);
        });

        return () => {
            sections.forEach(section => {
                const element = document.getElementById(section.id);
                if (element) observer.unobserve(element);
            });
        };
    });
</script>

<nav class="table-of-contents">
    <ul>
        {#each sections as section}
            <li class="level-{section.level}" class:active={activeSection === section.id}>
                <a href="#{section.id}">{section.text}</a>
            </li>
        {/each}
    </ul>
</nav>

<style>
    .table-of-contents {
        position: fixed;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        background: white;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        max-height: 80vh;
        overflow-y: auto;
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    li {
        margin-bottom: 5px;
    }

    .level-3 {
        margin-left: 15px;
        font-size: 0.9em;
    }

    a {
        text-decoration: none;
        color: #333;
    }

    .active > a {
        font-weight: bold;
        color: #0066cc;
    }
</style>