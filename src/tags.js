//a set of tags for the html part of the project
const makeDiv = (id, cls) => {
    const box = document.createElement('div');
    box.setAttribute('id', id);
    box.classList.add(cls);
    return box;
}

const makePar = (cls) => {
    let p = document.createElement('p');
    p.classList.add(cls);
    return p;
}

const makeBtn = (cls, txt, id) => {
    let btn = document.createElement('button');
    btn.classList.add(cls);
    btn.textContent = txt;
    btn.setAttribute('id', id)
    return btn;
}

const makeDropDown = (id, name) => {
    let select = document.createElement('select');
    select.name = name;
    select.setAttribute('id', id);

    const addOption = (val, txt) => {
        let option = document.createElement('option');
        option.value = val;
        option.textContent = txt;
        select.appendChild(option);
    }

    return {
        select,
        addOption
    }
}

const makeForm = (cls) => {
    let form = document.createElement('form');
    form.classList.add(cls);
    return form;
}

const makeInput = (id, type, name) => {
    let input = document.createElement('input');
    input.setAttribute('id', id)
    input.type = type;
    input.name = name;

    const makeRequired = () => {
        input.setAttribute('required', '');
    }

    return {
        input,
        makeRequired
    }
}

const makeLabel = (fr, cls, txt) => {
    let label = document.createElement('label');
    label.for = fr;
    label.textContent = txt;
    label.classList.add(cls);
    return label;
}

// make a fn to make fa fa icons
const makeItalic = (cls) => {
    const it = document.createElement('i');
    it.classList.add(cls);
    return it;
}

export {
    makeDiv,
    makePar,
    makeBtn,
    makeDropDown,
    makeForm,
    makeInput,
    makeLabel,
    makeItalic

}
