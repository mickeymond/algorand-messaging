import * as React from "react";
import { Redirect } from 'react-router-dom';
import MultisigTransactionComponent from "../stateful/multisigtransactioncomponent";

/**
 * This component contain multi signature transaction components.
 *
 * @author [Mitrasish Mukherjee](https://github.com/mmitrasish)
 */
const MultisigTransactionPage = () => {
  const address = localStorage.getItem("address");
  if (!address) {
    return <Redirect to="/create" />;
  }

  return (
    <div className="container-fluid row">
      <div className="col-md-12 d-flex justify-content-center">
        <div className="col-md-6 m-4">
          <MultisigTransactionComponent />
        </div>
      </div>
    </div>
  );
};
export default MultisigTransactionPage;
