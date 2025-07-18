let isDegreeMode = true;  // Degree mode flag

// Function to toggle between degree and radian modes
function toggleAngle() {
    isDegreeMode = !isDegreeMode;
    document.getElementById('angleToggle').textContent = isDegreeMode ? 'Degree' : 'Radian';
}

// Function to append characters to the display
function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

// Function to clear the display
function clearDisplay() {
    document.getElementById('display').value = '';
}

// Function to evaluate the expression
function calculate() {
    let expression = document.getElementById('display').value;

    try {
        // Handle trigonometric and logarithmic functions
        expression = expression.replace(/sqrt/g, 'Math.sqrt');
        expression = expression.replace(/sin/g, 'Math.sin');
        expression = expression.replace(/cos/g, 'Math.cos');
        expression = expression.replace(/tan/g, 'Math.tan');
        expression = expression.replace(/log/g, 'Math.log10');
        expression = expression.replace(/ln/g, 'Math.log');

        // Convert degrees to radians if in degree mode
        if (isDegreeMode) {
            expression = expression.replace(/Math.sin\((.*?)\)/g, (match, p1) => {
                return `Math.sin(${p1} * Math.PI / 180)`;
            });
            expression = expression.replace(/Math.cos\((.*?)\)/g, (match, p1) => {
                return `Math.cos(${p1} * Math.PI / 180)`;
            });
            expression = expression.replace(/Math.tan\((.*?)\)/g, (match, p1) => {
                return `Math.tan(${p1} * Math.PI / 180)`;
            });
        }

        // Evaluate the expression
        let result = eval(expression);
        document.getElementById('display').value = result;
    } catch (e) {
        // Handle invalid expressions
        document.getElementById('display').value = 'Error';
    }
}