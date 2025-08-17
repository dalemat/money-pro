import { Component } from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';

export default class TokenListPage extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.tokens = null;
    this.loading = false;
    this.loadTokens();
  }

  loadTokens() {
    this.loading = true;
    app.request({
      url: `${app.forum.attribute('apiUrl')}/money-pro/tokens`,
      method: 'GET',
    }).then((response) => {
      this.tokens = response.data;
      this.loading = false;
      m.redraw();
    });
  }

  view() {
    return (
      <div className="MoneyPro-TokenListPage">
        <div className="container">
          <header>
            <h2>{app.translator.trans('in-time-money-pro.admin.nav.title')}</h2>
            <p>Manage which tokens users can deposit.</p>
            <Button icon="fas fa-plus" className="Button Button--primary">
              Add Token
            </Button>
          </header>
          {this.loading ? (
            <div>Loading...</div>
          ) : (
            <table className="Table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Symbol</th>
                  <th>Chain</th>
                  <th>Rate</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {this.tokens?.map(token => (
                  <tr key={token.id}>
                    <td>{token.name}</td>
                    <td>{token.symbol}</td>
                    <td>{token.chain}</td>
                    <td>{token.points_rate}</td>
                    <td><span className="Badge Badge--success">Enabled</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}
