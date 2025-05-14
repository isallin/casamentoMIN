document.addEventListener('DOMContentLoaded', function() {
    //----- MENU -----//
    class MobileNavbar {
        constructor(mobileMenu, navList, navLinks){
            this.mobileMenu = document.querySelector(mobileMenu);
            this.navList = document.querySelector(navList);
            this.navLinks = document.querySelectorAll(navLinks);
            this.activeClass = 'active';
            this.handleClick = this.handleClick.bind(this);
        }
        animateLinks() {
            this.navLinks.forEach((link, index)=>{
                link.style.animation ? link.style.animation = '' : link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            });
        }
        handleClick() {
            this.navList.classList.toggle(this.activeClass);
            this.mobileMenu.classList.toggle(this.activeClass);
            this.animateLinks();
        }
        addClickEvent() {
            this.mobileMenu.addEventListener("click", this.handleClick);
        }
        init() {
            if (this.mobileMenu) this.mobileMenu.addEventListener("click", this.handleClick);
            return this;
        }
    }
    const mobileNavbar = new MobileNavbar(".mobileMenu", ".header__menu-link", ".header__menu-link-item");
    mobileNavbar.init();
    //----- MENU ATIVO -----//
    const activePage = window.location.pathname;
    const navLinks = document.querySelectorAll('.menuText').forEach((link)=>{
        if (link.href.includes(`${activePage}`)) {
            link.classList.add('active');
            console.log(link);
        }
    });
    //----- CONTAGEM REGRESSIVA -----//
    const dataDoEvento = new Date("Aug 9, 2025 00:00:00").getTime();
    const contaHoras = setInterval(function() {
        const agora = new Date().getTime();
        const distanciaAteEvento = dataDoEvento - agora;
        if (distanciaAteEvento < 0) {
            clearInterval(contaHoras);
            const contador = document.getElementById('contador');
            if (contador) contador.innerHTML = 'Evento Expirado';
            [
                'dias',
                'horas',
                'minutos',
                'segundos'
            ].forEach((id)=>{
                const elemento = document.getElementById(id);
                if (elemento) elemento.style.display = 'none';
            });
            return;
        }
        const diaEmMs = 86400000;
        const horaEmMs = 3600000;
        const minutoEmMs = 60000;
        const segundoEmMs = 1000;
        const diasAteEvento = Math.floor(distanciaAteEvento / diaEmMs);
        const horasAteEvento = Math.floor(distanciaAteEvento % diaEmMs / horaEmMs);
        const minutosAteEvento = Math.floor(distanciaAteEvento % horaEmMs / minutoEmMs);
        const segundosAteEvento = Math.floor(distanciaAteEvento % minutoEmMs / segundoEmMs);
        const atualizaElemento = (id, valor)=>{
            const elemento = document.getElementById(id);
            if (elemento) elemento.innerHTML = valor;
        };
        atualizaElemento('dias', diasAteEvento);
        atualizaElemento('horas', horasAteEvento);
        atualizaElemento('minutos', minutosAteEvento);
        atualizaElemento('segundos', segundosAteEvento);
    }, 1000);
});
const scriptURL = 'https://script.google.com/macros/s/AKfycbxs2f9BJ1VtqKoeL3gakdpoWZIKhPBnHHUN0W4rJgK9EcWnwymvz1FyWlbJv05quQjJ/exec';
const form = document.forms['contact-form'];
form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const presenca = document.querySelector('input[name="presenca"]:checked')?.value; // Garantir que o valor do radio seja capturado
    const formData = new FormData(form);
    formData.set('presenca', presenca); // Substituir o valor de 'presenca' pela escolha do usuário
    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            alert("Obrigado! Sua presen\xe7a foi confirmada.");
            form.reset();
        } else alert("Ocorreu um erro ao enviar o formul\xe1rio. Por favor, tente novamente.");
    } catch (error) {
        console.error('Erro!', error);
        alert("Erro na conex\xe3o. Por favor, tente novamente.");
    }
});

//# sourceMappingURL=indexCerimonia.f75de5e1.js.map
