import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import axios from "axios";
import $ from 'jquery'

import correctIcon from '../../data/pics/correct-icon.png'
import backIcon from '../../data/pics/back-icon.png'

export default class SessionNew extends Component{
    static session;

    constructor(props){
        super(props);

        this.session = {
            id: '',
            month: '',
            year: '',
            active: false
        }
    }

    componentDidMount() {
        let session = this.session;

        axios.get("/api/programs").then().catch(err => {
            var element = "<div class='alert alert-danger' style='margin: 0'>Не постои конекција до серверот каде се наоѓа базата на податоци. Ова значи дека серверот во моментот е неактивен.</div>"

            $('form button:last-of-type').attr("disabled", "disabled");

            $('form button:last-of-type').after("<br/><br/>" + element);
        });

        function resetErrors(){
            $('#existentRecord').hide();
            $('[data-valmsg-for]').html('');
        }
        function resetForm(){
            session.id=0;
            session.month='';
            session.year='';

            $('#sendForm').trigger('reset');
            resetErrors();
        }
        function handleChange(){
            session.id = $('#id').val();
            session.month = $('#month').val();
            session.year = $('#year').val();
        }

        $('input, select').change(handleChange);
        $('#existentRecord').hide();

        $('#successOperation').html('Успешно ја додадовте испитната сесија')
        $("#successOperation").hide();

        $('#sendForm').submit(function() {
            axios.post('/api/sessions/new', JSON.stringify(session), {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            ).then(res => {
                let JSONResult = JSON.parse(JSON.stringify(res))

                if(JSONResult.status == 200) //OK
                {
                    $("#successOperation").hide().slideDown(1000).delay(3000).slideUp(1000);
                    resetForm();
                }
            }).catch(error => {
                var errorCode = error.response.status;

                if(errorCode == 400) //Validation error
                {
                    resetErrors();
                    // OVA E NIZA [error1, error2, ...]
                    var JSONResult = JSON.parse(JSON.stringify(error.response.data));

                    for(let i=0; i<JSONResult.length; i++){
                        $("[data-valmsg-for=" + JSONResult[i].field + "]").html("<p>" + JSONResult[i].defaultMessage + "</p>");
                    }
                }
                else if(errorCode == 409) //Duplicate
                {
                    resetErrors();

                    $('#existentRecord').show().html("<p>Испитната сесија постои</p>")
                }
            });

            return false;
        });
    };

    getAllYearsTillNow(){
        let listOfYears = [];

        for(let year=new Date().getFullYear(); year>2010; year--){
            listOfYears.push(<option value={year}>{year}</option>);
        }

        return listOfYears;
    }

    render() {
        return (
            <div className="container body-content">
                <div></div><div></div><br/>
                <form id="sendForm">
                    <p className="infoMainSecond left">Додавање нова испитна сесија</p>
                    <hr style={{"marginTop":"10px","marginBottom":"10px"}}/>
                    <div className="left">
                        <a href="/Sessions" className="btn btn-warning">
                            <img style={{"width":"18px","marginTop":"-2px"}} src={backIcon}/> Назад
                        </a>
                        <button type="submit" className="btn btn-info">
                            <img style={{"width":"18px","marginTop":"-2px"}} src={correctIcon}/> Креирај испитна сесија
                        </button>
                    </div>
                    <hr style={{"marginTop":"10px"}}/>

                    <div className="alert alert-danger" id="existentRecord">

                    </div>

                    <div className="form-horizontal">
                        <input name="id" value="0" id="id" hidden="hidden" />

                        <div className="form-group">
                            <label className="control-label col-md-2" htmlFor="Name">Месец</label>
                            <div className="col-md-10">
                                <select className="form-control text-box single-line" id="month" name="month">
                                    <option selected hidden value="">Одбери</option>
                                    <option value="Јануари">Јануари</option>
                                    <option value="Јуни">Јуни</option>
                                    <option value="Септември">Септември</option>
                                </select>
                                <span className="field-validation-valid text-danger" data-valmsg-for="month" data-valmsg-replace="true"></span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-md-2" htmlFor="Name">Година</label>
                            <div className="col-md-10">
                                <select className="form-control text-box single-line" id="year" name="year">
                                    <option selected hidden value="0">Одбери</option>
                                    {this.getAllYearsTillNow()}
                                </select>
                                <span className="field-validation-valid text-danger" data-valmsg-for="year" data-valmsg-replace="true"></span>
                            </div>
                        </div>
                    </div>
                </form>
                <div id="successOperation" className="alert alert-info">

                </div>

            </div>
        );
    }
}
