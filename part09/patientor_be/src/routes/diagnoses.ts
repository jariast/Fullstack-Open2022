import express from 'express';
import { diagnoseService } from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoseService.getDiagnoses());
});

// export { router };
export default router;
// I'm still debating what to do with this export
// In the one hand, the default export allows us to use the
// very generic name "router" in all of our router files.
// In the other hand, we could name our routers uniquely.
