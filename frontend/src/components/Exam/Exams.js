import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from "axios";

import backIcon from '../../data/pics/back-icon.png'
import infoIcon from '../../data/pics/search-icon.png'
import maleStudent from '../../data/pics/male-student.png'
import femaleStudent from '../../data/pics/female-student.png'
import plusIcon from '../../data/pics/plus-icon.png'

import $ from "jquery";

export default class Exams extends Component{

    constructor(props){
        super(props);

        this.state = {
            exams: [],
            studentINDEX: props.match.params.id,
            gender: ''
        };


    }

    componentDidMount() {

        axios.get("/api/students/" + this.state.studentINDEX).then(res => {
            $('#studName').val(res.data.name);
            $('#studSurname').val(res.data.surname);

            this.setState({
                gender: res.data.sex
            });
        });

        axios.get("/api/exams/" + this.state.studentINDEX).then(res => {
            this.setState({
                exams: res.data
            });
            console.log("FROM BACK END: " + res.data)

        });


        //console.log(this.state.data)
    }

    isMale(){
        var sex = this.state.gender;

        if(sex === 'М')
            return true;
        else
            return false;
    }

    emptyExams(){
        console.log(this.state.exams);
        if(this.state.exams.length > 0)
            return false;

        return true;
    }

    render(){
        let exams = this.state.exams;
        let self = this;

        function calculations() {
            var sumGrades = 0;
            var credits = 0;
            var totalExams = 0;

            self.state.exams.map(res => {
                console.log(res);
                totalExams++;
                credits += res.subject.credits;
                sumGrades += res.grade;
            });

            if(isNaN(sumGrades/totalExams))
                $("#averageGrade").html("0.0");
            else
                $("#averageGrade").html((sumGrades/totalExams).toFixed(2));

            $("#totalCredits").html(credits);
            $("#totalExams").html(totalExams);

            return totalExams;
        }
        calculations();

        return (
            <div className="body-content container">

                <hr style={{"marginBottom":"10px"}}/>
                <a href="/Students" className="btn btn-warning">
                    <img style={{"width":"18px","marginTop":"-2px"}} src={backIcon}/> Почетна
                </a>
                <a href={"/Students/" + this.state.studentINDEX} className="btn btn-info">
                    <img style={{"width":"18px","marginTop":"-2px"}} src={infoIcon}/> Лични податоци на студентот
                </a>
                <hr style={{"marginTop":"10px"}}/>
                <div>
                    <div className="row">
                        {
                            this.isMale() ?
                                (<MStudent/>) :
                                (<FStudent/>)
                        }
                        <div className="col-sm-11">
                            <dl className="dl-horizontal">
                                <dt>
                                    <label className="control-label" style={{"margin":"0","padding":"7px 0","position":"relative"}}>Индекс</label>
                                </dt>

                                <dd>
                                    <input value={this.state.studentINDEX} className="form-control input-sm specificInput text-box single-line"
                                           id="index" name="index" type="number"
                                           disabled/>
                                </dd>

                                <dt>
                                    <label className="control-label"
                                           style={{"margin":"0","padding":"7px 0","position":"relative"}}>Име</label>
                                </dt>

                                <dd>
                                    <input id="studName" disabled="disabled" className="form-control input-sm specificInput"
                                            autoComplete="off"/>
                                </dd>

                                <dt>
                                    <label className="control-label"
                                           style={{"margin":"0","padding":"7px 0","position":"relative"}}>Презиме</label>
                                </dt>

                                <dd>
                                    <input id="studSurname" disabled="disabled" className="form-control input-sm specificInput"
                                           autoComplete="off"/>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <br/>
                <div style={{"display":"inline-block", "marginRight": "5px"}} className="alert alert-info specificAlert" role="alert">
                    Просек: <b id="averageGrade"></b>
                </div>
                <div style={{"display":"inline-block", "marginRight": "5px"}} className="alert alert-info specificAlert" role="alert">
                    Кредити: <b id="totalCredits"></b>
                </div>
                <div style={{"display":"inline-block", "marginRight": "5px"}} className="alert alert-info specificAlert" role="alert">
                    Положени испити: <b id="totalExams"></b>
                </div>
                {
                    this.emptyExams() ?
                        (
                            <div className="alert alert-danger specificAlert">
                                <p style={{"display":"inline-block","width":"87%"}}>Досието на студентот е празно!</p>
                                <a href={"/Exams/new/" + this.state.studentINDEX} type="button" className="btn btn-success">
                                    <img style={{"width":"18px","marginTop":"-2px"}} src={plusIcon}/> Додади испит
                                </a>
                            </div>
                        ) :
                        (
                <div>
                    <div className="alert alert-success specificAlert" role="alert">
                        <p style={{"display":"inline-block","width":"87%"}}>Испитите за овој студент се во продолжение:</p>

                        <a href={"/Exams/new/" + this.state.studentINDEX} type="button" className="btn btn-success">
                            <img style={{"width":"18px","marginTop":"-2px"}} src={plusIcon}/> Додади испит
                        </a>

                    </div>

                    <table className={"table table-striped"}>
                        <tbody>
                        <tr style={{background: "gray", color: "white"}}>
                            <th>
                                Код
                            </th>
                            <th>
                                Предмет
                            </th>
                            <th>
                                Сесија
                            </th>
                            <th>
                                Датум
                            </th>
                            <th>
                                Семестар
                            </th>
                            <th>
                                Кредити
                            </th>
                            <th>
                                З/И
                            </th>
                            <th>
                                Оценка
                            </th>
                            <th></th>
                        </tr>
                        {exams.map(item => (
                            <tr className="table-hover">
                                <td className="align-middle">{item.subject.code}</td>
                                <td className="align-middle">{item.subject.name}</td>
                                <td className="align-middle">{item.session.year} ({item.session.month})</td>
                                <td className="align-middle">{item.dateOfExam}</td>
                                <td className="align-middle">{item.semester}</td>
                                <td className="align-middle">{item.subject.credits}</td>
                                <td className="align-middle">{item.type}</td>
                                <td className="align-middle">{item.grade}</td>
                                <td className="align-middle">
                                    {/* <Link to={"/Students/" + item.index} activeClassName="current">{item.index}</Link> */}
                                    <a className="btn btn-info" href={"/Exams/details/" + item.student + "/" + item.subject.code}>Детали за испитот</a>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>)}
            </div>
        );
    }
}

function MStudent(){
    return(
        <div className="col-sm-1">
            <img width="100px" id="studentIcon" src={maleStudent}/>
        </div>
    );
}

function FStudent(){
    return(
        <div className="col-sm-1">
            <img width="100px" id="studentIcon" src={femaleStudent}/>
        </div>
    );
}
