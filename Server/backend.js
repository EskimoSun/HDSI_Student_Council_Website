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

// Middleware to check if request is from localhost
const localOnly = (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    if (ip === '::1' || ip === '::ffff:127.0.0.1' || ip === '127.0.0.1') {
        next();
    } else {
        res.status(403).json({ error: 'Access denied' });
    }
};

// Regular endpoints for users
app.get('/api/threads', (req, res) => {
    const serializableThreads = threads.map(thread => ({
        ...thread,
        upvotedBy: Array.from(thread.upvotedBy),
        downvotedBy: Array.from(thread.downvotedBy)
    }));
    res.json(serializableThreads);
});

app.put('/api/threads/:id/vote', (req, res) => {
    const threadId = parseInt(req.params.id);
    const { clientId, voteType } = req.body;

    if (!clientId || !voteType) {
        return res.status(400).send('Missing clientId or voteType');
    }

    const thread = threadConfig.threads.find(t => t.id === threadId);
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

// Management endpoints (localhost only)
app.post('/manage/threads', localOnly, (req, res) => {
    const { title } = req.body;
    const newThread = {
        id: Math.max(...threads.map(t => t.id), 0) + 1,
        title,
        upvotes: 0,
        downvotes: 0,
        upvotedBy: new Set(),
        downvotedBy: new Set()
    };
    threads.push(newThread);
    res.status(201).json({ 
        message: 'Thread added successfully', 
        thread: {
            ...newThread,
            upvotedBy: Array.from(newThread.upvotedBy),
            downvotedBy: Array.from(newThread.downvotedBy)
        }
    });
});

app.delete('/manage/threads/:id', localOnly, (req, res) => {
    const id = parseInt(req.params.id);
    const index = threads.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Thread not found' });
    }
    threads.splice(index, 1);
    res.json({ message: 'Thread deleted successfully' });
});

// List all threads with IDs (for management)
app.get('/manage/threads', localOnly, (req, res) => {
    res.json(threads.map(({ id, title, upvotes, downvotes }) => ({
        id,
        title,
        score: upvotes - downvotes
    })));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('\nTo manage threads, use these curl commands from your terminal:');
    console.log('\nList all threads:');
    console.log('curl http://localhost:3000/manage/threads');
    console.log('\nAdd a new thread:');
    console.log('curl -X POST -H "Content-Type: application/json" -d \'{"title":"New Event"}\' http://localhost:3000/manage/threads');
    console.log('\nDelete a thread (replace <id> with the thread ID):');
    console.log('curl -X DELETE http://localhost:3000/manage/threads/<id>');
});