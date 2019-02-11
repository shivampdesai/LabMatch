import React, { Component } from 'react';
import 'whatwg-fetch';
const JSON = require('circular-json');


class Signup extends Component {

  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      student_major: '',
      student_year: '',
      student_department: '',
      student_courses: '',

      professor_major: '',
      professor_year: '',
      professor_department: '',
      professor_courses: '',
      professor_snippet: ''
    };
  }

  componentDidMount(){
    document.title = "Signup | LabMatch"
  }

  signUpStudent() {

      var firstName = document.getElementById('student_firstName').value;
      var lastName =  document.getElementById('student_lastName').value;
      var email = document.getElementById('student_email').value;
      var password = document.getElementById('student_password').value;
      var student_major = document.getElementById('student_major').value;
      var student_year = document.getElementById('student_year').value;
      var student_department = document.getElementById('student_department').value;
      var student_courses = document.getElementById('student_courses').value;

    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        type: 'student',
        studentYear: student_year,
        studentClassTaken: student_courses,
        studentMajor: student_major,
        studentDepartmentOfInterest: student_department
      }),
    }).then(res => res.json())
    .then(json => {
      window.location = '/login'
    })


  }



  signUpProfessor() {
    var firstName = document.getElementById('professor_firstName').value;
    var lastName =  document.getElementById('professor_lastName').value;
    var email = document.getElementById('professor_email').value;
    var snippet = document.getElementById('professor_snippet').value;
    var professor_major = document.getElementById('professor_major').value;
    var professor_year = document.getElementById('professor_year').value;
    var professor_department = document.getElementById('professor_department').value;
    var professor_courses = document.getElementById('professor_courses').value;

  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      type: 'professor',
      professorLabSnippet: snippet,
      professorYearsLookingFor: professor_year,
      professorClassesNeeded: professor_courses,
      professorDepartment: professor_department,
      professorMajors: professor_major
    }),
  }).then(res => res.json())
  .then(json => {
    window.location = '/thankyou'
  })

  }




  render() {
    return (
      <div>

      <section id="login-header-section">
          <h1 className="login-header-title">LabMatch</h1>
      </section>
      <section>
        <h4 id="registration-title" style={{color: 'rgba(250, 250, 250, 0.7)'}}>Register for a LabMatch account</h4>
      </section>
      <section id="registration-main-section">
          <div className="row" id="registration-main-row">
              <div className="col" style={{padding:'0px'}}>
                  <div className="container registration student container" id="registration-container">
                      <h3 id="registration-title">Students</h3>
                      <h6 id="registration-subtitle">Get matched to a lab today!</h6>
                      <div className="row" id="registration-divider">
                          <div className="col">
                              <h5 id="registration-subheading">General Info</h5>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col">
                              <div id="registration-div" className="registration student div">
                                <input
                                  type="text"
                                  required=""
                                  placeholder="First Name"
                                  id="student_firstName"
                                  className="registration fields"

                                  />
                              </div>
                          </div>
                          <div className="col">
                              <div id="registration-div" className="registration student div">
                                <input
                                  type="text"
                                  required=""
                                  placeholder="Last Name"
                                  id="student_lastName"
                                  className="registration fields"

                                />
                              </div>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col">
                              <div id="registration-div" className="registration student div">
                                <input
                                  type="text"
                                  required=""
                                  placeholder="Email"
                                  inputMode="email" id="student_email"
                                  className="registration fields"

                                />
                              </div>
                          </div>
                          <div className="col">
                              <div id="registration-div" className="registration student div">
                                <input type="text"
                                  required=""
                                  placeholder="Password"
                                  id="student_password"
                                  className="registration fields"

                                />
                              </div>
                          </div>
                      </div>
                      <div className="row" id="registration-divider">
                          <div className="col">
                              <h5 id="registration-subheading">Academic Info</h5>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col">
                              <div id="registration-div" className="registration student div">
                                <input
                                  type="text"
                                  required=""
                                  placeholder="Major"
                                  id="student_major"
                                  className="registration fields"

                                />
                              </div>
                          </div>
                          <div className="col">
                              <div id="registration-div" className="registration student div">
                                <input
                                  type="text"
                                  required=""
                                  placeholder="Graduation Year"
                                  id="student_year"
                                  className="registration fields"

                                />
                              </div>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col">
                              <div id="registration-div" className="registration student div">
                                <input
                                  type="text"
                                  required=""
                                  placeholder="Research Department"
                                  id="student_department"
                                  className="registration fields"

                                />
                              </div>
                          </div>
                          <div className="col">
                              <div id="registration-div" className="registration student div">
                                <input
                                  type="text"
                                  required=""
                                  placeholder="Relevant Courses"
                                  id="student_courses"
                                  className="registration fields"

                                />
                              </div>
                          </div>
                      </div>
                      <div id="registration-div"><button className="btn btn-primary" type="button" id="register-button" onClick={() => this.signUpStudent()}>SIGNUP</button></div>
                  </div>
              </div>
              <div className="col" style={{padding: '0px'}}>
                  <div className="container registration student container" id="registration-container">
                      <h3 id="registration-title">Researchers</h3>
                      <h6 id="registration-subtitle">Post about your lab!</h6>
                      <div className="row" id="registration-divider">
                          <div className="col">
                              <h5 id="registration-subheading">General Info</h5>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col">
                              <div id="registration-div" className="registration student div">
                                <input
                                  type="text"
                                  required=""
                                  placeholder="First Name"
                                  id="professor_firstName"
                                  className="registration fields"

                                />
                              </div>
                          </div>
                          <div className="col">
                              <div id="registration-div" className="registration student div">
                                <input
                                  type="text"
                                  required=""
                                  placeholder="Last Name"
                                  id="professor_lastName"
                                  className="registration fields"

                                />
                              </div>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col">
                              <div id="registration-div" className="registration student div">
                                <input
                                  type="text"
                                  required=""
                                  placeholder="Email"
                                  inputMode="email"
                                  id="professor_email"
                                  className="registration fields"

                                />
                              </div>
                          </div>
                      </div>
                      <div className="row" id="registration-divider">
                          <div className="col">
                              <h5 id="registration-subheading">Research Info</h5>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col">
                              <div id="registration-div" className="registration student div">
                                <input
                                  type="text"
                                  required=""
                                  placeholder="Required Major(s)"
                                  id="professor_major"
                                  className="registration fields"

                                />
                              </div>
                          </div>
                          <div className="col">
                              <div id="registration-div" className="registration student div">
                                <input
                                  type="text"
                                  required=""
                                  placeholder="Graduation Year(s)"
                                  id="professor_year"
                                  className="registration fields"

                                />
                              </div>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col">
                              <div id="registration-div" className="registration student div">
                                <input
                                  type="text"
                                  required=""
                                  placeholder="Research Department"
                                  id="professor_department"
                                  className="registration fields"

                                />
                              </div>
                          </div>
                          <div className="col">
                              <div id="registration-div" className="registration student div">
                                <input
                                  type="text"
                                  required=""
                                  placeholder="Required Courses"
                                  id="professor_courses"
                                  className="registration fields"

                                />
                              </div>
                          </div>
                      </div>
                      <div id="registration-div" className="registration student div">
                        <input
                          type="text"
                          required=""
                          placeholder="Lab Description"
                          id="professor_snippet"
                          className="registration fields large"

                        />
                      </div>
                      <div id="registration-div"><button className="btn btn-primary" type="button" id="register-button" onClick={() => this.signUpProfessor()}>SIGNUP</button></div>
                  </div>
              </div>
          </div>
      </section>

      </div>

    );
  }
}

export default Signup;
