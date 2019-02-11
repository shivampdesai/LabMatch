import React, { Component } from 'react';
import 'whatwg-fetch';


class Thankyou extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    document.title = "Thanks for signing up! | LabMatch"

  }


  render() {


    return (
      <div>



        <section id="login-header-section">
            <h1 className="login-header-title">LabMatch</h1>
        </section>
        <section>
            <div className="container" id="redirect-container">
                <div className="row thank you row">
                    <div className="col" id="thank-you-col">
                        <h5 className="thank you title">Dear Researcher:</h5>
                    </div>
                </div>
                <div className="row thank you row">
                    <div className="col" style={{padding: '0px'}}>
                        <h5 className="thank you message">Thank you for registering your lab with LabMatch! Students will now be able to match to your lab and will reach out to you directly.</h5>
                    </div>
                </div>
                <div className="row thank you row end">
                    <div className="col" id="thank-you-col">
                         <h5 className="thank you closing">Sincerely,<br></br> LabMatch</h5>
                    </div>
                </div>
            </div>
        </section>

      </div>



    );

  }
}

export default Thankyou;
