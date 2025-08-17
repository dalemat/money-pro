import { Component } from 'flarum/common/Component';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';

export default class LeaderboardPage extends Component {
  oninit() {
    this.users = [];
    this.loading = true;

    // Simulate loading top users
    setTimeout(() => {
      this.users = [
        { username: 'admin', money_balance: 5000 },
        { username: 'user1', money_balance: 2300 },
        { username: 'user2', money_balance: 1850 }
      ];
      this.loading = false;
      m.redraw();
    }, 800);
  }

  view() {
    return (
      <div className="container">
        <h2>🏆 Top Users by Balance</h2>
        {this.loading ? (
          <LoadingIndicator />
        ) : (
          <table className="Table">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {this.users.map((user, i) => (
                <tr key={i}>
                  <td><strong>{i + 1}</strong></td>
                  <td><a href={app.route.user(user)}>{user.username}</a></td>
                  <td>{user.money_balance.toLocaleString()} pts</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
