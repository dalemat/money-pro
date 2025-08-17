import { Component } from 'flarum/common/Component';

export default class DepositPage extends Component {
  view() {
    const user = app.session.user;
    const depositId = user.data.attributes.money_deposit_id;
    const wallet = app.forum.attribute('money_pro_deposit_wallet');

    return (
      <div className="container">
        <h2>Deposit Tokens</h2>
        <p>Send your ERC-20 token to earn in-app points.</p>
        <div className="Form-group">
          <label>Deposit Wallet Address</label>
          <pre>{wallet}</pre>
        </div>
        <div className="Form-group">
          <label>Your Deposit ID</label>
          <pre>{depositId}</pre>
          <small>Include this in the transaction data field.</small>
        </div>
        <p><strong>1 token = {app.forum.attribute('money_pro_rate')} points</strong></p>
      </div>
    );
  }
}
