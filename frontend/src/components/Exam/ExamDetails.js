import React, { Component } from 'react'
import axios from "axios";
import $ from "jquery";

import backIcon from '../../data/pics/back-icon.png'
import editIcon from '../../data/pics/edit_icon.svg'
import deleteIcon from '../../data/pics/delete_icon.svg'

export default class ExamDetails extends Component{

    constructor(props){
        super(props);

        this.state = {
            index: props.match.params.id,
            subject: props.match.params.code
        };

        axios.get('/api/exams/' + this.state.index + "/" + this.state.subject).then(res => {
            var exam = res.data;
            console.log(exam);
            $('#subjectName').html(exam.subject.name);
            $('#professorNameSurname').html(exam.professor.name + " " + exam.professor.surname);
            $('#subjectType').html(exam.type);
            $('#yearOfAttendance').html(exam.yearOfAttendance);
            $('#semester').html(exam.semester);
            $('#dateOfExam').html(exam.dateOfExam);
            $('#session').html(exam.session.year + " (" + exam.session.month + ")");
            $('#grade').html(exam.grade);
        });

        axios.get('/api/students/' + this.state.index).then(res => {
            var std = res.data;

            $('#studentNameSurname').html(std.name + " " + std.surname);
        });
    }

    componentDidMount() {
        var self = this;

        $("#confirmDelete").dialog({
            autoOpen: false,
            modal: true,
            draggable: false,
            open: function(){
                $('.ui-dialog-titlebar-close').css("display", "none");
                $(this).html("Дали навистина сакате да го избришете испитот?<br/><strong>Оваа акција не може да биде отповикана!</strong>");
            },
            title: "Информација",
            dialogClass: "no-close",
            buttons: [
                {
                    text: "Не",
                    click: function(){
                        $(this).dialog("close");
                    }
                },
                {
                    text: "Да",
                    open: function() {
                        $(this).css("background", "#ed3b3b");
                        $(this).css("color", "#ffffff");
                    },
                    click: function(){
                        $("#finalDelete").trigger('click');
                        $(this).dialog("close");
                    }
                }
            ]
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

    deleteThis(){
        axios.delete('/api/exams/delete/' + this.state.index + "/" + this.state.subject).then(res => {
            $('#successOperation').dialog('open');
            //window.location = "/Exams/" + this.state.index;
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        var exam = this.state.exam;
        var student = this.state.student;

        return(
            <div className="body-content container">
                <br/>
                <p className="infoMain">Информации за испит</p>

                <hr style={{"marginTop":"10px","marginBottom":"10px"}}/>
                <a href={"/Exams/" + this.state.index} className="btn btn-warning">
                    <img style={{"width":"18px","marginTop":"-2px"}} src={backIcon}/> Назад
                </a>
                <a className="btn btn-danger" href={"/Exams/change/" + this.state.index+ "/" + this.state.subject}>
                    <img style={{"width":"18px"}} src={editIcon}/> Измени податоци
                </a>
                <button id="finalDelete" onClick={() => this.deleteThis()} hidden="hidden"/>
                <a onClick={() => $('#confirmDelete').dialog('open')} id="delete" className="btn btn-danger">
                    <img style={{"width":"18px"}} src={deleteIcon}/> Избриши испит
                </a>
                <hr style={{"marginTop":"10px"}}/>
                <div>
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="alert alert-warning specificAlert specificAlertPlus">
                                <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                    <dt>
                                        <label className="specificLabel" htmlFor="Student_Index">Индекс</label>
                                    </dt>

                                    <dd>
                                        <span id="studentIndex" className="specificDisplay">{this.state.index}</span>
                                    </dd>
                                </dl>
                            </div>
                            <div className="alert alert-warning specificAlert specificAlertPlus">
                                <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                    <dt>
                                        <label className="specificLabel" htmlFor="Student">Студент</label>
                                    </dt>

                                    <dd>
                                        <span id="studentNameSurname" className="specificDisplay"></span>
                                    </dd>
                                </dl>
                            </div>
                            <div className="alert alert-warning specificAlert specificAlertPlus">
                                <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                    <dt>
                                        <label className="specificLabel" htmlFor="Subject_Name">Предмет</label>
                                    </dt>

                                    <dd>
                                        <span id="subjectName" className="specificDisplay"></span>
                                    </dd>
                                </dl>
                            </div>
                            <div className="alert alert-warning specificAlert specificAlertPlus">
                                <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                    <dt>
                                        <label className="specificLabel" htmlFor="Professor">Професор</label>
                                    </dt>

                                    <dd>
                                        <span id="professorNameSurname" className="specificDisplay"></span>
                                    </dd>
                                </dl>
                            </div>
                            <div className="alert alert-warning specificAlert specificAlertPlus">
                                <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                    <dt>
                                        <label className="specificLabel" htmlFor="Type">Тип предмет</label>
                                    </dt>

                                    <dd>
                                        <span id="subjectType" className="specificDisplay"></span>
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
                                        <span id="yearOfAttendance" className="specificDisplay"></span>
                                    </dd>
                                </dl>
                            </div>
                            <div className="alert alert-warning specificAlert specificAlertPlus">
                                <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                    <dt>
                                        <label className="specificLabel" htmlFor="Semester">Семестар</label>
                                    </dt>

                                    <dd>
                                        <span id="semester" className="specificDisplay"></span>
                                    </dd>
                                </dl>
                            </div>
                            <div className="alert alert-warning specificAlert specificAlertPlus">
                                <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                    <dt>
                                        <label className="specificLabel" htmlFor="DateOfExam">Датум на полагање</label>
                                    </dt>

                                    <dd>
                                        <span id="dateOfExam" className="specificDisplay"></span>
                                    </dd>
                                </dl>
                            </div>
                            <div className="alert alert-warning specificAlert specificAlertPlus">
                                <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                    <dt>
                                        <label className="specificLabel" htmlFor="Session">Сесија</label>
                                    </dt>

                                    <dd>
                                        <span id="session" className="specificDisplay"></span>
                                    </dd>
                                </dl>
                            </div>
                            <div className="alert alert-warning specificAlert specificAlertPlus">
                                <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                    <dt>
                                        <label className="specificLabel" htmlFor="Grade">Оценка</label>
                                    </dt>

                                    <dd>
                                        <span id="grade" className="specificDisplay"></span>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <div className="col-sm-7">

                        </div>
                    </div>
                    <div id="confirmDelete"></div>
                    <div id="successOperation" className="">
                        Успешно се избришани сите податоци за испитот.
                    </div>
                </div>
            </div>
        );
    }
}

