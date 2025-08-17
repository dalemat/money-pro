import app from 'flarum/admin/app';
import TokenListPage from './components/TokenListPage';

app.initializers.add('in-time-money-pro-admin', () => {
  app.routes.moneyProTokens = {
    path: '/money-pro/tokens',
    component: TokenListPage.component(),
  };

  app.extensionData
    .for('in-time-money-pro')
    .registerPage(TokenListPage, {
      name: 'tokens',
      label: 'Tokens & Chains',
      icon: 'fas fa-coins'
    });
});
