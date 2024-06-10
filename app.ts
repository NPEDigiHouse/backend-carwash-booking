import express, { Express } from 'express';
import cors from 'cors';
import http from 'http';
import AuthRouter from './src/routes/Auth/AuthRoute';
import UserController from './src/controllers/User/UserController';
import UserRoute from './src/routes/User/UserRoute';
import UserServices from './src/service/User/UserService';
import CustomerService from './src/service/Customer/CustomerService';
import CustomerController from './src/controllers/Customer/CustomerController';
import CustomerRoute from './src/routes/Customer/CustomerRoute';
import cookieParser from 'cookie-parser';
import TimeslotService from './src/service/Timeslot/TimeslotService';
import TimeslotController from './src/controllers/Timeslot/TImeslotController';
import TimeslotRoute from './src/routes/Timeslot/TimeslotRoute';
import PromoService from './src/service/Promo/PromoService';
import PromoController from './src/controllers/Promo/PromoController';
import PromoRoute from './src/routes/Promo/PromoRoute';

const app: Express = express();

app.use(express.json());
app.use(cors());

// todo initialize Services
const UserServiceInit = new UserServices();
const CustomerServiceInit = new CustomerService();
const TimeslotServiceInit = new TimeslotService();
const PromoServiceInit = new PromoService();

// todo initialize Controller
const UserControllerInit = new UserController(UserServiceInit);
const CustomerControllerInit = new CustomerController(CustomerServiceInit);
const TimeslotControllerInit = new TimeslotController(TimeslotServiceInit);
const PromoControllerInit = new PromoController(PromoServiceInit);

// todo initialize Route
const AuthRoute = new AuthRouter();
const UserRouteInit = new UserRoute(UserControllerInit);
const CustomerRouteInit = new CustomerRoute(CustomerControllerInit);
const TimelostRouteInit = new TimeslotRoute(TimeslotControllerInit);
const PromoRouteInit = new PromoRoute(PromoControllerInit);

app.use(cookieParser());

app.use(`${process.env.API_URL}/auth`, AuthRoute.getAllAuthRouter());
app.use(`${process.env.API_URL}/users`, UserRouteInit.getRouter());
app.use(`${process.env.API_URL}/customer`, CustomerRouteInit.getRouter());
app.use(`${process.env.API_URL}/timeslot`, TimelostRouteInit.getRouter());
app.use(`${process.env.API_URL}/promos`, PromoRouteInit.getRouter());

const server = http.createServer(app);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
