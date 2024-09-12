import { game } from "./game";

const newGameButtonElement = document.getElementById("new-game");
const inputElement = document.getElementById("word");
const errorElement = document.getElementById("error");
const streakElement = document.getElementById("streak");

newGameButtonElement.addEventListener("click", function()
{
    game.newGame();
    const lettersElement = document.querySelectorAll(".square");

    for(let i = 0; i < lettersElement.length; i++)
    {
        lettersElement[i].innerHTML = game.letters[i].toUpperCase();
    }

    inputElement.disabled = false;
    inputElement.value = "";
    inputElement.focus();
    errorElement.style.visibility = "hidden";
    streakElement.innerHTML = "";
});

document.getElementById('form').addEventListener('submit', async function(event)
{
    event.preventDefault();

    const formData = new FormData(event.target);
    const word = formData.get("word");

    const isWordValid = await game.validateWord(word);
    if (isWordValid)
    {
        streakElement.innerHTML = game.streak;
        errorElement.style.visibility = "hidden";
        inputElement.value="";
    }
    else
    {
        errorElement.style.visibility = "visible";
    }
});