<!-- Thread.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';

    export let thread;
    export let upvoted = false;
    export let downvoted = false;
    const dispatch = createEventDispatcher();

    function vote(voteType) {
        dispatch('vote', voteType);
    }
</script>

<div class="thread">
    <h3>{thread.title}</h3>
    <div class="voting">
        <span 
            class="vote upvote" 
            class:voted={upvoted} 
            on:click={() => vote(upvoted ? 'unvote' : 'upvote')}
        >▲</span>
        <span class="vote-count">{thread.upvotes - thread.downvotes}</span>
        <span 
            class="vote downvote" 
            class:voted={downvoted} 
            on:click={() => vote(downvoted ? 'unvote' : 'downvote')}
        >▼</span>
    </div>
</div>

<style>
    @font-face {
        font-family: 'Brix Sans Regular';
        src: url('/fonts/HvDTrial_BrixSans-Regular-BF64c3379310193.otf') format('opentype');
    }
    .thread {
        border: 1px solid #ccc;
        padding: 4px 5%;
        margin-bottom: 10px;
        background-color: #f6ff71;
        width: 80%;
        margin: 10px auto;
        font-family: 'Brix Sans Regular';
        color: black;
        box-shadow: 3px 3px 5px #061920b3, 0 0 25px #06192033;
    }
    .vote-count {
        font-size: 30px;
    }
    .vote {
        cursor: pointer;
        user-select: none;
        font-size: 30px;
        text-shadow: 3px 3px 5px #061920b3, 3px -3px 5px #06192033, -3px 3px 5px #06192033, -3px -3px 5px #06192033;
    }
    .upvote {
        color: #fff;
    }
    .downvote {
        color: #fff;
    }
    .voted {
        font-weight: bold;
    }
    .upvote.voted {
        color: #00ff00;
    }
    .downvote.voted {
        color: #ff0000;
    }
</style>