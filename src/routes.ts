import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const dbPath = path.join(__dirname, 'db.json');

function loadSubmissions() {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data).submissions;
}

function saveSubmissions(submissions: any) {
  fs.writeFileSync(dbPath, JSON.stringify({ submissions }, null, 2));
}

router.get('/ping', (req, res) => {
  res.json(true);
});

router.post('/submit', (req, res) => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;
  const submissions = loadSubmissions();

  const newSubmission = { name, email, phone, github_link, stopwatch_time };
  submissions.push(newSubmission);
  saveSubmissions(submissions);

  res.json(newSubmission);
});

router.get('/read', (req, res) => {
  const index = parseInt(req.query.index as string, 10);
  const submissions = loadSubmissions();

  if (index >= 0 && index < submissions.length) {
    res.json(submissions[index]);
  } else {
    res.status(404).json({ error: 'Submission not found' });
  }
});

export const routes = router;
