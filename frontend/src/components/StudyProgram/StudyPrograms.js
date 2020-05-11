import React, {Component} from 'react'
import axios from "axios";

import backIcon from '../../data/pics/back-icon.png'
import plusIcon from '../../data/pics/plus-icon.png'

import $ from "jquery";

export default class StudyPrograms extends Component{
    constructor(props){
        super(props);

        this.state = {
            programs: [],
        };

        this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {
        axios.get("/api/programs").then(res => {
            this.setState({
                programs: res.data
            })
        }).catch(err => {
            var element = "<div class='alert alert-danger' style='margin: 0'>Не постои конекција до серверот каде се наоѓа базата на податоци. Ова значи дека серверот во моментот е неактивен.</div>"
            $('table').html(element);

            $('#options a:last-of-type').attr("disabled", "disabled");
            $('#options a:last-of-type').removeAttr("href");
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
        $("#confirmDelete").dialog({
            autoOpen: false,
            modal: true,
            draggable: false,
            open: function(){
                $('.ui-dialog-titlebar-close').css("display", "none");

                $(this).html("Дали навистина сакате да го избришете записот?<br/><strong>Оваа акција не може да биде отповикана!</strong>");
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
                        var toBeDeletedID = $("#progToBeDeleted").text();

                        $("#finalDelete" + toBeDeletedID).trigger('click');
                        $(this).dialog("close");
                    }
                }
            ]
        });

        $('#unsuccessOperation').hide();
    }

    deleteItem(event){
        var toBeDeletedID = $("#progToBeDeleted").text();
        var row = $("#finalDelete" + toBeDeletedID).parent().parent();

        axios.delete('/api/programs/delete/' + toBeDeletedID).then(res => {
            $("#successOperation").hide().slideDown(1000).delay(3000).slideUp(1000);

            $(row).css({"background": "pink"}).fadeOut(900, function() {
                $(this).remove();
            })
        }).catch(error => {
            $("#unsuccessOperation").dialog('open');
        });
    }

    render() {
        let programs = this.state.programs;

        return (
            <div className="container body-content">
                <div id="confirmDelete"></div>
                <div id="unsuccessOperation">Не можете да го избришете записот поради релации со испитите</div>
                <br/>
                <p className="infoMain">Листа на студиски програми</p>
                <hr style={{"marginTop":"10px","marginBottom":"10px"}}/>
                <div id="options">
                    <a href="/" className="btn btn-warning">
                        <img style={{"width":"18px","marginTop":"-2px"}} src={backIcon}/> Почетнa
                    </a>
                    <a className="btn btn-info" href="/Programs/new" style={{"float":"right","marginRight":"25px"}}>
                        <img style={{"width":"18px","marginTop":"-2px"}} src={plusIcon}/> Нова студиска програма</a>
                </div>
                <hr style={{"marginTop": "10px"}}/>

                <table className="table table-striped table-new">
                    <tbody>
                    <tr id="header">
                        <th>
                            Студиска програма
                        </th>
                        <th></th>
                    </tr>

                    {programs.map(item => (
                        <tr>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                <a href={"/Programs/" + item.id}>Промени информации</a>&nbsp;|&nbsp;&nbsp;
                                <button id={"finalDelete" + item.id} onClick={this.deleteItem} hidden="hidden"></button>
                                <button onClick={() => {$("#progToBeDeleted").text(item.id); $("#confirmDelete").dialog("open"); }}>Избриши</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <input hidden="hidden" id="progToBeDeleted"/>
            </div>
        );
    }
}
