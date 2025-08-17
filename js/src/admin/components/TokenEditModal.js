import { Modal } from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';

export default class TokenEditModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);
    this.token = this.attrs.token || {
      name: '',
      symbol: '',
      chain: 'polygon',
      type: 'erc20',
      token_address: '',
      deposit_wallet: '',
      points_rate: 1000,
      min_deposit: 0.01,
      is_enabled: true
    };
  }

  view() {
    return (
      <div className="Modal-dialog">
        <div className="Modal-content">
          <div className="Modal-header">
            <h3>{this.attrs.token ? 'Edit Token' : 'Add New Token'}</h3>
          </div>
          <div className="Modal-body">
            <div className="Form-group">
              <label>Name</label>
              <input className="FormControl" value={this.token.name} oninput={e => this.token.name = e.target.value} />
            </div>
            <div className="Form-group">
              <label>Symbol</label>
              <input className="FormControl" value={this.token.symbol} oninput={e => this.token.symbol = e.target.value} />
            </div>
            <div className="Form-group">
              <label>Chain</label>
              <select className="FormControl" value={this.token.chain} oninput={e => this.token.chain = e.target.value}>
                <option value="polygon">Polygon</option>
                <option value="bsc">Binance Smart Chain</option>
                <option value="ethereum">Ethereum</option>
              </select>
            </div>
            <div className="Form-group">
              <label>Type</label>
              <select className="FormControl" value={this.token.type} oninput={e => this.token.type = e.target.value}>
                <option value="erc20">ERC-20 Token</option>
                <option value="bep20">BEP-20 Token</option>
                <option value="native">Native Coin (MATIC, BNB)</option>
              </select>
            </div>
            {this.token.type !== 'native' && (
              <div className="Form-group">
                <label>Token Contract Address</label>
                <input className="FormControl" value={this.token.token_address} oninput={e => this.token.token_address = e.target.value} />
              </div>
            )}
            <div className="Form-group">
              <label>Deposit Wallet Address</label>
              <input className="FormControl" value={this.token.deposit_wallet} oninput={e => this.token.deposit_wallet = e.target.value} />
            </div>
            <div className="Form-group">
              <label>Points per Token</label>
              <input type="number" className="FormControl" value={this.token.points_rate} oninput={e => this.token.points_rate = e.target.value} />
            </div>
            <div className="Form-group">
              <label>Minimum Deposit</label>
              <input type="number" step="any" className="FormControl" value={this.token.min_deposit} oninput={e => this.token.min_deposit = e.target.value} />
            </div>
            <div className="Form-group">
              <label>
                <input type="checkbox" checked={this.token.is_enabled} onchange={e => this.token.is_enabled = e.target.checked} />
                Enabled
              </label>
            </div>
          </div>
          <div className="Modal-footer">
            <Button type="button" className="Button" onclick={() => this.hide()}>
              Cancel
            </Button>
            <Button type="submit" className="Button Button--primary" loading={this.loading} onclick={this.save.bind(this)}>
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }

  save() {
    // This will be connected to API later
    alert('Token saved (simulation)');
    this.hide();
  }
}
