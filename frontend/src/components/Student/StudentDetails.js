import React, {Component} from 'react'
import axios from "axios";

import backIcon from '../../data/pics/back-icon.png'
import studentIcon from '../../data/pics/student-icon.png'
import editIcon from '../../data/pics/edit_icon.svg'
import deleteIcon from '../../data/pics/delete_icon.svg'
import $ from "jquery";
import infoIcon from "../../data/pics/search-icon.png";

export default class StudentDetails extends Component{

    constructor(props){
        super(props);
        this.state = {
            item: [],
            properties: props.match.params,
            studyPrograms: []
        };
    }

    componentDidMount() {
        let id = this.state.properties.id;

        axios.get('/api/programs').then(res => {
            this.setState({
                studyPrograms: res.data
            })
        });

        //Da se zeme tuka od back-end studentot spored ID
        axios.get('/api/students/' + id).then(res => {
            this.setState({
                item: res.data
            })
        });

    }

    viewProgram(){
        var std = this.state.item;

        var ret = <span className="specificDisplay"></span>;

        this.state.studyPrograms.map(res => {
            if(res.id == std.program){
                ret = <span>{res.name}</span>
            }
        });

        return ret;
    }

    deleteItem(){
        axios.delete('/api/students/delete/' + this.state.item.index).then(res => {
            $("#successOperation").dialog("open");
        }).catch(error => {
            $("#unsuccessOperation").dialog("open");
        });
    }

    render(){
        let student = this.state.item;

        $("#confirmDelete").dialog({
            autoOpen: false,
            modal: true,
            draggable: false,
            open: function(){
                $('.ui-dialog-titlebar-close').css("display", "none");

                $(this).html("Дали навистина сакате да го избришете студентот?<br/><strong>Оваа акција не може да биде отповикана!</strong>");
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
                        window.location = "/Students";
                    }
                }
            ]
        });
        $("#unsuccessOperation").dialog({
            autoOpen: false,
            title: "Информација",
            open: function(){
                $('.ui-dialog-titlebar-close').css("display", "none");
            },
            draggable: false,
            modal: true,
            buttons: [
                {
                    text: "ОК",
                    click: function () {
                        $(this).dialog('close');
                    }
                }
            ]
        });

        return (
            <div className="container body-content">
                <div id="confirmDelete"></div>

                {/*
                <script>
                    $(document).ready(function () {
                    $("#dialog").dialog({
                        autoOpen: false,
                        show: {effect: 'fade', speed: 1000},
                        hide: {effect: 'fade', speed: 1000},
                        draggable: false,
                        resizable: false,
                        modal: true,
                        open: function (event, ui) {
                            jQuery('.ui-dialog-titlebar-close').hide();
                            $("#btnDefault").focus();
                        },
                        buttons: [
                            {
                                text: "Да",
                                class: 'btn btn-danger',
                                click: function () {
                                    $('#hiddenDelete').click();
                                }
                            },
                            {
                                id: "btnDefault",
                                text: "Не",
                                class: 'btn btn-info',
                                click: function () {
                                    $('#dialog').dialog("close");
                                }
                            }
                        ]
                    });

                    $('#delete').click(function () {
                    $('#dialog').dialog("open");
                });
                });
                </script>
                */}

                <br/>

                <p className="infoMain left">Информации за студент</p>

                <hr style={{"marginTop":"10px","marginBottom":"10px"}}/>

                <div id="fullView">
                <div className="left">
                    <a href="/Students" className="btn btn-warning">
                        <img style={{width: "18px", marginTop: "-2px"}} src={backIcon}/> Почетна
                    </a>
                    <a id="changeInfoButton" className="btn btn-danger" href={"/Students/EditStudent/" + student.index}>
                        <img style={{"width": "18px"}} src={editIcon}/> Измени податоци
                    </a>
                    <button id="finalDelete" hidden="hidden" onClick={() => this.deleteItem()}></button>
                    <button id="deleteButton" onClick={() => {$('#confirmDelete').dialog("open")}} className="btn btn-danger">
                        <img style={{"width": "18px"}} src={deleteIcon}/> Избриши
                        студент</button>

                    <a style={{float: "right"}} href={"/Exams/" + student.index} className="btn btn-info">
                        <img style={{"width":"18px","marginTop":"-2px"}} src={infoIcon}/> Испити за студентот
                    </a>
                </div>

                <hr style={{"marginTop":"10px"}}/>
                <div>
                    <div className="row">
                        <div className="col-sm-2">
                            <img style={{"marginLeft":"auto","marginRight":"auto","display":"block"}} width="150" src={studentIcon}/>
                                <div style={{"text-align": "center"}} className="alert alert-info">
                                    Досие број:
                                    <br/>
                                    <span style={{"font-weight": "800"}}>{student.index}</span>
                                </div>
                        </div>
                        <div className="col-sm-5">
                            <div className="alert alert-warning specificAlert specificAlertPlus">
                                <dl className="dl-horizontal" style={{"margin-bottom": "0"}}>
                                    <dt>
                                        <label className="specificLabel" htmlFor="Name">Име</label>
                                    </dt>

                                    <dd>
                                        <span className="specificDisplay">{student.name}</span>
                                    </dd>
                                </dl>
                            </div>
                            <div className="alert alert-warning specificAlert specificAlertPlus">
                                <dl className="dl-horizontal" style={{"margin-bottom": "0"}}>
                                    <dt>
                                        <label className="specificLabel" htmlFor="Surname">Презиме</label>
                                    </dt>

                                    <dd>
                                        <span className="specificDisplay">{student.surname}</span>
                                    </dd>
                                </dl>
                            </div>
                            <div className="alert alert-warning specificAlert specificAlertPlus">
                                <dl className="dl-horizontal" style={{"margin-bottom": "0"}}>
                                    <dt>
                                        <label className="specificLabel" htmlFor="Sex">Пол</label>
                                    </dt>

                                    <dd>
                                        <span className="specificDisplay">{student.sex}</span>
                                    </dd>
                                </dl>
                            </div>
                            <div className="alert alert-warning specificAlert specificAlertPlus">
                                <dl className="dl-horizontal" style={{"margin-bottom": "0"}}>
                                    <dt>
                                        <label className="specificLabel" htmlFor="DateOfBirth">Датум на
                                            раѓање</label>
                                    </dt>

                                    <dd>
                                        <span className="specificDisplay">{student.dateOfBirth}</span>
                                    </dd>
                                </dl>
                            </div>
                            <div className="alert alert-warning specificAlert specificAlertPlus">
                                <dl className="dl-horizontal" style={{"margin-bottom": "0"}}>
                                    <dt>
                                        <label className="specificLabel" htmlFor="EMBG">Матичен број</label>
                                    </dt>

                                    <dd className="left">
                                        <span className="specificDisplay">{student.embg}</span>
                                    </dd>
                                </dl>
                            </div>
                            <div className="alert alert-warning specificAlert specificAlertPlus">
                                <dl className="dl-horizontal" style={{"margin-bottom": "0"}}>
                                    <dt>
                                        <label className="specificLabel" htmlFor="Address">Адреса на
                                            живеење</label>
                                    </dt>

                                    <dd>
                                        <span className="specificDisplay left">{student.address}</span>
                                    </dd>
                                </dl>
                            </div>
                            <div className="alert alert-warning specificAlert specificAlertPlus">
                                <dl className="dl-horizontal" style={{"margin-bottom": "0"}}>
                                    <dt>
                                        <label className="specificLabel" htmlFor="MobileNumber">Телефонски
                                            број</label>
                                    </dt>

                                    <dd>
                                        <span className="specificDisplay">{student.mobileNumber}</span>
                                    </dd>
                                </dl>
                            </div>
                            <div className="alert alert-warning specificAlert specificAlertPlus">
                                <dl className="dl-horizontal" style={{"margin-bottom": "0"}}>
                                    <dt>
                                        <label className="specificLabel" htmlFor="Mail">E-Mail</label>
                                    </dt>

                                    <dd>
                                        <span className="specificDisplay">{student.mail}</span>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <div className="col-sm-5">
                            <div className="alert alert-info specificAlert specificAlertPlus">
                                <dl className="dl-horizontal" style={{"margin-bottom": "0"}}>
                                    <dt>
                                        <label className="specificLabel specificLabel2"
                                               htmlFor="Program">Насока</label>
                                    </dt>

                                    <dd>
                                        {this.viewProgram()}
                                    </dd>
                                </dl>
                            </div>
                            <div className="alert alert-info specificAlert specificAlertPlus">
                                <dl className="dl-horizontal" style={{"margin-bottom": "0"}}>
                                    <dt>
                                        <label className="specificLabel specificLabel2"
                                               htmlFor="YearOfStartStudies">Година на упис</label>
                                    </dt>

                                    <dd>
                                        <span className="specificDisplay">{student.yearOfStartStudies}</span>
                                    </dd>
                                </dl>
                            </div>
                            <div className="alert alert-info specificAlert specificAlertPlus">
                                <dl className="dl-horizontal" style={{"margin-bottom": "0"}}>
                                    <dt>
                                        <label className="specificLabel specificLabel2"
                                               htmlFor="Type">Квота</label>
                                    </dt>

                                    <dd>
                                        <span className="specificDisplay">{student.type}</span>
                                    </dd>
                                </dl>
                            </div>
                            <div className="alert alert-info specificAlert specificAlertPlus">
                                <dl className="dl-horizontal" style={{"margin-bottom": "0"}}>
                                    <dt>
                                        <label className="specificLabel specificLabel2" htmlFor="Status">Статус
                                            на студент</label>
                                    </dt>

                                    <dd>
                                        <span className="specificDisplay">{student.status}</span>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="successOperation" className="">
                    Успешно се избришани сите податоци за студентот.
                </div>
                <div id="unsuccessOperation" className="">
                    Не можете да го избришете записот поради релации со испитите !
                </div>
                <hr/>
                </div>
            </div>
        );
    }
}
