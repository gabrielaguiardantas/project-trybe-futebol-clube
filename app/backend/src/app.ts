import * as express from 'express';
import TeamController from './controllers/team.controller';
import verifyLoginFields from './middlewares/verifyLoginFields';
import UserController from './controllers/user.controller';
import validateJWT from './auth/validateJWT';
import MatchController from './controllers/match.controller';
import verifyMatchFields from './middlewares/verifyMatchFields';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.get('/teams/:id', TeamController.findById);
    this.app.get('/teams', TeamController.findAll);

    this.app.post('/login', verifyLoginFields, UserController.login);
    this.app.get('/login/role', validateJWT, UserController.role);

    this.app.patch('/matches/:id/finish', validateJWT, MatchController.updateInProgressById);
    this.app.patch('/matches/:id', validateJWT, MatchController.updateById);
    this.app.get('/matches', MatchController.findAll);
    this.app.post('/matches', validateJWT, verifyMatchFields, MatchController.create);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
