import React, { Component } from 'react';
import 'whatwg-fetch';

import {
  getFromStorage,
  setInStorage
} from '../../utils/storage';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      firstName: '',
      lastName: '',
      email: '',
      type: '',
      studentYear: '',
      studentClassTaken: '',
      studentMajor: '',
      studentDepartmentOfInterest: '',
      professorsArray: []
    };


  }

  componentDidMount() {
    document.title = "LabMatch"

    var token = getFromStorage('labMatcher');

      if (token) {
        token = token.token
        //verify token
        fetch('/verify?token=' + token)
        .then (res => res.json())
        .then(json => {
          console.log(json)
          if (json.success){
              this.setState({
                token: token
              })

              fetch('/getuser?token=' + token)
              .then(res => res.json())
              .then(json => {
                this.setState({
                  firstName: json.firstName,
                  lastName: json.lastName,
                  email: json.email,
                  type: json.type,
                  studentYear: json.studentYear,
                  studentClassTaken: json.studentClassTaken,
                  studentMajor: json.studentMajor,
                  studentDepartmentOfInterest: json.studentDepartmentOfInterest
                });
              })

              fetch('/getprofs')
              .then(res => res.json())
              .then(json => {
                this.chooseLabs(json)
              })

          } else {
            window.location = '/login'
          }
        })

      } else {
        window.location = '/login'
      }
  }

  chooseLabs(profArray){
    //for every lab calculate total score
    for (var i = 0; i < profArray.length; i++){
      console.log(this.calcTotalScore(profArray[i]));
      if (this.calcTotalScore(profArray[i]) >= 30){
        //add to state array
        console.log(profArray[i]);
        this.setState({
          professorsArray: this.state.professorsArray.concat(profArray[i])
        })
      }
    }
  }

  calcTotalScore(prof){
    return this.calcYearScore(prof.professorYearsLookingFor) + this.calcMajorScore(prof.professorMajors) +
    this.calcClassesScore(prof.professorClassesNeeded) + this.calcDepartmentScore(prof.professorDepartment)
  }

  calcMajorScore(majorsRequired){
    var majorArray = majorsRequired.split(', ')

    for (var i = 0; i < majorArray.length; i++){
      if (this.state.studentMajor.valueOf() === majorArray[i].valueOf()){
        return 10;
      }
    }
    return 0;
  }

  calcClassesScore(classesRequired){
    var profClassArray = classesRequired.split(', ')
    var studentClassArray = this.state.studentClassTaken.split(', ')

    var matchCount = 0;

    for (var i = 0; i < profClassArray.length; i++){
      for (var j = 0; j < studentClassArray.length; j++){
        if (profClassArray[i].valueOf() === studentClassArray[j].valueOf()){
          matchCount++;
        }
      }
    }

    return (matchCount/profClassArray.length) * 10;

  }

  calcYearScore(yearsRequired){
    if (yearsRequired.includes(this.state.studentYear)) {
      return 10
    }
    return 0
  }

  calcDepartmentScore(departmentRequired){
    if (departmentRequired.valueOf() === this.state.studentDepartmentOfInterest.valueOf()){
      return 10
    }
    return 0
  }



  logout(){
      fetch('/logout?token=' + this.state.token)
      .then(res => res.json())
      .then(json => {
        if (json.success){
          this.setState({
            token: ''
          });

          window.location = '/login'
        }
      })

  }


  render() {

    let matches = this.state.professorsArray
    return (

      <div className="App">

      <section id="login-header-section">
          <h1 className="login-header-title">LabMatch</h1>
      </section>
      <section id="results-main-section">
          <div className="row" id="results-main-row">
              <div className="col" style={{padding: '0px'}}>
                  <div className="container registration student container" id="results-container">
                      <h3 id="results_title">Student Profile</h3>
                      <h6 id="results_subtitle">View the information you entered for your student profile.</h6>
                      <div id="matches_tile">
                          <div className="row" id="results-divider">
                              <div className="col" id="results-col">
                                  <h5 id="results_h5">Name:</h5>
                              </div>
                              <div className="col" id="field-col">
                                  <h6 id="results_h6">{this.state.firstName + " " + this.state.lastName}</h6>
                              </div>
                          </div>
                          <div className="row" id="results-divider">
                              <div className="col" id="results-col">
                                  <h5 id="results_h5">Major:</h5>
                              </div>
                              <div className="col d-md-flex" id="field-col">
                                  <h6 id="results_h6">{this.state.studentMajor}</h6>
                              </div>
                          </div>
                          <div className="row" id="results-divider">
                              <div className="col" id="results-col">
                                  <h5 id="results_h5">Graduation Year:</h5>
                              </div>
                              <div className="col d-md-flex" id="field-col">
                                  <h6 id="results_h6">{this.state.studentYear}</h6>
                              </div>
                          </div>
                          <div className="row" id="results-divider">
                              <div className="col" id="results-col">
                                  <h5 id="results_h5">Email:</h5>
                              </div>
                              <div className="col d-md-flex" id="field-col">
                                  <h6 id="results_h6">{this.state.email}</h6>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="col" style={{padding: '0px',height: 'auto',width: 'auto'}}>
                  <div className="container registration student container" id="results-container">
                      <h3 id="results_title">Lab Matches</h3>
                      <h6 id="results_subtitle">View the research labs that most closely align with your background.</h6>





              {matches.map(m =>   <div id="matches_tile">
                                        <div className="row" id="results-divider">
                                            <div className="col" id="results-col">
                                                <h5 id="results_h5">Researcher/Professor:</h5>
                                            </div>
                                            <div className="col" id="field-col">
                                                <h6 id="results_h6">{m.firstName + " " + m.lastName}</h6>
                                            </div>
                                        </div>
                                        <div className="row" id="results-divider">
                                            <div className="col" id="results-col">
                                                <h5 id="results_h5">Department:</h5>
                                            </div>
                                            <div className="col d-md-flex" id="field-col">
                                                <h6 id="results_h6">{m.professorDepartment}</h6>
                                            </div>
                                        </div>
                                        <div className="row" id="results-divider">
                                            <div className="col" id="results-col">
                                                <h5 id="results_h5">Required Courses:</h5>
                                            </div>
                                            <div className="col d-md-flex" id="field-col">
                                                <h6 id="results_h6">{m.professorClassesNeeded}</h6>
                                            </div>
                                        </div>
                                        <div className="row" id="results-divider">
                                            <div className="col" id="results-col">
                                                <h5 id="results_h5">Lab Description:</h5>
                                            </div>


                                        </div>
                                        <div className="row" id="results-divider">
                                          <div className="col" id="results-col">
                                             <h6 id="results_h6">{m.professorLabSnippet}</h6>
                                           </div>
                                        </div>
                                        <div className="row" id="results-divider">
                                            <div className="col"><button className="btn btn-primary" type="button" id="login-button"><span><a href={"mailto:" + m.email}>CONTACT</a></span></button></div>
                                        </div>
                                    </div>) }

                                    </div>
                                </div>

          </div>
          <button className="btn btn-primary" type="button" id="logout-button" onClick={() => this.logout()}><span>LOGOUT</span></button>
      </section>


      </div>

    );
  }
}

export default Home;
