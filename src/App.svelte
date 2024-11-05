<!-- App.svelte -->
<script>
    import { onMount } from 'svelte';
    import { v4 as uuidv4 } from 'uuid';
    import Thread from './Thread.svelte';
    import ImageGallery from './ImageGallery.svelte';
    import NavigationBar from './NavigationBar.svelte';
    import BoardGallery from './BoardGallery.svelte';

    let threads = [];
    let newThreadTitle = '';
    let clientId;

    onMount(async () => {
        // Generate or retrieve client ID
        clientId = localStorage.getItem('clientId');
        if (!clientId) {
            clientId = uuidv4();
            localStorage.setItem('clientId', clientId);
        }
        await fetchThreads();
    });

    async function fetchThreads() {
        const response = await fetch('http://localhost:3000/api/threads');
        const fetchedThreads = await response.json();
        threads = fetchedThreads.map(thread => ({
            ...thread,
            upvotedBy: Array.isArray(thread.upvotedBy) ? thread.upvotedBy : [],
            downvotedBy: Array.isArray(thread.downvotedBy) ? thread.downvotedBy : []
        }));
    }

    async function createThread() {
        const response = await fetch('http://localhost:3000/api/threads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: newThreadTitle }),
        });
        const newThread = await response.json();
        threads = [...threads, newThread];
        newThreadTitle = '';
    }

    async function voteThread(id, voteType) {
        try {
            const response = await fetch(`http://localhost:3000/api/threads/${id}/vote`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ clientId, voteType }),
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            
            const updatedThread = await response.json();
            threads = threads.map(t => t.id === updatedThread.id ? updatedThread : t);
        } catch (error) {
            alert(`Error updating vote: ${error.message}`);
        }
    }


    function hasUpvoted(thread) {
        return thread.upvotedBy.includes(clientId);
    }

    function hasDownvoted(thread) {
        return thread.downvotedBy.includes(clientId);
    }
</script>

<main>
    <div class="title-bar">
        <div class="title-text">HDSI Student Council</div>
        <div class="title-subtext">
            <a class="homing" href="https://datascience.ucsd.edu/">Home</a>
            <span class="current">  /  HDSI Student Council</span>
        </div>
    </div>

    <NavigationBar />

    <div class="main-page">
        <section id="Top">
            <img id="logo" src="/assets/logo.png" alt="HDSI Student Council"/>
            <h2>WE ARE HERE!</h2>
            <p>
                Introducing the all new HDSI Student Council, operated by data science students, and for ALL data science students! No matter if you are an undergraduate or graduate, majoring or minoring, prospective student or alumni, we are here to help you all!
                Our mission is to advocate for the student body, and connect everyone with the school administration, department and campus resources, alumni, and outside institutes. 
                As this is the first year for HDSI Student Council, we would like to collect feedback and suggestion from all of you on what we should focus on. Share with us any ideas, questions, complaints, or random thoughts you have! 
            </p>
            <div class="follow-us">
                Remember to follow us:  
                <a href="https://www.instagram.com/hdsistudentcouncil?igsh=MzRlODBiNWFlZA=="><img class="linked-icon" src="/assets/Instagram_Glyph_Black.png" alt="Instagram"></a> 
                <a href="https://www.x.com/"><img class="linked-icon" src="/assets/X-logo-black.png" alt="Twitter/X"></a> 
                <a href="https://www.linkedin.com/"><img class="linked-icon" src="/assets/LI-In-Bug.png" alt="LinkedIn"></a> 
                <a href="https://www.discord.com/"><img class="linked-icon" src="/assets/discord-mark-black.png" alt="Discord"></a>
            </div>
        </section>
        <hr>
        <section id="News and Upcoming Events">
            <h2>Latest News & Events</h2>
            <ImageGallery />
        </section>
        <hr>
        <section id="Feedback Form">
            <h2>Questions for HDSI or Student Council?</h2>
            <p>
                Have you ever wanted to suggest improvements to the data science curriculum? Have you had difficulty in reaching out to faculty members? Do you have a specific issue that HDSI currently cannot address?
                Or maybe you would like to see more fun events from the student council? 
                You can share your thoughts on us, the department, or academic curriculum through our <u>Feedback & Suggestions Form</u>!
            </p>
            <div class="form-button-container">
                <a href="https://forms.gle/9shDPvjwwru9Lbtu9" target="_blank" class="form-button">
                    <span class="button-text">Give Us Feedback!</span>
                    <span class="button-icon">📝</span>
                </a>
            </div>
        </section>
        <hr>
        <section id="Vote Events">
            <h2>Here Are Some Future Events. Vote For Your Favorite!</h2>
            <div class="threads-block">
                {#each threads as thread (thread.id)}
                    <Thread 
                        {thread} 
                        upvoted={hasUpvoted(thread)}
                        downvoted={hasDownvoted(thread)}
                        on:vote={(event) => voteThread(thread.id, event.detail)}
                    />
                {/each}
            </div>
        </section>
        <hr>
        <section id="Board Introduction">
            <h2>Meet the Board</h2>
            <BoardGallery />
        </section>
        <hr>
        <section id="Resources">
            <h2>Student Resources</h2>
            <div class="resources-channel">
                <a href="placeholder">Apply For Conference Travel Fund</a>
            </div>
        </section>
    </div>

    <div class="footer-bar">
        <div class="footer-logo-container">
            <a href="https://ucsd.edu/"><img class="footer-logo" src="/assets/ucsd-footer-logo-white.png" alt="UCSD"/></a>
        </div>
    </div>
</main>

<style>
    @font-face {
        font-family: 'Brix Sans Light';
        src: url('/fonts/HvDTrial_BrixSans-Light-BF64c337930afcd.otf') format('opentype');
    }
    @font-face {
        font-family: 'Brix Sans Medium';
        src: url('/fonts/HvDTrial_BrixSans-Medium-BF64c337932cdbe.otf') format('opentype');
    }
    main {
        font-family: 'Brix Sans Light', Arial, sans-serif;
        max-width: 2000px;
        margin: 0 auto;
    }
    .title-text{
        text-align: center;
        line-height: 54px;
        letter-spacing: 0px;
        font-weight: 600;
        font-style: normal;
        color: #fff;
        font-size: 48px;
        opacity: 1;
        visibility: visible;
        transition: opacity 0.24s ease-in-out;
        padding: 100px 0 0;
        text-shadow: 3px 3px 5px #061920b3, 0 0 25px #06192033;
    }
    .title-subtext {
        font-size: 15px;
        color: #fff;
        margin: 20px 0 0;
        text-align: center;
        font-weight: 600;
        text-shadow: 2px 2px 3px #0619204a, 0 0 5px #06192033;
    }
    .main-page {
        padding: 20px;
        margin: 0 8%;
        color: #484949;
    }
    h2 {
        font-weight: 400;
        font-size: 48px;
        margin: 20px 0;
    }
    p {
        font-weight: 10;
        font-size: 18px;
        line-height: 2;
        letter-spacing: 0.5px;
        margin: 0 0 20px;
    }
    #logo {
        margin: 0 calc(50% - 75px);
        width: 150px;
        height: 150px;
    }
    .follow-us {
        font-weight: 10;
        font-size: 18px;
        letter-spacing: 0.5px;
    }
    .linked-icon {
        width: auto;
        height: 18px;
        margin: 0 5px;
    }
    .form-button-container {
        width: 90%;
        max-width: 600px;
        margin: 2rem auto;
        text-align: center;
    }
    .form-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        background-color: #4285f4;
        color: white;
        padding: 20px 40px;
        border-radius: 16px;
        text-decoration: none;
        font-size: 1.5rem;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }
    .form-button:hover {
        background-color: #3367d6;
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
    .button-text {
        margin-right: 8px;
    }
    .button-icon {
        font-size: 1.8rem;
    }
    form {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
    }
    input {
        flex-grow: 1;
        padding: 5px;
    }
    button {
        padding: 5px 10px;
        background-color: #0079d3;
        color: white;
        border: none;
        cursor: pointer;
    }
    .threads-block {
        background-color: #f5f5f5;
        max-height: 600px;
        overflow-y: auto;
    }
    .resources-channel {
        margin-bottom: 100px;
    }
    hr {
        height: 0.5px;
        color: #484949;
        margin: 50px 0;
    }
    .title-bar {
        background-image: url(https://datascience.ucsd.edu/wp-content/uploads/2024/04/Footer_1688x485px-scaled.jpg);
        background-position: center center;
        background-color: #0079d3;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
        height: 300px;
        position: relative;
        z-index: 1;
    }
    .footer-bar {
        height: 150px;
        background-color: #00629B;
        padding: 30px 0 0 0;
    }
    .footer-logo-container {
        text-align: right;
        height: 30%;
        padding: 0 50px;
    }
    .footer-logo {
        height: 30px;
    }
    a:link.homing {color: #fff;}
    a:visited.homing {color: #fff;}
    a:hover.homing {color: #fff;}
    a:active.homing {color: #fff;}
</style>
