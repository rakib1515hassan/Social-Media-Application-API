let switcherBtns = document.querySelectorAll('.switcher a');
let sections = document.querySelectorAll('.sec');
switcherBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        switcherBtns.forEach((btn) => {
            btn.classList.remove('active');
        });
        btn.classList.add('active');
        let sectionName = btn.dataset.section;
        sections.forEach((sec) => {
            sec.classList.remove('active');
        });
        document.querySelector(`.${sectionName}`).classList.add('active');
    });
});