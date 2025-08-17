import app from 'flarum/common/app';
import DepositPage from './components/DepositPage';
import TransferPage from './components/TransferPage';
import LeaderboardPage from './components/LeaderboardPage';
import PointsRecordPage from './components/PointsRecordPage';

app.initializers.add('in-time-money-pro-frontend', () => {
  app.routes.moneyDeposit = { path: '/money/deposit', component: DepositPage.component() };
  app.routes.moneyTransfer = { path: '/money/transfer', component: TransferPage.component() };
  app.routes.leaderboard = { path: '/money/leaderboard', component: LeaderboardPage.component() };
  app.routes.pointsRecord = { path: '/money/record', component: PointsRecordPage.component() };

  app.navigation().items().add('moneyDeposit', {
    path: '/money/deposit',
    label: 'Deposit',
    icon: 'fas fa-wallet'
  });

  app.navigation().items().add('moneyTransfer', {
    path: '/money/transfer',
    label: 'Send Points',
    icon: 'fas fa-exchange-alt'
  });

  app.navigation().items().add('leaderboard', {
    path: '/money/leaderboard',
    label: 'Leaderboard',
    icon: 'fas fa-crown'
  });

  app.navigation().items().add('pointsRecord', {
    path: '/money/record',
    label: 'My Points',
    icon: 'fas fa-file-invoice-dollar'
  });
});
