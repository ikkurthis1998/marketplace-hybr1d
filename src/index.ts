import express, { json } from 'express';
import { router } from './router';
import { log } from './utils/logger.util';

export const app = express();

app.use(json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    log.info(`Server started on port ${port}`);
});

router.map((route) => app.use(`/api${route.path}`, route.router));
