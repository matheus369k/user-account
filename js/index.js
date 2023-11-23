document.getElementById("btn_confirm").addEventListener("click", () => {
    const verification = ["correct", "correct"]

    const inputEmail = document.querySelectorAll("input")[0]

    const inputSenha = document.querySelectorAll("input")[1]

    console.log(inputEmail.value.slice(inputEmail.value.length - 10, inputEmail.value.length) === '@gmail.com',Number(inputEmail.value.length) > 13);
    

    if (inputEmail.value.slice(inputEmail.value.length - 10, inputEmail.value.length) === '@gmail.com' && Number(inputEmail.value.length) > 13) {
        inputEmail.style.backgroundColor = "rgba(10, 10, 60, .5)"
        verification[0] = "correct"
    } else {
        inputEmail.style.backgroundColor = "rgba(100, 30, 20, 0.5)"
        verification[0] = "error"
    }
    if (inputSenha.value.length >= 8) {
        inputSenha.style.backgroundColor = "rgba(10, 10, 60, .5)"
        verification[1] = "correct"
    } else {
        inputSenha.style.backgroundColor = "rgba(100, 30, 20, 0.5)"
        verification[1] = "error"
    }

    //console.log(verification[1].indexOf("correct") !== -1,verification[0].indexOf("correct") !== -1);
    if (!verification[0].indexOf("correct") && !verification[1].indexOf("correct")) {
        creatorDivConfirmation(inputEmail);
    }

})

function creatorDivConfirmation(inputEmail) {
    const loginContainer = document.body.childNodes[1];

    loginContainer.parentNode.removeChild(loginContainer);

    const div = document.createElement("div");
    div.setAttribute("class", "Conteiner_confirmation_Msg");
    div.setAttribute("id", "confirmation_msg");

    document.body.appendChild(div);

    const newConteiner = document.getElementById("confirmation_msg");

    const img = document.createElement("img");
    img.setAttribute("class", "Conteiner_confirmation_Msg_img");
    img.setAttribute("src", "./img/PAIMON.gif");

    newConteiner.appendChild(img);

    const h1 = document.createElement("h1");
    h1.setAttribute("class", "Conteiner_confirmation_Msg_h1");

    newConteiner.appendChild(h1);

    document.querySelector(".Conteiner_confirmation_Msg_h1").innerHTML = "Login Bem Sucedido!";

    const p = document.createElement("p");
    p.setAttribute("class", "Conteiner_confirmation_Msg_p");

    newConteiner.appendChild(p);

    const pText = document.querySelector(".Conteiner_confirmation_Msg_p")


    pText.innerHTML = `Bem-vindo, Você recebera gemas na sua conta do genshin viculado ao Email: `;

    const span = document.createElement("span")
    span.setAttribute("class", "Conteiner_confirmation_Msg_p_span")

    document.querySelector(".Conteiner_confirmation_Msg_p").appendChild(span)

    document.querySelector(".Conteiner_confirmation_Msg_p_span").innerHTML=`${inputEmail.value}.`

    pText.appendChild(span)

    pText.innerHTML+=" Agradecemos pela escolha do nosso site."
}

