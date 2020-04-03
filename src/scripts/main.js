"use strict";

let formDef1 = [
    {label: 'Разработчики:', kind: 'longtext', name: 'developers'},
    {label: 'Название сайта:', kind: 'longtext', name: 'sitename'},
    {label: 'URL сайта:', kind: 'longtext', name: 'siteurl'},
    {label: 'Дата запуска сайта:', kind: 'number', name: 'data'},
    {label: 'Посетителей в сутки', kind: 'number', name: 'visitors'},
    {label: 'E-mail для связи', kind: 'shorttext', name: 'email'},
    {label: 'Рубрика каталога', kind: 'combo', name: 'division', variants:
            [
                {text: 'здоровье', value: 1},
                {text: 'домашний уют', value: 2},
                {text: 'бытовая техника', value: 3}
            ]
    },
    {label: 'Размещение', kind: 'radio', name: 'payment', variants:
            [
                {text: 'бесплатное', value: 1},
                {text: 'платное', value: 2},
                {text: 'VIP', value: 3}
            ]
    },
    {label: 'Разрешить отзывы: ', kind: 'check', name: 'votes'},
    {label: 'Описание сайта: ', kind: 'memo', name: 'description'},
    {label: 'Опубликовать: ', kind: 'submit'}
]

function createForm(formFields) {
    let form = document.createElement('form');
    form.setAttribute('action', 'http://fe.it-academy.by/TestForm.php');
    form.setAttribute('id', 'form');
    document.body.appendChild(form);

    formFields.forEach(element => {
        let fieldContainer = document.createElement('div');
        let fieldNameValue = document.createTextNode(element.label);
        let fieldName;
        fieldContainer.setAttribute('class', 'item-container');

        if (element.kind === 'submit') {
            fieldName = document.createElement('button');
            fieldName.setAttribute('type', element.kind);
            fieldName.setAttribute('name', element.kind);
            fieldName.setAttribute('id', element.kind);
        } else {
            fieldName = document.createElement('P');
            fieldName.setAttribute('class', 'text-container');
        }
        fieldName.appendChild(fieldNameValue);
        fieldContainer.appendChild(fieldName);
        form.appendChild(fieldContainer);

        if (element.kind === 'longtext' || element.kind === 'shorttext' || element.kind === 'number') {
            let fieldControl = document.createElement("input");
            fieldControl.setAttribute('class', 'text-control');
            fieldControl.setAttribute('class', 'form-control');
            if (element.kind === 'longtext' || element.kind === 'shorttext') {
                fieldControl.setAttribute('type', 'text');
                if (element.kind === 'longtext') {
                    fieldControl.setAttribute('maxlength', 50);
                } else {
                    fieldControl.setAttribute('maxlength', 25);
                }
            }
            else {
                fieldControl.setAttribute('type', 'number');
            }
            fieldControl.setAttribute('name', element.name);
            fieldContainer.appendChild(fieldControl);
        }

        if (element.kind === 'combo') {
            let fieldControl = document.createElement('select');
            fieldControl.setAttribute('name', element.name);
            fieldControl.setAttribute('class', 'form-control');

            element.variants.forEach(comboItem => {
                let comboItemOption = document.createElement('option');
                let comboItemOptionValue = document.createTextNode(comboItem.text);
                comboItemOption.appendChild(comboItemOptionValue);
                comboItemOption.setAttribute('value', comboItem.value);
                fieldControl.appendChild(comboItemOption);
            });
            fieldContainer.appendChild(fieldControl);
        }

        if (element.kind === 'radio') {
            let radioContainer = document.createElement('div');
            radioContainer.setAttribute('class', 'radio-container');

            element.variants.forEach((radioItem, i) => {                                // - i - для
                let fieldControlContainer = document.createElement('p');
                let fieldControl = document.createElement('input');
                let fieldControlValue = document.createTextNode(radioItem.text);

                fieldControl.setAttribute('class', 'form-control');
                fieldControl.setAttribute('type', 'radio');
                fieldControl.setAttribute('name', 'radio');
                if (i === 0) {                                                          // - Устанавливаем по дефолту выбранный первый элемент
                    fieldControl.setAttribute('checked', '');
                }

                fieldControl.setAttribute('value', radioItem.value);
                fieldControlContainer.appendChild(fieldControl);
                fieldControlContainer.appendChild(fieldControlValue);

                radioContainer.appendChild(fieldControlContainer);
            });
            fieldContainer.appendChild(radioContainer);
        }

        if (element.kind === 'check') {
            let fieldControl = document.createElement('input');
            fieldControl.setAttribute('type', 'checkbox');
            fieldControl.setAttribute('name', element.name);
            fieldControl.setAttribute('class', 'form-control');
            fieldContainer.appendChild(fieldControl);
        }

        if (element.kind === 'memo') {
            let fieldControl = document.createElement('textarea');
            fieldControl.setAttribute('name', element.name);
            fieldControl.setAttribute('class', 'form-control');
            fieldContainer.appendChild(fieldControl);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    createForm(formDef1);
});










