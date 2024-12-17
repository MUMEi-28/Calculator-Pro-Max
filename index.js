const calculator = document.getElementById("calculator");
const hiddenButtonsArray = document.querySelectorAll(".hiddenFeatures");



// START WITH AN ADVANCE CALCULATOR
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


// Changes the view mode
document.getElementById("toggleLandscape").addEventListener('click', function ()
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



function OnClickFunctions(functionKey)
{
    if (isStartingZeroValue)
    {
        isStartingZeroValue = false;

        display.value = display.value.slice(0, -1);
        display.value += functionKey;
    }
    else
    {
        display.value += functionKey;
    }
}

function OnClickParenthesis(input)
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
        // If [+-/%*] is the last value then remove the last value
        if (/[/*%+-]$/.test(display.value))
        {
            display.value = display.value.slice(0, -1);

            console.log("REMOVED LAST OPERATOR");
        }



        // Change all periods to zero if the input is like this [+.+.+.] [-.-.-.] [%.%.%.%]
        if (/([*/%+-]\.)/.test(display.value))
        {
            display.value = display.value.replace(/([^0-9])\./g, "$1" + "0");

            console.log("REPLACED ALL PATTERNED PERIODS TO 0");
        }


        console.log(display.value);
        // [\b] string boundary
        // Replace sin cos tan to math functions
        display.value = display.value.replace(/\bsin\b/g, "Math.sin")
            .replace(/\bcos\b/g, "Math.cos")
            .replace(/\btan\b/g, "Math.tan");

        console.log(display.value);

        display.value = eval(display.value);
    }
    catch (error)
    {
        display.value = "ERROR";
    }

}
function OnClickOperators(operator)
{
    isStartingZeroValue = false;
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


// ADVANCE CALCULATOR REGION START

// Change sin cos tan buttons
let isOnSecond = false;
document.getElementById("second").addEventListener("click", function ()
{

    if (isOnSecond)
    {
        isOnSecond = false;
        document.getElementById("sin").innerHTML = "sin";
        document.getElementById("cos").innerHTML = "cos";
        document.getElementById("tan").innerHTML = "tan";
    } else
    {
        isOnSecond = true;
        document.getElementById("sin").innerHTML = "sin<sup>-1</sup>";
        document.getElementById("cos").innerHTML = "cos<sup>-1</sup>";
        document.getElementById("tan").innerHTML = "tan<sup>-1</sup>";
    }
    console.log(isOnSecond);
}
);

// ADVANCE CALCULATOR REGION END