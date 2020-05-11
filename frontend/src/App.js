import React from 'react';
import axios from 'axios'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';
import logo from '../src/data/pics/Logo.png'

import Header from './components/Header'
import Main from './components/main'
import Footer from "./components/Footer";
import Students from './components/Student/Students'
import StudentDetails from './components/Student/StudentDetails'
import Subjects from "./components/Subjects/Subjects";
import SubjectNew from "./components/Subjects/SubjectNew";
import SubjectInfo from "./components/Subjects/SubjectInfo";
import Professors from "./components/Professor/Professors";
import ProfessorNew from "./components/Professor/ProfessorNew";
import ProfessorInfo from "./components/Professor/ProfessorInfo";
import StudyPrograms from "./components/StudyProgram/StudyPrograms";
import StudyProgramNew from "./components/StudyProgram/StudyProgramNew";
import StudyProgramInfo from "./components/StudyProgram/StudyProgramInfo";
import Sessions from "./components/Session/Sessions";
import SessionNew from "./components/Session/SessionNew";
import ChangeStudentInfo from "./components/Student/ChangeStudentInfo";
import StudentNew from "./components/Student/StudentNew";
import Exams from "./components/Exam/Exams";
import ExamDetails from "./components/Exam/ExamDetails";
import ExamNew from "./components/Exam/ExamNew";
import ExamChange from "./components/Exam/ExamChange";
import AboutInfo from "./components/About";

function App() {
  return (
    <Router>
        <div className="App">
            <Header/>

            {/*
            <div style={{width: "70%", margin: "auto", marginTop: "60px"}}>
                <Students/>
            </div>
            */}

            <div style={{width: "100%", margin: "auto", marginTop: "10px"}}>
                <Switch>
                    <Route exact path="/" component={AboutInfo}/>
                    <Route exact path="/Students" component={Students}/>
                    <Route exact path="/Students/EditStudent/:id" component={ChangeStudentInfo}/>
                    <Route exact path="/Students/new" component={StudentNew}/>
                    <Route path="/Students/:id" component={StudentDetails}/>

                    <Route exact path="/Exams/new/:id" component={ExamNew}/>
                    <Route exact path="/Exams/:id" component={Exams}/>
                    <Route exact path="/Exams/details/:id/:code" component={ExamDetails}/>
                    <Route exact path="/Exams/change/:id/:code" component={ExamChange}/>

                    <Route exact path="/Subjects" component={Subjects}></Route>
                    <Route exact path="/Subjects/new" component={SubjectNew}></Route>
                    <Route exact path="/Subjects/:id" component={SubjectInfo}></Route>

                    <Route exact path="/Professors" component={Professors}></Route>
                    <Route exact path="/Professors/new" component={ProfessorNew}></Route>
                    <Route exact path="/Professors/:id" component={ProfessorInfo}></Route>

                    <Route exact path="/Programs" component={StudyPrograms}></Route>
                    <Route exact path="/Programs/new" component={StudyProgramNew}></Route>
                    <Route exact path="/Programs/:id" component={StudyProgramInfo}></Route>

                    <Route exact path="/Sessions" component={Sessions}></Route>
                    <Route exact path="/Sessions/new" component={SessionNew}></Route>

                    <Route exact path="/Home/About" component={AboutInfo}></Route>
                </Switch>
            </div>

            <Footer/>
        </div>
    </Router>
  );
}

const DIV1 = (props) => (
    <div>
        DIV1
    </div>
);

const DIV2 = (props) => (
    <div>
        DIV2
    </div>
);

export default App;
