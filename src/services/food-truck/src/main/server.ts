import { kyselyClient } from "../infrastructure/databases";
import { App } from './config';

kyselyClient
    .createConnection()
    .then(async () => {
        void (await Promise.resolve());
        const app = App();
        app.listen(3000, () => console.log('Listening on port 3000'))
    })
    .catch((err) => console.log(err));