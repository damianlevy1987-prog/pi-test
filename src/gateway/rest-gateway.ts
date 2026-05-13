import express from 'express';

const app = express();
app.use(express.json());

app.post('/api/research', async (req, res) => {
  try {
    const { topic, sources } = req.body;
    console.log(`Research request: ${topic}, sources: ${sources}`);
    res.json({ status: 'success', topic, sources });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

app.post('/api/context', async (req, res) => {
  try {
    const { agent_id, topic, inputs } = req.body;
    console.log(`Context build: ${agent_id} - ${topic}`);
    res.json({ status: 'success', agent_id, topic });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

app.post('/api/dispatch', async (req, res) => {
  try {
    const { agent, task } = req.body;
    console.log(`Dispatch to ${agent}: ${task.action}`);
    res.json({ status: 'success', agent, task });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

app.get('/api/agents', (_req, res) => {
  res.json(['scout', 'vulnhunter', 'exploiter', 'shadowops', 'webbreaker', 'airwave', 'digitalwatcher', 'cloudbreacher', 'domainhunter', 'humanphisher']);
});

export { app };