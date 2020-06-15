import * as React from "react";
import { Redirect } from 'react-router-dom';
import httpClient from '../../services/httpService';
import _ from 'lodash';
import AlgorandClient from "../../services/algorandsdk";
import algosdk from "algosdk";

/**
 * This component contain messaging component
 *
 * @state address: string -> store account address from the localstorage
 * @state mnemonic: string -> store account mnemonic from the localstorage
 * @state accountList: list of accounts  -> store the list of accounts from the localstorage
 *
 * @author [Mitrasish Mukherjee](https://github.com/mmitrasish)
 */
class MessagingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: localStorage.getItem("address"),
      mnemonic: localStorage.getItem("mnemonic"),
      accountList: localStorage.getItem("accountList"),
      transactions: [],
      messages: [],
      to: '',
      text: ''
    };
  }

  componentDidMount() {
    httpClient.get(`/v1/account/${this.state.address}/transactions`)
      .then(response => {
        // console.log(response.data);
        const transactions = _.toArray(_.groupBy(response.data.transactions, _.property('payment.to')));
        this.setState({ transactions });
      })
      .catch(console.log);
  }

  async sendMessage() {
    //Get the relevant params from the algod
    try {
      let params = await AlgorandClient.getTransactionParams();
      let endRound = params.lastRound + parseInt(1000);
      let recoveredAccount = algosdk.mnemonicToSecretKey(this.state.mnemonic);

      //create a transaction
      let txn = {
        from: recoveredAccount.addr,
        to: this.state.to,
        fee: params.fee,
        amount: 0,
        firstRound: params.lastRound,
        lastRound: endRound,
        genesisID: params.genesisID,
        genesisHash: params.genesishashb64,
        note: algosdk.encodeObj(this.state.text)
      };

      //sign the transaction
      let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);

      // sending the transaction
      AlgorandClient.sendRawTransaction(signedTxn.blob)
          .then(tx => {
            console.log(tx);
            alert('Message Sent');
          })
          .catch(err => {
            console.log(err);
            alert(err.text);
          });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    if (!this.state.mnemonic) {
      return <Redirect to="/create" />;
    }

    return (
      <div className="container mt-5">
        <div className="row mb-5">
          <div className="col-4">
            <ul className="list-group">
              {
                this.state.transactions.map((chats, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      this.setState({
                        messages: this.state.transactions[index],
                        to: chats[0].payment.to
                      });
                    }}
                    className="list-group-item d-flex justify-content-between align-items-center clickable"
                  >
                    <p className="message-tab">{chats[0].payment.to}</p>
                    <span className="badge badge-primary badge-pill">{chats.length}</span>
                  </li>
                ))
              }
            </ul>
          </div>

          <div className="col">
            {this.state.messages.map((message, index) => (
              <div key={index} className="card">
                <div className="card-body">
                  {message.noteb64 ? Buffer.from(message.noteb64, 'base64').toString() : 'Hello World'}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="row mb-5" />
        {
          this.state.to ?
            <div className="input-group mb-3 message-box">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Message Here..."
                onChange={event => {
                  // console.log(event.target.value);
                  this.setState({ text: event.target.value });
                }}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="button"
                  disabled={!this.state.to || !this.state.text}
                  onClick={() => this.sendMessage()}
                >
                  Send
                </button>
              </div>
            </div> : ''
        }
      </div>
    );
  }
}
export default MessagingPage;
