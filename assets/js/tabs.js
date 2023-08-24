const buttonGrid = document.getElementById('pills-home-tab');
const buttonList = document.getElementById('pills-profile-tab');
const buttonMap = document.getElementById('pills-contact-tab');

const div = document.getElementById('pills-contact');
const divPagination = document.getElementById('pagination-col');


buttonMap.addEventListener('click', function() {
    div.classList.remove('initialMap');

    divPagination.style.display = 'none';
});

buttonList.addEventListener('click', function() {
    divPagination.style.display = 'block';
});
buttonGrid.addEventListener('click', function() {
    divPagination.style.display = 'block';
});