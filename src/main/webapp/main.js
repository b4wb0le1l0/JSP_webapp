const rDefault = 90
const zeroGraphic = 125
const acceptableY = [-4, -3, -2, -1, 0, 1, 2, 3, 4]
const acceptableR = ["1", "2", "3", "4", "5"]

function invalidX() {
    let x = document.getElementById("x").value;

    if (x === "-" || x === "0") {
        return;
    }

    if ((x < 0 && x.length > 4) || (x > 0 && x.length > 3)) {
        document.getElementById("x").value = "";
    }

    if (parseInt(x)) {
        if (x >= -3 && x <= 3) {
            document.getElementById("x").setAttribute("style", "border: 2px green solid");
        } else {
            document.getElementById("x").setAttribute("style", "border: 2px red solid");
            document.getElementById("x").value = "";
        }
    } else {
        document.getElementById("x").setAttribute("style", "border: 2px red solid");
        document.getElementById("x").value = "";
    }
}
function checkBoxes() {
    let checkboxes = document.querySelectorAll(".required_checkbox");
    let isChecked = false;
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            isChecked = true;
        }
    });
    return isChecked
}

function uncheckOthers(currentCheckbox) {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        if (checkbox !== currentCheckbox) {
            checkbox.checked = false;
        }
    });
}

function checkX() {
    let x = document.getElementById("x").value;
    if (x === "-") {
        alert("X не может быть \"-\"");
        return false;
    }
}

function makeForm(e) {
    if (checkBoxes()) {
        let image = document.getElementById("canvas");
        let imageBorders = image.getBoundingClientRect();
        let r = getR();
        let xCoordinate = e.clientX - imageBorders.left;
        let yCoordinate = e.clientY - imageBorders.top;
        let x = (xCoordinate - zeroGraphic) / rDefault * r;
        let y = parseInt(((zeroGraphic - yCoordinate) / rDefault * r).toFixed(1));

        console.log(y)

        if (x >= -3 && x <= 3 && acceptableY.includes(y)) {
            document.getElementById("x").value = x.toString();
            document.getElementById("y").value = y;
        } else alert("Неподходящее значение для x или y")
    } else alert("Выберите радиус");

    console.log("Making form")
    tableInfo();
}

function getR() {
    let selectedR
    let checkboxes = document.querySelectorAll(".required_checkbox");
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            selectedR = checkbox.value;
        }
    });
    return selectedR
}

function clearCanvas() {
    let image = document.getElementById("canvas");
    let context = image.getContext('2d');
    context.clearRect(0, 0, image.width, image.height);
}

function drawPoint(x, y, r, hit) {
    let image = document.getElementById("canvas");
    let context = image.getContext('2d');
    let xCoordinate = zeroGraphic + x / r * rDefault;
    let yCoordinate = zeroGraphic - y / r * rDefault;
    if (hit) {
        context.fillStyle = 'rgb(173, 255, 47)'
    } else context.fillStyle = 'rgb(250, 47, 47)';
    context.strokeStyle = 'black';
    context.beginPath();
    context.arc(xCoordinate, yCoordinate, 3, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
}

function tableInfo() {    console.log("Функция tableInfo выполняется")
    let x = document.getElementById("x").value
    let y = document.getElementById("y").value
    let r = getR()

    console.log(x)
    console.log(y)
    console.log(r)

    if (x >= -3 && x <= 3 && x !== "" && acceptableY.includes(parseInt(y)) && acceptableR.includes(r)) {
        let dataToSend = {
            x: x,
            y: y,
            r: r
        };
        console.log("Запрос выполняется")
        $.ajax({
            type: "POST",
            url: contextPath + "/controllerServlet",
            data: dataToSend,
            success: function (response) {
                let time= response.time
                let x = response.x
                let y = response.y
                let r = response.r
                let result = response.result
                let newTableElement;

                document.getElementById("res_x").innerHTML = x;
                document.getElementById("res_y").innerHTML = y;
                document.getElementById("res_r").innerHTML = r;

                clearCanvas()
                drawPoint(x, y, r, result)

                document.getElementById("res_exec_time").innerHTML = time;
                document.getElementById("res_time").innerHTML = new Date().toLocaleTimeString();

                if (result) {
                    newTableElement = $("<tr class='tr'>\n" +
                        "    <td>" + x + "</td>\n" +
                        "    <td>" + y + "</td>\n" +
                        "    <td>" + r + "</td>\n" +
                        "    <td>" + time + "</td>\n" +
                        "    <td style='color:#48d848'>Hit</td>\n" +
                        "    <td> " + response.currentTime + "</td>\n" +
                        "</tr>");
                } else {
                    newTableElement = $("<tr class='tr'>\n" +
                        "    <td>" + x + "</td>\n" +
                        "    <td>" + y + "</td>\n" +
                        "    <td>" + r + "</td>\n" +
                        "    <td>" + time + "</td>\n" +
                        "    <td style='color:#dd1818'>Miss</td>\n" +
                        "    <td> " + response.currentTime + "</td>\n" +
                        "</tr>");
                }

                newTableElement.appendTo(".result")
            },
            error: function(xhr, status, error) {
                console.error("Ошибка при выполнении запроса:", status, error);
            }
        })
    }
}