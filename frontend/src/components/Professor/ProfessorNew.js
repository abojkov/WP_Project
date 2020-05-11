import React, {Component} from 'react'
import axios from "axios";
import $ from 'jquery'

import correctIcon from '../../data/pics/correct-icon.png'
import backIcon from '../../data/pics/back-icon.png'

export default class ProfessorNew extends Component{
    static professor;

    constructor(props){
        super(props);

        this.professor = {
            id: '',
            name: '',
            surname: ''
        }
    }

    componentDidMount() {
        let professor = this.professor;

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
                        window.location = "/Professors/";
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
            professor.id=0;
            professor.name='';
            professor.surname='';

            $('#sendForm').trigger('reset');
            resetErrors();
        }
        function handleChange(){
            professor.id = $('#id').val();
            professor.name = $('#name').val();
            professor.surname = $('#surname').val();
        }

        $('input, select').change(handleChange);
        $('#existentRecord').hide();

        $('#successOperation').html('Успешно го додадовте професорот')
        $("#successOperation").hide();

        $('#sendForm').submit(function() {
            axios.post('/api/professors/new', JSON.stringify(professor), {
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

                    $('#existentRecord').show().html("<p>Постои професор со овие податоци</p>")
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
                    <p className="infoMainSecond left">Додавање нов професор</p>
                    <hr style={{"marginTop":"10px","marginBottom":"10px"}}/>
                    <div className="left">
                        <a href="/Professors" className="btn btn-warning">
                            <img style={{"width":"18px","marginTop":"-2px"}} src={backIcon}/> Назад
                        </a>
                        <button type="submit" className="btn btn-info">
                            <img style={{"width":"18px","marginTop":"-2px"}} src={correctIcon}/> Креирај
                            професор
                        </button>
                    </div>
                    <hr style={{"marginTop":"10px"}}/>

                    <div className="alert alert-danger" id="existentRecord">

                    </div>

                    <div className="form-horizontal">

                        <div className="form-group">
                            <label className="control-label col-md-2" htmlFor="Name">Име</label>
                            <div className="col-md-10">
                                <input className="form-control text-box single-line" id="name" name="name" type="text"/>
                                <span className="field-validation-valid text-danger" data-valmsg-for="name" data-valmsg-replace="true"></span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-md-2" htmlFor="credits">Презиме</label>
                            <div className="col-md-10">
                                <input className="form-control text-box single-line" id="surname" name="surname" type="text"/>
                                <span className="field-validation-valid text-danger" data-valmsg-for="surname" data-valmsg-replace="true"></span>
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
