const landscapeButton = document.getElementById("toggleLandscape");
const calculator = document.getElementById("calculator");
const hiddenButtonsArray = document.querySelectorAll(".hiddenFeatures");

// Changes the view mode
landscapeButton.addEventListener('click', event =>
{
    if (calculator.classList.contains("advance"))
    {
        calculator.classList.replace("advance", "normal");

        hiddenButtonsArray.forEach(button =>
        {
            setTimeout(() =>
            {
                button.style.opacity = "0";
                button.style.transform = "scale(0.4)";
            }, 10);

            button.classList.add("removeDisplay");
        });
    }
    else
    {
        calculator.classList.replace("normal", "advance");

        hiddenButtonsArray.forEach(button =>
        {
            setTimeout(() =>
            {
                button.style.opacity = "1";
                button.style.transform = "scale(1)";
            }, 10);

            button.classList.remove("removeDisplay");
        });
    }
});


const display = document.getElementById("display");
display.value = "0";

console.log(typeof display.value);

var hasPeriod = false;

// DEBUGGING
const allButtons = document.getElementsByTagName("button");

let lastValue;
for (let i = 0; i < allButtons.length; i++)
{
    allButtons[i].addEventListener('click', function ()
    {
        lastValue = display.value.toString().charAt(display.value.length - 1);
    });
}


function OnClickNumbers(input)
{
    // Remove the unexpected error number
    display.value = display.value.slice(0, -1);
    display.value += input;
}
function ClearAll()
{
    display.value = "0";
}
function Backspace()
{
    if (display.value.length > 1)
    {
        display.value = display.value.slice(0, -1);
    }
}
function Calculate()
{
    try
    {
        // Don't include [-=/*%] on the evaluation
        if (lastValue === "-" ||
            lastValue === "/" ||
            lastValue === "+" ||
            lastValue === "*" ||
            lastValue === "%"
        )
        {
            // Remove any operators first before evaluating
            display.value = display.value.slice(0, -1);
            display.value = eval(display.value);
        }
        else
        {
            display.value = eval(display.value);
        }
    }
    catch (error)
    {
        display.value = error;
    }
}
function OnClickOperators(operator)
{

    hasPeriod = false;

    // Change the last operator into the latest value to prevent this [-=/*%]
    if (lastValue === "-" ||
        lastValue === "/" ||
        lastValue === "+" ||
        lastValue === "*" ||
        lastValue === "%"
    )
    {
        display.value = display.value.toString().slice(0, -1) + operator;
        return;
    }
    // Make sure that the last value is not repeated Examples[++++. ----. ////)]
    if (lastValue !== operator)
    {
        display.value += operator;
    }
}

function AddPeriod()
{


    if (lastValue !== "." && !hasPeriod)
    {
        display.value += ".";
    }
    hasPeriod = true;
}