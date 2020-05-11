import React, {Component} from 'react'
import axios from "axios";
import $ from 'jquery'

import correctIcon from '../../data/pics/correct-icon.png'
import backIcon from '../../data/pics/back-icon.png'
import studentIcon from '../../data/pics/student-icon.png'

require('jquery-ui-bundle');

export default class StudentNew extends Component{
    constructor(props){
        super(props);

        this.state = {
            student: {},
            studyPrograms: []
        };

        var self = this;
        var IDfromProps = props.match.params.id;

        axios.get('/api/programs').then(res => {
            self.setState({
                studyPrograms: res.data
            });

        }).catch(error => {
            var element = "<div class='alert alert-danger' style='margin: 0'>Не постои конекција до серверот каде се наоѓа базата на податоци. Ова значи дека серверот во моментот е неактивен.</div>"

            $('form a:last-of-type').attr("disabled", "disabled");
            $('form a:last-of-type').removeAttr("href");

            $('form a:last-of-type').after("<br/><br/>" + element);
        });

        this.changeState = this.changeState.bind(this);
    }

    componentDidMount() {
        $('input, select').change(this.changeState);
        $('#existentRecord').hide();
    }

    changeState(event) {
        var thisStd = this.state.student;

        thisStd[event.target.name] = event.target.value;

        this.setState({
            student: thisStd
        });
    };

    resetErrors(){
        $('#existentRecord').hide();
        $('[data-valmsg-for]').html('');
    }

    submitForm(){
        axios.post("/api/students/new", JSON.stringify(this.state.student), {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then(res => {
            let JSONResult = JSON.parse(JSON.stringify(res));

            if(JSONResult.status == 200) //OK
            {
                $("#successOperation").dialog('open');
                this.resetErrors();
            }
        }).catch(error => {
            var errorCode = error.response.status;

            if(errorCode == 400) //Validation error
            {
                this.resetErrors();
                // OVA E NIZA [error1, error2, ...]
                var JSONResult = JSON.parse(JSON.stringify(error.response.data));

                for(let i=0; i<JSONResult.length; i++){
                    $("[data-valmsg-for=" + JSONResult[i].field + "]").html("<p>" + JSONResult[i].defaultMessage + "</p>");
                }
            }
            else if(errorCode == 409) //Duplicate
            {
                this.resetErrors();

                $('#existentRecord').show().html("<p>Постои студент со овој индекс</p>")
            }
        });
    }

    getAllStudyPrograms(){
        let programsList = [];

        this.state.studyPrograms.map(res => {
            programsList.push(<option value={res.id}>{res.name}</option>);
        });

        return programsList;
    }

    getAllYearsTillNow(){
        let listOfYears = [];

        for(let year=new Date().getFullYear(); year>2010; year--){
            listOfYears.push(<option value={year}>{year}</option>);
        }

        return listOfYears;
    }

    fillFormForStudent(std) {
        var stdValues = Object.values(std);
        var stdKeys = Object.keys(std);

        var i = 0;

        for (const key of stdKeys) {
            $('#' + key.toString()).val(stdValues[i]);

            i++;
        }
    }

    render() {
        this.fillFormForStudent(this.state.student);

        $("#sendForm").submit(function(e) {
            e.preventDefault();
        });

        $("#successOperation").dialog({
            autoOpen: false,
            title: "Информација",
            draggable: false,
            modal: true,
            open: function(){
                $('.ui-dialog-titlebar-close').css("display", "none");
                $(this).removeClass(); //("alert alert-info");
                $(this).addClass("alert alert-info");
                $(this).css("margin", "5px 0 5px 0");
            },
            buttons: [
                {
                    text: "OK",
                    click: function () {
                        window.location = "/Students/" + $('#index').val().toString();
                    }
                }
            ]
        });

        $('#dateOfBirth').datepicker({
            dateFormat: "dd.mm.yy",
            changeYear: true,
            changeMonth: true,
            yearRange: "1900:",
            maxDate: "-15y",
            firstDay: 1,
            dayNamesMin: [ "Нед", "Пон", "Вто", "Сре", "Чет", "Пет", "Саб" ],
            monthNamesShort: [ "Јан", "Фев", "Мар", "Апр", "Мај", "Јун", "Јул", "Авг", "Сеп", "Окт", "Ное", "Дек" ]
        });

        $('input').each(function(){
            $(this).attr("autocomplete", "off");
            $('#dateOfBirth').attr("readOnly", "readOnly");
            $(this).css("background", "white");
        });

        return (
            <div className="container body-content">
                <br/>
                <form onSubmit={() => this.submitForm()}>
                    <p className="infoMainSecond ">Додавање нов студент</p>
                    <hr style={{"marginTop":"10px","marginBottom":"10px"}}/>
                    <a href={"/Students"} className="btn btn-warning">
                        <img style={{"width":"18px","marginTop":"-2px"}} src={backIcon}/> Откажи
                    </a>
                    <a onClick={() => this.submitForm()} className="btn btn-info">
                        <img style={{"width":"18px","marginTop":"-2px"}} src={correctIcon}/> Зачувај
                    </a>
                    <hr style={{"marginTop":"10px"}}/>
                    <div className="alert alert-danger" id="existentRecord">

                    </div>
                    <div>
                        <div className="row">
                            <div className="col-sm-2">
                                <img style={{"marginLeft":"auto","marginRight":"auto","display":"block"}} width="150" src={studentIcon}/>
                                <div style={{"textAlign":"center"}} className="alert alert-info">
                                    Досие број:
                                    <br/>
                                    <input className="form-control input-sm text-box single-line"
                                           id="index"
                                           name="index"
                                           type="number" onInput={() => {
                                               if($('#index').val().length > 6)
                                                   $('#index').val($('#index').val().slice(0, 6))
                                           }}>
                                    </input>
                                    <span className="field-validation-valid text-danger"
                                          data-valmsg-for="index">
                                    </span>
                                </div>
                            </div>
                            <div className="col-sm-5">
                                <div className="alert alert-warning specificAlert specificAlertPlus">
                                    <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                        <dt>
                                            <label className="specificLabel" htmlFor="Name">Име</label>
                                        </dt>
                                        <dd>
                                            <div className="col-md-12">
                                                <input className="form-control input-sm text-box single-line"
                                                       id="name"
                                                       name="name" type="text">
                                                </input>
                                                <span className="field-validation-valid text-danger"
                                                      data-valmsg-for="name">
                                                        </span>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="alert alert-warning specificAlert specificAlertPlus">
                                    <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                        <dt>
                                            <label className="specificLabel" htmlFor="Surname">Презиме</label>
                                        </dt>

                                        <dd>
                                            <div className="col-md-12">
                                                <input className="form-control input-sm text-box single-line"
                                                       id="surname"
                                                       name="surname" type="text">
                                                </input>
                                                <span className="field-validation-valid text-danger"
                                                      data-valmsg-for="surname">
                                                        </span>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="alert alert-warning specificAlert specificAlertPlus">
                                    <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                        <dt>
                                            <label className="specificLabel" htmlFor="Sex">Пол</label>
                                        </dt>

                                        <dd>
                                            <div className="col-md-12">
                                                <select className="form-control input-sm"
                                                        id="sex"
                                                        name="sex">
                                                    <option selected="selected" hidden value="">Одберете пол</option>
                                                    <option value="М">М</option>
                                                    <option value="Ж">Ж</option>
                                                </select>
                                                <span className="field-validation-valid text-danger"
                                                      data-valmsg-for="sex"></span>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="alert alert-warning specificAlert specificAlertPlus">
                                    <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                        <dt>
                                            <label className="specificLabel" htmlFor="DateOfBirth">
                                                Датум на
                                                раѓање
                                            </label>
                                        </dt>

                                        <dd>
                                            <div className="col-md-12">
                                                <input className="form-control input-sm text-box single-line"
                                                       id="dateOfBirth"
                                                       name="dateOfBirth" type="text">
                                                </input>
                                                <span className="field-validation-valid text-danger"
                                                      data-valmsg-for="dateOfBirth">
                                                        </span>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="alert alert-warning specificAlert specificAlertPlus">
                                    <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                        <dt>
                                            <label className="specificLabel" htmlFor="EMBG">Матичен број</label>
                                        </dt>

                                        <dd>
                                            <div className="col-md-12">
                                                <input className="form-control input-sm text-box single-line"
                                                       id="embg"
                                                       name="embg" type="number"
                                                       onInput={() => {
                                                           if($('#embg').val().length > 13)
                                                               $('#embg').val($('#embg').val().slice(0, 13))
                                                       }}>
                                                </input>
                                                <span className="field-validation-valid text-danger"
                                                      data-valmsg-for="embg">
                                                        </span>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="alert alert-warning specificAlert specificAlertPlus">
                                    <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                        <dt>
                                            <label className="specificLabel" htmlFor="Address">Адреса на
                                                живеење</label>
                                        </dt>

                                        <dd>
                                            <div className="col-md-12">
                                                <input className="form-control input-sm text-box single-line"
                                                       id="address"
                                                       name="address" type="text">
                                                </input>
                                                <span className="field-validation-valid text-danger"
                                                      data-valmsg-for="address">
                                                        </span>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="alert alert-warning specificAlert specificAlertPlus">
                                    <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                        <dt>
                                            <label className="specificLabel" htmlFor="MobileNumber">Телефонски
                                                број</label>
                                        </dt>

                                        <dd>
                                            <div className="col-md-12">
                                                <input className="form-control input-sm text-box single-line"
                                                       id="mobileNumber"
                                                       name="mobileNumber" type="text"
                                                       onInput={() => {
                                                           if($('#mobileNumber').val().length > 15)
                                                               $('#mobileNumber').val($('#mobileNumber').val().slice(0, 15))
                                                       }}>
                                                </input>
                                                <span className="field-validation-valid text-danger"
                                                      data-valmsg-for="mobileNumber">
                                                        </span>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="alert alert-warning specificAlert specificAlertPlus">
                                    <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                        <dt>
                                            <label className="specificLabel" htmlFor="Mail">E-Mail</label>
                                        </dt>

                                        <dd>
                                            <div className="col-md-12">
                                                <input className="form-control input-sm text-box single-line"
                                                       id="mail"
                                                       name="mail" type="email">
                                                </input>
                                                <span className="field-validation-valid text-danger"
                                                      data-valmsg-for="mail">
                                                        </span>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            <div className="col-sm-5">
                                <div className="alert alert-info specificAlert specificAlertPlus">
                                    <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                        <dt>
                                            <label className="specificLabel specificLabel2"
                                                   htmlFor="Program">Насока</label>
                                        </dt>

                                        <dd>
                                            <div className="col-md-12">
                                                <select value={this.state.student.program} className="form-control input-sm"
                                                        id="program"
                                                        name="program">
                                                    <option value="" hidden>Одберете насока</option>
                                                    {this.getAllStudyPrograms()}
                                                </select>
                                                <span className="field-validation-valid text-danger"
                                                      data-valmsg-for="program">
                                                        </span>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="alert alert-info specificAlert specificAlertPlus">
                                    <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                        <dt>
                                            <label className="specificLabel specificLabel2"
                                                   htmlFor="YearOfStartStudies">Година на упис</label>
                                        </dt>

                                        <dd>
                                            <div className="col-md-12">
                                                <select className="form-control input-sm"
                                                        id="yearOfStartStudies"
                                                        name="yearOfStartStudies">
                                                    <option value="" hidden>Одберете година</option>
                                                    {this.getAllYearsTillNow()}
                                                </select>
                                                <span className="field-validation-valid text-danger"
                                                      data-valmsg-for="yearOfStartStudies">
                                                        </span>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="alert alert-info specificAlert specificAlertPlus">
                                    <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                        <dt>
                                            <label className="specificLabel specificLabel2"
                                                   htmlFor="Type">Квота</label>
                                        </dt>

                                        <dd>
                                            <div className="col-md-12">
                                                <select className="form-control input-sm"
                                                        id="type"
                                                        name="type">
                                                    <option value="" hidden>Одберете квота</option>
                                                    <option value="Државна">Државна</option>
                                                    <option value="Приватна (кофинансирање)">Приватна (кофинансирање)</option>
                                                </select>
                                                <span className="field-validation-valid text-danger"
                                                      data-valmsg-for="type">
                                                        </span>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="alert alert-info specificAlert specificAlertPlus">
                                    <dl className="dl-horizontal" style={{"marginBottom":"0"}}>
                                        <dt>
                                            <label className="specificLabel specificLabel2" htmlFor="Status">Статус
                                                на студент</label>
                                        </dt>

                                        <dd>
                                            <div className="col-md-12">
                                                <select className="form-control input-sm"
                                                        id="status"
                                                        name="status">
                                                    <option value="" hidden>Одберете статус</option>
                                                    <option value="Редовен">Редовен</option>
                                                    <option value="Вонреден">Вонреден</option>
                                                </select>
                                                <span className="field-validation-valid text-danger"
                                                      data-valmsg-for="status">
                                                        </span>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>

                            </div>
                        </div>
                    </div>
                </form>
                <div id="successOperation">
                    Успешно е креиран нов студент !
                </div>

            </div>
        );
    }
}
