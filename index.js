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
var isStartingZeroValue = true;     // Remove the unexpected error number

// DEBUGGING
const allButtons = document.getElementsByTagName("button");

let lastValue;

// To re-apply all changes on button click
for (let i = 0; i < allButtons.length; i++)
{
    allButtons[i].addEventListener('click', function ()
    {
        lastValue = display.value.toString().charAt(display.value.length - 1);

    });
}


function OnClickNumbers(input)
{

    if (isStartingZeroValue)
    {
        isStartingZeroValue = false;

        display.value = display.value.slice(0, -1);
        display.value += input;
    }
    else
    {
        display.value += input;
    }
}
function ClearAll()
{
    isStartingZeroValue = true;
    hasPeriod = false;

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
        if (lastValue === ".")
        {
            // If the last value is [.] then remove period
            display.value = display.value.replace(0);

            console.log("REMOVED PERIOD");

            // Reupdate the last value again
            lastValue = display.value.charAt(display.value.length - 1);

            if (lastValue === "-" ||
                lastValue === "/" ||
                lastValue === "+" ||
                lastValue === "*" ||
                lastValue === "%"
            )
            {
                // If there is an operator after [.] then remove operator too
                display.value = display.value.slice(0, -1);
                console.log("REMOVED OPERATOR WITH PERIOD");
            }
        }
        // Don't include [-=/*%] on the evaluation
        else if (lastValue === "-" ||
            lastValue === "/" ||
            lastValue === "+" ||
            lastValue === "*" ||
            lastValue === "%"
        )
        {
            // Remove any operators first before evaluating
            display.value = display.value.slice(0, -1);
            console.log("REMOVED OPERATOR ONLY");
        }

        display.value = eval(display.value);


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