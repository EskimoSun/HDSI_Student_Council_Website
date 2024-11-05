<script>
    // Array of navigation items
    export let navItems = [
      { id: 'Top', label: 'We Are Here!', href: '#Top', icon: "👋🏻"},
      { id: 'News and Upcoming Events', label: 'Latest News & Events', href: '#News and Upcoming Events', icon: "🎯" },
      { id: 'Feedback Form', label: 'Feedback Form', href: '#Feedback Form', icon: "📝" },
      { id: 'Vote Events', label: 'Vote Events', href: '#Vote Events', icon: "🔼"}, 
      { id: 'Board Introduction', label: 'Meet The Board', href: '#Board Introduction', icon: "🤩" }, 
      { id: 'Resources', label: 'Student Resources', href: '#Resources', icon: "🗂"}
    ];
  
    let activeSection = 'Top';
    let isExpanded = false;
  
    // Function to handle smooth scrolling
    function scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  
    // Update active section based on scroll position
    function handleScroll() {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100; // Offset for fixed header
  
      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
  
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            activeSection = navItems[index].id;
          }
        }
      });
    }
</script>
  
<svelte:window on:scroll={handleScroll} />
  
<nav 
    class="fixed-nav {isExpanded ? 'expanded' : ''}"
    on:mouseenter={() => isExpanded = true}
    on:mouseleave={() => isExpanded = false}
>
    <div class="nav-container">
        {#each navItems as item}
        <button
            class="nav-item {activeSection === item.id ? 'active' : ''}"
            on:click={() => scrollToSection(item.id)}
        >
            <span class="icon">{item.icon}</span>
            <span class="label">{item.label}</span>
        </button>
        {/each}
    </div>
</nav>

<style>
  .fixed-nav {
    position: fixed;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1000;
  }

  .nav-container {
    background: rgba(255, 255, 255, 0.95);
    padding: 8px;
    border-radius: 16px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 4px;
    transition: all 0.3s ease;
    width: 45px;
    height: min-content;
    overflow: hidden;
  }

  .fixed-nav.expanded .nav-container {
    width: 150px;
    gap: 8px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
    border: none;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 12px;
    color: #666;
    width: 100%;
    height: 36px;
    justify-content: flex-start;
  }

  .icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }

  .label {
    opacity: 0;
    transition: opacity 0.1s cubic-bezier(0.4, 0, 0.2, 1);
    transition-delay: 0.18s;
    font-size: 0.9rem;
    text-align: left;
    flex-grow: 1;
  }

  .fixed-nav:not(.expanded) .label {
    transition: opacity 0s;
  }

  .fixed-nav.expanded .label {
    opacity: 1;
  }

  .nav-item:hover {
    background: #f0f0f0;
    color: #333;
  }

  .nav-item.active {
    background: #333;
    color: white;
  }

  /* Collapsed state adjustments */
  .nav-item:not(:last-child) {
    margin-bottom: 4px;
  }
</style>