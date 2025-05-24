import App from "./App";
import Login from "./components/Login";
import SignUpPage from "./components/sign_up";
import TransactionPage from "./components/TransactionPage";

const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "SignUpPage",
    element: <SignUpPage />,
  },
  {
    path: "App",
    element: <App />
  },
  {
    path: "/App/TransactionPage",
    element: <TransactionPage />
  },
  {
    path: "/App/TransactionPage/App",
    element: <App />
  },
];

export default routes;
