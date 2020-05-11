import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import axios from "axios";
import $ from 'jquery'

import correctIcon from '../../data/pics/correct-icon.png'
import backIcon from '../../data/pics/back-icon.png'

export default class Subjects extends Component{
    static subject;

    constructor(props){
        super(props);

        this.subject = {
            code: '',
            name: '',
            credits: 0
        }
    }

    componentDidMount() {
        let subject = this.subject;

        $('input').attr('autocomplete', 'off');

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
                        window.location = "/Subjects/";
                    }
                }
            ]
        });

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
            subject.credits=0;
            subject.name='';
            subject.code='';

            $('#sendForm').trigger('reset');
            resetErrors();
        }
        function handleChange(){
            subject.code = $('#code').val().toUpperCase();
            subject.name = $('#name').val();
            subject.credits = $('#credits').val();
        }

        $('input, select').change(handleChange);
        $('#existentRecord').hide();

        $('#successOperation').html('Успешно го додадовте предметот')
        $("#successOperation").hide();

        $('#sendForm').submit(function() {
            axios.post('/api/subjects/new', JSON.stringify(subject), {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                    }
            }
            ).then(res => {
                let JSONResult = JSON.parse(JSON.stringify(res))

                if(JSONResult.status == 200) //OK
                {
                    $("#successOperation").dialog('open');
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

                    $('#existentRecord').show().html("<p>Постои предмет со овој код</p>")
                }
            });

            return false;
        });
    }



    render() {
        return (
            <div className="container body-content">
                <div></div><div></div><br/>
                <form id="sendForm">
                    <p className="infoMainSecond left">Додавање нов предмет</p>
                    <hr style={{"marginTop":"10px","marginBottom":"10px"}}/>
                    <div className="left">
                        <a href="/Subjects" className="btn btn-warning">
                            <img style={{"width":"18px","marginTop":"-2px"}} src={backIcon}/> Назад
                        </a>
                        <button type="submit" className="btn btn-info">
                            <img style={{"width":"18px","marginTop":"-2px"}} src={correctIcon}/> Креирај
                            предмет
                        </button>
                    </div>
                    <hr style={{"marginTop":"10px"}}/>

                    <div className="alert alert-danger" id="existentRecord">

                    </div>

                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="control-label col-md-2" htmlFor="Code">Код</label>
                                <div className="col-md-10">
                                    <input className="form-control text-box single-line" id="code" name="code"
                                           style={{"textTransform":"uppercase"}} type="text"
                                           onInput={() => {
                                               if($('#code').val().length > 7)
                                                   $('#code').val($('#code').val().slice(0, 7))
                                           }}/>
                                           <span className="field-validation-valid text-danger" data-valmsg-for="code" data-valmsg-replace="true">       </span>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label col-md-2" htmlFor="Name">Предмет</label>
                                <div className="col-md-10">
                                    <input className="form-control text-box single-line" id="name" name="name" type="text"/>
                                    <span className="field-validation-valid text-danger" data-valmsg-for="name" data-valmsg-replace="true"></span>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label col-md-2" htmlFor="credits">Кредити</label>
                                <div className="col-md-10">
                                    <select className="form-control" id="credits" name="credits">
                                        <option value="">Одберете кредити</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                    </select>
                                    <span className="field-validation-valid text-danger" data-valmsg-for="credits" data-valmsg-replace="true"></span>
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
