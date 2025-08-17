import { Component } from 'flarum/common/Component';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';

export default class PointsRecordPage extends Component {
  oninit() {
    this.transactions = [];
    this.loading = true;

    // Simulate loading records
    setTimeout(() => {
      this.transactions = [
        { type: 'register', amount: 100, description: 'Welcome bonus', created_at: '2025-04-05' },
        { type: 'deposit', amount: 1000, description: 'Deposited 1.000 tokens', created_at: '2025-04-06' },
        { type: 'like', amount: -10, description: 'Liked a post', created_at: '2025-04-06' },
        { type: 'reply', amount: 5, description: 'Replied to discussion', created_at: '2025-04-06' }
      ];
      this.loading = false;
      m.redraw();
    }, 600);
  }

  view() {
    return (
      <div className="container">
        <h2>📋 Points Record</h2>
        {this.loading ? (
          <LoadingIndicator />
        ) : (
          <table className="Table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {this.transactions.map(t => (
                <tr key={t.created_at + Math.random()}>
                  <td>{t.type}</td>
                  <td style={t.amount > 0 ? { color: 'green' } : { color: 'red' }}>
                    {t.amount > 0 ? '+' : ''}{t.amount}
                  </td>
                  <td>{t.description}</td>
                  <td>{t.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
