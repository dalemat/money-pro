import { Component } from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import FieldSet from 'flarum/common/components/FieldSet';

export default class TransferPage extends Component {
  oninit() {
    this.recipient = '';
    this.amount = '';
    this.success = false;
  }

  view() {
    return (
      <div className="container">
        <FieldSet title="Send Points to Another User">
          {this.success ? (
            <div className="Alert Alert--success">✅ Successfully sent {this.amount} points to @{this.recipient}!</div>
          ) : (
            <div>
              <div className="Form-group">
                <label>Username</label>
                <input className="FormControl" value={this.recipient} oninput={e => this.recipient = e.target.value} placeholder="Enter username" />
              </div>
              <div className="Form-group">
                <label>Amount</label>
                <input type="number" className="FormControl" value={this.amount} oninput={e => this.amount = e.target.value} placeholder="How many points?" min="1" />
              </div>
              <div className="Form-group">
                <Button className="Button Button--primary" onclick={() => this.sendTransfer()}>
                  Send Points
                </Button>
              </div>
            </div>
          )}
        </FieldSet>
      </div>
    );
  }

  sendTransfer() {
    if (!this.recipient || !this.amount || this.amount <= 0) {
      alert('Please fill in all fields');
      return;
    }

    // Simulate success
    this.success = true;
    m.redraw();
  }
}
