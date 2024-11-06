# HDSI Student Council Website

This is the official website for the Halıcıoğlu Data Science Institute (HDSI) Student Council at UC San Diego. The website serves as a central hub for HDSI students to:

- Stay updated with latest news and upcoming events
- Submit feedback and suggestions
- Vote on event proposals
- Learn about Student Council board members
- Access important student resources

## Project Structure
```
hdsi-student-council-website/
├── src/               # Svelte components and frontend code
├── public/           # Static assets (images, icons, etc.)
├── server/           # Backend server code
└── package.json      # Project dependencies
```

## Prerequisites

Before getting started, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/EskimoSun/HDSI_Student_Council_Website.git
```

2. Navigate to the project directory:
```bash
cd hdsi-student-council-website
```

3. Install the dependencies:
```bash
npm install
```

## Running the website
1. Start the development server:
```bash
cd Server
node backend.js
```
Make sure the backend server is running before starting the Svelte application. Port 3000 is used for the backend server.

2. Launch the website:
Start a new terminal window and navigate to the project directory. Run the following command to start the Svelte application:
```bash
npm run dev
```
Navigate to [localhost:8080](http://localhost:8080). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

## API Documentation
The backend API endpoints are available at `http://localhost:3000`:

| Endpoint | Method | Description |
|----------|---------|------------|
| /manage/threads | GET | List all event threads |
| /manage/threads | POST | Create new event thread |
| /manage/threads/:id | DELETE | Delete specific thread |

To manage event threads while the backend server is running, use these curl commands from a new terminal window:
1. List all threads:
```bash
curl http://localhost:3000/manage/threads
```

2. Add a new thread, remembe to change "New Event" to your event details:
```bash
curl -X POST -H "Content-Type: application/json" -d \'{"title":"New Event"}\' http://localhost:3000/manage/threads
```

3. Delete a thread (replace <id> with the thread ID):
```bash
curl -X DELETE http://localhost:3000/manage/threads/<id>
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Submit a Pull Request

## Troubleshooting
Common issues and their solutions:
- Port 3000 already in use: Kill the existing process or change the port in `backend.js`
- Node modules errors: Try deleting `node_modules` and running `npm install` again

## License
[No License Yet]

## Contact
For questions or issues, please contact HDSI Student Council at hdsistudentcouncil@ucsd.edu