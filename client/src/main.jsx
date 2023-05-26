import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';
import Root, { loader as rootLoader } from './routes/root';
import Login, { action as loginAction } from './routes/login';
import Dashboard from './routes/dashboard';
import Profile, {
  action as profileAction,
  loader as profileLoader,
} from './routes/profile';
import HelpAndFeedback, {
  action as helpAndFeedbackAction,
} from './routes/helpAndFeedback';
import Order from './routes/order';
import History, {
  loader as historyLoader,
  // action as historyAction,
} from './routes/history';
import {default as cancelOrderAction} from './routes/cancelOrder'
import { default as updateOrderAction } from './routes/updateOrder';
import LostButFound, {
  action as lostButFoundAction,
  loader as lostButFoundLoader,
} from './routes/lostbutfound';
import Students, {
  loader as studentsLoader,
  action as studentsAction,
} from './routes/students';
import {action as deleteStudentAction} from './routes/deleteStudent'
import Orders, { loader as ordersLoader } from './routes/orders';
import { default as createOrderAction } from './routes/createOrder'
import { default as approveOrderAction } from './routes/approveOrder'
import { default as rejectOrderAction } from './routes/rejectOrder'
import { default as completeOrderAction } from './routes/completeOrder'
import Feedbacks, { loader as feedbacksLoader } from './routes/feedbacks';

const router = createHashRouter([
  {
    path: '/login',
    element: <Login />,
    action: loginAction,
  },
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
    errorElement: <ErrorPage />,
    id: 'root',
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: 'profile',
        action: profileAction,
        loader: profileLoader,
        element: <Profile />,
      },
      { path: 'order', element: <Order /> },
      {
        path: 'history',
        loader: historyLoader,
        // action: historyAction,
        element: <History />,
      },
      {
        path: 'history/:orderId/cancel',
        action: cancelOrderAction,
      },
      {
        path: 'history/:orderId/update',
        action: updateOrderAction,
      },
      {
        path: 'lostbutfound',
        action: lostButFoundAction,
        loader: lostButFoundLoader,
        element: <LostButFound />,
      },
      {
        path: 'help',
        action: helpAndFeedbackAction,
        element: <HelpAndFeedback />,
      },
      {
        path: 'students',
        element: <Students />,
        loader: studentsLoader,
        action: studentsAction,
      },
      {
        path: 'students/:studId/delete',
        action: deleteStudentAction
      },
      { path: 'orders', element: <Orders />, loader: ordersLoader },
      {
        path: 'orders/create', action: createOrderAction
      },
      {
        path: 'orders/:orderId/approve',
        action: approveOrderAction,
      },
      {
        path: 'orders/:orderId/reject',
        action: rejectOrderAction,
      },
      {
        path: 'orders/:orderId/complete',
        action: completeOrderAction,
      },
      {
        path: 'feedbacks',
        loader: feedbacksLoader,
        element: <Feedbacks />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
