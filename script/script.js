'use strict';

//кнопка Перезвоните мне
const popupCall = () => {
  const popup = document.querySelector('.popup'),
    popupBtn = document.querySelectorAll('.call-btn'),
    popupContent = document.querySelector('.popup-content');
  let startPoint = -400;
  let setAnimation;

  const popupBegin = () => {

    let width = document.documentElement.clientWidth;
    setAnimation = requestAnimationFrame(popupBegin);
    startPoint += 15;
    popupContent.style.top = startPoint + 'px';

    if (startPoint > (width / 25)) {
      cancelAnimationFrame(setAnimation);
    }
  };

  popupBtn.forEach((elem) => {

    elem.addEventListener('click', () => {

      let width = document.documentElement.clientWidth;
      // модальное окно открыватся без анимации на смарфтонах
      if (width > 768) {
        popup.style.display = 'block';
        popupBegin();
      } else {
        popup.style.display = 'block';
      }
    });
  });

  popup.addEventListener('click', (event) => {
    let target = event.target;
    if (target.classList.contains('popup-close')) {
      popup.style.display = 'none';
    } else {
      target = target.closest('.popup-content');
      if (!target) {
        popup.style.display = 'none';
      };
    }

  });

};
popupCall();

//форма отправки 
const sendForm = () => {

  const errorMessage = 'Ошибка',
    loadMessage = `<div class="sk-rotating-plane"></div>`,//'Идет отправка...',
    successMessage = 'Отправлено';

  const form1 = document.getElementById('form1'),
    form2 = document.getElementById('form2');


  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = `font-size: 2rem;`;

  const validePhone = (form) => {
    if (form.querySelector('.phone-user')) {

      form.querySelector('.phone-user').addEventListener('input', (e) => e.target.value = e.target.value.replace(/(?<!^)\+|[^\d+]/g, ''));

      form.querySelector('.phone-user').addEventListener('input', (e) => {
        if (e.target.value.length < 5 || e.target.value.length > 20) form.querySelector('button').setAttribute("disabled", "disabled");
        else form.querySelector('button').removeAttribute("disabled");
      });
    }
    if (form.querySelector('.name_2')) {
      form.querySelector('.name_2').addEventListener('input', (e) => e.target.value = e.target.value.replace(/[^а-яА-Я ]/g, ''));
    }
  };
  validePhone(form1);
  validePhone(form2);


  form1.addEventListener('submit', e => {
    e.preventDefault();
    form1.appendChild(statusMessage);
    statusMessage.innerHTML = loadMessage;
    const formData = new FormData(form1);
    let body = {};
    formData.forEach((value, key) => body[key] = value);
    postData(body)
      .then((response) => {
        if (response.status !== 200) throw new Error('status network not 200')
        statusMessage.innerHTML = successMessage;
        setTimeout(() => statusMessage.innerHTML = '', 3000);
      })
      .catch(error => { console.error(error); statusMessage.innerHTML = errorMessage; setTimeout(() => statusMessage.innerHTML = '', 3000); });

    form1.querySelectorAll('input').forEach(item => item.value = '');
  });


  form2.addEventListener('submit', e => {
    e.preventDefault();
    form2.appendChild(statusMessage);
    statusMessage.innerHTML = loadMessage;
    const formData = new FormData(form2);
    let body = {};
    formData.forEach((value, key) => body[key] = value);
    postData(body)
      .then((response) => {
        if (response.status !== 200) throw new Error('status network not 200')
        statusMessage.innerHTML = successMessage;
        setTimeout(() => statusMessage.innerHTML = '', 3000);
      })
      .catch(error => { console.error(error); statusMessage.innerHTML = errorMessage; setTimeout(() => statusMessage.innerHTML = '', 3000); });

    form2.querySelectorAll('input').forEach(item => item.value = '');
  });


  //отправка данных на сервер
  const postData = (body) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  };
};

sendForm();


//Аккордеон 1я форма
const accordionForm = () => {
  let clicked = ''; //переменная для сохранения закрывающегося элемента
  document.addEventListener('click', e => {
    // const targetId = e.target.getElementById('#accordion-two') || ''; // достаем id элемента
    const targetId = e.targetconst.getAttribute('accordion-two') || '';
    if (!targetId)

      return // если его нет, выходим из скрипта

    const target = document.getElementById(targetId); // ссылка на сам элемент

    if (clicked && clicked !== target) clicked.classList.remove('open');

    //если это не первое открытие и не 2ой раз открывается текущий, то скрываем
    target.classList.add('open');

    clicked = target //сохраняем ссылку в замыкании
  });
};
accordionForm();

//Конструктор-калькулятор в виде аккордеона 

const accordionCalc = () => {
  let clicked = '';
  document.addEventListener('click', e => {
    const targetId = e.target.getElementById('accordion') || '';

    if (!targetId)

      return

    const target = document.getElementById(targetId);

    if (clicked && clicked !== target) clicked.classList.remove('open');


    target.classList.add('open');

    clicked = target
  });
};


accordionCalc();
