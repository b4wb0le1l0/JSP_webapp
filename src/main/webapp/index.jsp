<%@ page import="servlets.Point" %><%@ page import="java.util.ArrayList" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %><%
    ArrayList<Point> history = (ArrayList<Point>) application.getAttribute("history");%>

<html lang="en"><head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lab 2</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="main.js"></script>
</head>
<body><div class="hat">
    <header>
        <div class="hat">
        <div class="topic">
            <h1>Cheking a point on the coordinate plane</h1>
        </div>
            <div class="info">
                <h2>ФИО: Аганин Егор Владимирович</h2>
                <h2>Группа: P3233</h2>
                <h2>Вариант: 5433</h2>
            </div>
    </div>
    </header>
</div>
<div class="main_container">
    <form class="form" id="point-form" onsubmit="return checkX()">
        <div class="enter_x">
        <label for="x">Enter the coordinate X (-3 &lt;= Y &lt;= 3)</label>
            <input class="input_style" type="text" name="x" id="x" autocomplete="off" required onchange="invalidX()" onkeyup="invalidX()"><br><br>
        </div>

        <div class="enter_y">
            <p>Enter the coordinate Y</p>
            <select required class="input_style" name="y" id="y">
                <option value="-4">-4</option>
                <option value="-3">-3</option>
                <option value="-2">-2</option>
                <option value="-1">-1</option>
                <option value="0" selected="selected">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
        </div>

        <div class="enter_r">
            <div class="text">
            <p>Enter R</p>
        <label>
            <input class="required_checkbox" onclick="uncheckOthers(this)" type="checkbox" name="r" id="r" value="1">
            1
        </label>
        <label>
            <input class="required_checkbox" onclick="uncheckOthers(this)" type="checkbox" name="r" id="r2" value="2">
            2
        </label>
        <label>
            <input class="required_checkbox" onclick="uncheckOthers(this)" type="checkbox" name="r" id="r3" value="3">
            3
        </label>
        <label>
            <input class="required_checkbox" onclick="uncheckOthers(this)" type="checkbox" name="r" id="r4" value="4">
            4
        </label>
        <label>
            <input class="required_checkbox" onclick="uncheckOthers(this)" type="checkbox" name="r" id="r5" value="5">
            5
        </label>
    </div>
    <div class="button">
        <input type="submit" id="submit" value="Check">
        <input type="reset" id="reset" value="Reset">
    </div>
</div>
</form>
    <div class="slider">
        <div class="picture"> <canvas width="250px" height="250px" id="canvas" style="background-image: url('chart.jpg'); cursor: pointer"></canvas> </div>
    </div>
</div>
<div class="output">
    <script>
        $("#point-form").submit(function (event) {
        event.preventDefault();            console.log("Обработчик submit выполняется");
    });        const btn = document.getElementById("submit");
    btn.addEventListener('click', tableInfo, false);
    </script>
    <%--<script>
        $("#form-clear").submit(function (event) {
            event.preventDefault();
            console.log("Обработчик clear выполняется");
        });
        const btnClear = document.getElementById("clear");
        btnClear.addEventListener('click', clear, false);
    </script>--%>
    <script>
        const canvas = document.getElementById("canvas");
        canvas.addEventListener('click', makeForm, false);
        <% if(history != null) {
              Point lastPoint = history.get(history.size() - 1);
          %>
        drawPoint(<%=lastPoint.getX()%>, <%=lastPoint.getY()%>, <%=lastPoint.getR()%>, <%=lastPoint.getHit()%>)
        <%}%>
    </script>
    <%--<script>
        document.getElementById("info").addEventListener("submit", function (event) {
            let checkboxes = document.querySelectorAll(".required_checkbox");
            let isChecked = false;
            checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                    isChecked = true;
                }
            });
            if (!isChecked) {
                alert('Please, choose at least on option.');
                event.preventDefault();
            }
        });
    </script>--%>
    <div class="table_container">
        <table id="table" class="result">
            <thead>
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Execution time</th>
                    <th>Result</th>
                    <th>Current Date</th>
                </tr>
                <%
                    if (history != null) {
                        for (Point point : history) {
                %>
                <tr>
                    <td><%=point.getX()%>
                    </td>
                    <td><%=point.getY()%>
                    </td>
                    <td><%=point.getR()%>
                    </td>
                    <td><%=point.getTime()%>
                    </td>
                    <% if (point.getHit()) { %>
                    <td style='color:#48d848;'>Hit</td>
                    <% } else { %>
                    <td style='color:#dd1818;'>Miss</td>
                    <% } %>
                </tr>
                <% }
                }%>

                </thead>

        <script>
            let contextPath = "${pageContext.request.contextPath}";
        </script>
        <script src="main.js"></script>
        </table>
    </div>
</div>
</body>
</html>