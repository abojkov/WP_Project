import React, { Component } from 'react'
import axios from "axios";
import $ from "jquery";

import backIcon from '../../data/pics/back-icon.png'
import correctIcon from '../../data/pics/correct-icon.png'

export default class ExamNew extends Component{

    constructor(props){
        super(props);

        var exm = {
            studentIndex: props.match.params.id
        };

        this.state = {
            index: props.match.params.id,
            exam: exm,
            professors: [],
            sessions: [],
            allowedSubjects: []
        };

        this.changeState = this.changeState.bind(this);
    }

    componentDidMount() {
        var self = this;

        $('input, select').change(this.changeState);
        $('#errors').hide();

        axios.get("/api/students/" + this.state.index).then(res => {
            $('#studNameSurname').html(res.data.name + " " + res.data.surname);
        });

        axios.get("/api/professors").then(res => {
            self.setState({
                professors: res.data
            });
        });

        axios.get("/api/subjects/for/" + this.state.index).then(res => {
            self.setState({
                allowedSubjects: res.data
            });
        });

        axios.get("/api/sessions").then(res => {
            self.setState({
                sessions: res.data
            });
        });

        $("#successOperation").dialog({
            autoOpen: false,
            title: "Информација",
            draggable: false,
            modal: true,
            open: function(){
                $('.ui-dialog-titlebar-close').css("display", "none");
            },
            buttons: [
                {
                    text: "OK",
                    click: function () {
                        window.location = "/Exams/" + self.state.index;
                    }
                }
            ]
        });
    }

    changeState(event) {
        var thisExam = this.state.exam;

        thisExam[event.target.name] = event.target.value;

        this.setState({
            exam: thisExam
        });

        console.log(this.state.exam)
    };


    getStudyYears(){
        let listOfYears = [];

        for(let year=new Date().getFullYear(); year>2010; year--){
            var yearPlusOne = parseInt(year)+1;

            listOfYears.push(<option value={year + "/" + yearPlusOne}>{year + "/" + yearPlusOne}</option>);
        }

        return listOfYears;
    }

    getProfessors(){
        let listOfProfs = [];

        this.state.professors.map(res => {
            listOfProfs.push(<option value={res.id}>{res.name} {res.surname}</option>);
        });

        return listOfProfs;
    }
    getAllowedSubjects(){
        let listOfSubjs = [];

        this.state.allowedSubjects.map(res => {
            listOfSubjs.push(<option value={res.code}>{res.name}</option>);
        });

        return listOfSubjs;
    }
    getActiveSessions(){
        let listOfSubjs = [];

        this.state.sessions.map(res => {
            if(res.active == 1)
                listOfSubjs.push(<option value={res.id}>{res.year} ({res.month})</option>);
        });

        return listOfSubjs;
    }

    submitForm(){
        console.log(this.state.exam);

        axios.post("/api/exams/new", JSON.stringify(this.state.exam), {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then(res => {
            $('#successOperation').dialog('open');
            //window.location = $('#restartComponent').attr('href');
        }).catch(error => {
            $('#errors').show();
        });
    }

    render() {
        $("#sendForm").submit(function(e) {
            e.preventDefault();
        });

        $('#dateOfExam').datepicker({
            dateFormat: "dd.mm.yy",
            changeYear: true,
            changeMonth: true,
            yearRange: "1900:",
            maxDate: new Date(),
            firstDay: 1,
            dayNamesMin: [ "Нед", "Пон", "Вто", "Сре", "Чет", "Пет", "Саб" ],
            monthNamesShort: [ "Јан", "Фев", "Мар", "Апр", "Мај", "Јун", "Јул", "Авг", "Сеп", "Окт", "Ное", "Дек" ]
        });

        $('input').each(function(){
            $(this).attr("autocomplete", "off");
            $(this).attr("readOnly", "readOnly");
            $(this).css("background", "white");
        });

        return(
            <div className="body-content container">
                <br/>
                <a id="restartComponent" hidden href={"/Exams/" + this.state.index}/>
                <p className="infoMainSecond">Додавање нов испит за студент <span id="studNameSurname" style={{color: "white"}}></span> со индекс број <span style={{color: "white"}}>{this.state.index}</span></p>
                <hr style={{"marginTop":"10px","marginBottom":"10px"}}/>
                <form id="sendForm">
                    <a href={"/Exams/" + this.state.index} className="btn btn-warning">
                        <img style={{"width":"18px","marginTop":"-2px"}} src={backIcon}/> Назад
                    </a>
                    <a onClick={() => this.submitForm()} type="submit" className="btn btn-info">
                        <img src={correctIcon} style={{"width":"18px","marginTop":"-2px"}}/> Креирај испит
                        </a>
                    <hr style={{"marginTop":"10px"}}/>
                    <div id="errors" className="alert alert-danger">Потполнете ги сите полиња</div>
                    <div>
                        <div className="row">
                            <div className="col-sm-5">
                                <div className="alert alert-warning specificAlert specificAlertPlus">
                                    <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                        <dt>
                                            <label className="specificLabel" htmlFor="Subject_Name">Предмет</label>
                                        </dt>

                                        <dd>
                                            <select className="form-control input-sm" id="subject" name="subject">
                                                <option value="">Одберете предмет</option>
                                                {this.getAllowedSubjects()}
                                            </select>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="alert alert-warning specificAlert specificAlertPlus">
                                    <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                        <dt>
                                            <label className="specificLabel" htmlFor="Professor">Професор</label>
                                        </dt>

                                        <dd>
                                            <select className="form-control input-sm" id="professor" name="professor">
                                                <option value="">Одберете професор</option>
                                                {this.getProfessors()}
                                            </select>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="alert alert-warning specificAlert specificAlertPlus">
                                    <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                        <dt>
                                            <label className="specificLabel" htmlFor="Type">Тип предмет</label>
                                        </dt>

                                        <dd>
                                            <select className="form-control input-sm" id="type" name="type">
                                                <option value="" hidden>Одберете тип на предмет</option>
                                                <option value="Задолжителен">Задолжителен</option>
                                                <option value="Изборен">Изборен</option>
                                            </select>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="alert alert-warning specificAlert specificAlertPlus">
                                    <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                        <dt>
                                            <label className="specificLabel" htmlFor="YearOfAttendance">Учебна
                                                година</label>
                                        </dt>

                                        <dd>
                                            <select className="form-control input-sm" id="yearOfAttendance" name="yearOfAttendance">
                                                <option value="" hidden>Одберете учебна година</option>
                                                {this.getStudyYears()}
                                            </select>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="alert alert-warning specificAlert specificAlertPlus">
                                    <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                        <dt>
                                            <label className="specificLabel" htmlFor="Semester">Семестар</label>
                                        </dt>

                                        <dd>
                                            <select className="form-control input-sm" id="semester" name="semester">
                                                <option value="" hidden>Одберете семестар</option>
                                                <option value="8">8</option>
                                                <option value="7">7</option>
                                                <option value="6">6</option>
                                                <option value="5">5</option>
                                                <option value="4">4</option>
                                                <option value="3">3</option>
                                                <option value="2">2</option>
                                                <option value="1">1</option>
                                            </select>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="alert alert-warning specificAlert specificAlertPlus">
                                    <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                        <dt>
                                            <label className="specificLabel" htmlFor="DateOfExam">Датум на полагање</label>
                                        </dt>

                                        <dd>
                                            <input type="text" className="form-control input-sm" id="dateOfExam" name="dateOfExam">
                                            </input>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="alert alert-warning specificAlert specificAlertPlus">
                                    <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                        <dt>
                                            <label className="specificLabel" htmlFor="Session">Сесија</label>
                                        </dt>

                                        <dd>
                                            <select className="form-control input-sm" id="session" name="session">
                                                <option value="" hidden>Одберете сесија</option>
                                                {this.getActiveSessions()}
                                            </select>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="alert alert-warning specificAlert specificAlertPlus">
                                    <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                        <dt>
                                            <label className="specificLabel" htmlFor="Grade">Оценка</label>
                                        </dt>

                                        <dd>
                                            <select className="form-control input-sm" id="grade" name="grade">
                                                <option value="" hidden>Одберете оценка</option>
                                                <option value="10">10</option>
                                                <option value="9">9</option>
                                                <option value="8">8</option>
                                                <option value="7">7</option>
                                                <option value="6">6</option>
                                            </select>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            <div className="col-sm-7">

                            </div>
                        </div>
                    </div>
                    <div id="successOperation" className="">
                        Успешно е креиран испит за студентот {$('#studNameSurname').text()}.
                    </div>
                </form>
            </div>
        );
    }
}
