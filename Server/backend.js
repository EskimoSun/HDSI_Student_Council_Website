const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let threads = [
    { id: 1, title: "First Year Mixer", upvotes: 10, downvotes: 0, upvotedBy: new Set(), downvotedBy: new Set() },
    { id: 2, title: "Career Event", upvotes: 5, downvotes: 0, upvotedBy: new Set(), downvotedBy: new Set() },
    { id: 3, title: "DJ Party", upvotes: 8, downvotes: 0, upvotedBy: new Set(), downvotedBy: new Set() },
];

// Debugging middleware
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.get('/api/threads', (req, res) => {
    // Convert Set to Array for JSON serialization
    const serializableThreads = threads.map(thread => ({
        ...thread,
        upvotedBy: Array.from(thread.upvotedBy),
        downvotedBy: Array.from(thread.downvotedBy)
    }));
    res.json(serializableThreads);
});

app.post('/api/threads', (req, res) => {
    const newThread = {
        id: threads.length + 1,
        title: req.body.title,
        upvotes: 0,
        downvotes: 0,
        upvotedBy: new Set(),
        downvotedBy: new Set()
    };
    threads.push(newThread);
    res.status(201).json({...newThread, upvotedBy: Array.from(newThread.upvotedBy), downvotedBy: Array.from(newThread.downvotedBy)});
});

app.put('/api/threads/:id/vote', (req, res) => {
    
    const threadId = parseInt(req.params.id);
    const { clientId, voteType } = req.body;

    if (!clientId || !voteType) {
        return res.status(400).send('Missing clientId or voteType');
    }

    const thread = threads.find(t => t.id === threadId);
    if (!thread) {
        return res.status(404).send('Thread not found');
    }

    const hasUpvoted = thread.upvotedBy.has(clientId);
    const hasDownvoted = thread.downvotedBy.has(clientId);

    // Remove existing vote if any
    if (hasUpvoted) {
        thread.upvotes--;
        thread.upvotedBy.delete(clientId);
    } else if (hasDownvoted) {
        thread.downvotes--;
        thread.downvotedBy.delete(clientId);
    }

    // Apply new vote if it's different from the previous one
    if (voteType === 'upvote' && !hasUpvoted) {
        thread.upvotes++;
        thread.upvotedBy.add(clientId);
    } else if (voteType === 'downvote' && !hasDownvoted) {
        thread.downvotes++;
        thread.downvotedBy.add(clientId);
    }

    res.json({
        ...thread,
        upvotedBy: Array.from(thread.upvotedBy),
        downvotedBy: Array.from(thread.downvotedBy)
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});