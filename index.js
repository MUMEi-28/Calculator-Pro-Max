const calculator = document.getElementById("calculator");
const hiddenButtonsArray = document.querySelectorAll(".hiddenFeatures");



// START WITH AN ADVANCE CALCULATOR
/* calculator.classList.replace("normal", "advance");

hiddenButtonsArray.forEach(button =>
{
    setTimeout(() =>
    {
        button.style.opacity = "1";
        button.style.transform = "scale(1)";
    }, 10);

    button.classList.remove("removeDisplay");
});
 */

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


        /*  if (display.value === "ERROR")
         {
             display.value = "0";
         }
  */
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


        console.log("RAW: " + display.value);

        // Balance the parenthesis
        const openParentheses = (display.value.match(/\(/g) || []).length;
        const closeParenthesis = (display.value.match(/\)/g) || []).length;
        // Count how many open parenthesis there are

        if (openParentheses > 0)
        {
            // Subtract the closing to opening to make sure if the user added a closing or not
            display.value += ')'.repeat(openParentheses - closeParenthesis);
            console.log("BALANCED: " + display.value);

            // [\b] string boundary
            // Replace sin cos tan to math functions
            display.value = display.value
                .replace(/\bsin\s*\(/g, "Math.sin(")
                .replace(/\bcos\s*\(/g, "Math.cos(")
                .replace(/\btan\s*\(/g, "Math.tan(");

            console.log("FINAL VALUE: " + display.value);
        }

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




// TOP BUTTONS REGION START

const mainCalculatorButton = document.getElementById("mainCalculator");
const moreCalculatorButton = document.getElementById("moreCalculator");


const mainPanel = document.getElementById("mainPanel")
const morePanel = document.getElementById("morePanel")

mainCalculatorButton.addEventListener("click", function ()
{
    // Update the buttons style
    mainCalculatorButton.classList.add("current");
    moreCalculatorButton.classList.remove("current");

    // Update the panels
    morePanel.classList.add("hideCurrentPanel")
    mainPanel.classList.remove("hideCurrentPanel");
});
moreCalculatorButton.addEventListener("click", function ()
{
    // Update the buttons style
    moreCalculatorButton.classList.add("current");
    mainCalculatorButton.classList.remove("current");


    // Update the panels
    mainPanel.classList.add("hideCurrentPanel")
    morePanel.classList.remove("hideCurrentPanel");

});



// TOP BUTTONS REGION END



/* || AGE CALCULATOR */


document.getElementById("calculateAge").addEventListener("click", function ()
{
    CalculateAge();
});

// Call it to make sure the current is at the latest as always
CalculateAge();
function CalculateAge()
{
    const currentDate = document.getElementById("currentDate");
    const birthDate = document.getElementById("birthDate");

    birthDate.defaultValue = "2004-01-21";
    currentDate.defaultValue = "2024-04-13";

    const [birthYear, birthMonth, birthDay] = birthDate.value.split('-');
    const [currentYear, currentMonth, currentDay] = currentDate.value.split("-");

    // Update the age section
    document.getElementById("ageCalculation").innerHTML = currentYear - birthYear;
    document.getElementById("ageMonthCalculation").innerHTML = (currentMonth - birthMonth) + " Months | " + (birthDay - currentDay) + " Days";

    // Update the next bday section
    document.getElementById("dayOfTheWeekCalculation").innerHTML = getDayOfWeek(birthDate.value);
    document.getElementById("nextBydayMonthCalculation").innerHTML = ((birthMonth - currentMonth) + 12) + " Months | " + (Math.abs((currentDay - birthDay) - currentDay)) + " Days";



    // Calculate the total number of months
    let yearsInMonths = (currentYear - birthYear) * 12;
    let monthsInAge = currentMonth - birthMonth;

    // If current month is before the birth month, subtract 1 year (12 months)
    if (monthsInAge < 0)
    {
        yearsInMonths -= 12;
        monthsInAge += 12; // Adjust months
    }

    // Calculate total months
    let totalMonths = yearsInMonths + monthsInAge;

    // Adjust for days: If the current day is before the birth day, subtract 1 month
    if (currentDay < birthDay)
    {
        totalMonths--;
    }


    const birthDateObj = new Date(birthYear, birthMonth - 1, birthDay); // Month is 0-based
    const currentDateObj = new Date(currentYear, currentMonth - 1, currentDay);

    // Calculate the difference in time (milliseconds)
    const timeDifference = currentDateObj - birthDateObj;

    // Convert time difference from milliseconds to days
    const totalDays = Math.floor(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days

    // Calculate total weeks
    const totalWeeks = Math.floor(totalDays / 7); // Divide total days by 7


    let remainingDays = totalDays - (totalMonths * 30);

    // Calculate total hours and minutes
    const totalHours = Math.floor(timeDifference / (1000 * 3600)); // Convert milliseconds to hours
    const totalMinutes = Math.floor(timeDifference / (1000 * 60)); // Convert milliseconds to minutes


    // Update the summary
    document.getElementById("yearSummary").innerHTML = currentYear - birthYear;
    document.getElementById("monthSummary").innerHTML = totalMonths;
    document.getElementById("weekSummary").innerHTML = totalWeeks;
    document.getElementById("daySummary").innerHTML = totalDays;
    document.getElementById("hourSummary").innerHTML = totalHours;
    document.getElementById("minuteSummary").innerHTML = totalMinutes;

}
// Get the date of the week   
function getDayOfWeek(dateString)
{
    const date = new Date(dateString); // Convert the date string to a Date object
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[date.getDay()]; // Get the day of the week and return it
}


