<!-- App.svelte -->
<script>
    import { onMount } from 'svelte';
    import { v4 as uuidv4 } from 'uuid';
    import Thread from './Thread.svelte';
    import ImageGallery from './ImageGallery.svelte';
    import TableOfContent from './TableOfContent.svelte';

    let threads = [];
    let newThreadTitle = '';
    let clientId;
    const council = [
        {id: 1, title: 'Internal Committee Director', name: 'Karina Zambani'},
        {id: 2, title: 'Internal Committee Member', name: 'David Sun'}, 
        {id: 3, title: 'Internal Committee Director', name: 'Karina Zambani'},
        {id: 4, title: 'Internal Committee Member', name: 'David Sun'}, 
        {id: 5, title: 'Internal Committee Director', name: 'Karina Zambani'},
        {id: 6, title: 'Internal Committee Member', name: 'David Sun'}, 
        {id: 7, title: 'Internal Committee Director', name: 'Karina Zambani'},
        {id: 8, title: 'Internal Committee Member', name: 'David Sun'}, 
        {id: 9, title: 'Internal Committee Director', name: 'Karina Zambani'},
        {id: 10, title: 'Internal Committee Member', name: 'David Sun'}, 
    ];

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

    const images = [
        { src: '/images/ucsd1.jpg', alt: 'UCSD Campus View' },
        { src: '/images/ucsd2.jpg', alt: 'Geisel Library' },
        { src: '/images/ucsd3.jpg', alt: 'UCSD Beach' },
        { src: '/images/ucsd4.jpg', alt: 'Price Center' },
        { src: '/images/ucsd5.jpg', alt: 'UCSD Sculpture' }
    ];
</script>

<main>
    <div class="title-bar">
        <div class="title-text">HDSI Student Council</div>
        <div class="title-subtext">
            <a class="homing" href="https://datascience.ucsd.edu/">Home</a>
            <span class="current">  /  HDSI Student Council</span>
        </div>
    </div>

    <div class="main-page">
        <h2>WE ARE HERE!</h2>
        <p>
            Introducing the all new HDSI Student Council, operated by data science students, and for ALL data science students! No matter if you are an undergraduate or graduate, majoring or minoring, prospective student or alumni, we are here to help you all!
            Our mission is to advocate for the student body, and connect everyone with the school administration, department and campus resources, alumni, and outside institutes. 
            As this is the first year for HDSI Student Council, we would like to collect feedback and suggestion from all of you on what we should focus on. Share with us any ideas, questions, complaints, or random thoughts you have! 
        </p>
        <div class="follow-us">
            Remember to follow us:  
            <a href="https://www.instagram.com/">Instagram</a> 
            <a href="https://www.x.com/">Twitter</a> 
            <a href="https://www.linkedin.com/">LinkedIn</a> 
            <a href="https://www.discord.com/">Discord</a>
        </div>

        <hr>

        <h2>Latest News & Events</h2>
        <ImageGallery {images} />
        <div>
            <iframe title="Calendar" class="google-calendar" src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FLos_Angeles&bgcolor=%23ffffff&src=ZGF2aWRzdW4yMDAyMDkxNUBnbWFpbC5jb20&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%234285F4" frameborder="0" scrolling="no"></iframe>
        </div>
        
        <hr>

        <h2>Vote for your next event</h2>
        <p>We want to gather ideas from everyone on what events they want to have!</p>
        <p>Have you filled out the <a href="https://forms.gle/9shDPvjwwru9Lbtu9">Feedback & Suggestion Form</a> yet?</p>
        <form on:submit|preventDefault={createThread}>
            <input bind:value={newThreadTitle} placeholder="Tell us your idea!" required>
            <button type="submit">Create Thread</button>
        </form>
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

        <hr>

        <h2>Meet the Board</h2>
        <div class="group">
            {#each council as person (person.id)}
                <div class="person">
                    <img class="profile-pic" src="/profiles/placeholder.jpg" alt="Board Member"/>
                    <span class="name">{person.name}</span><br>
                    <span class="title">{person.title}</span><br>
                    <p>Fun Fact</p>
                </div>
            {/each}
        </div>
    </div>
    <div class="footer-bar"></div>
</main>

<style>
    @font-face {
        font-family: 'Brix Sans Light';
        src: url('/fonts/HvDTrial_BrixSans-Light-BF64c337930afcd.otf') format('opentype');
    }
    @font-face {
        font-family: 'Brix Sans Regular';
        src: url('/fonts/HvDTrial_BrixSans-Regular-BF64c3379310193.otf') format('opentype');
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
    .follow-us {
        font-weight: 10;
        font-size: 18px;
        letter-spacing: 0.5px;
    }
    .google-calendar {
        border:solid 1px #777;
        width: 80%;
        aspect-ratio: 4/3;
        margin: 20px 10%;
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
    .group {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    .person {
        width: calc(20% - 10px);
        aspect-ratio: 4/1;
        background-color: lightblue;
        text-align: center;
    }
    img.profile-pic {
        width: 90%;
        aspect-ratio: 1/1;
        margin: 10px auto;
        object-fit: fill;
    }
    .name {
        font-family: 'Brix Sans Regular', Arial, sans-serif;
        font-size: 20px;
        white-space: normal;
    }    
    hr {
        height: 0.5px;
        color: #484949;
        margin: 50px 0;
    }
    .title-bar, .footer-bar {
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
    }
    a:link.homing {color: #fff;}
    a:visited.homing {color: #fff;}
    a:hover.homing {color: #fff;}
    a:active.homing {color: #fff;}
</style>
