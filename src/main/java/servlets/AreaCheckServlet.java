package servlets;

import com.google.gson.Gson;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@WebServlet("/areaCheckServlet")
public class AreaCheckServlet extends HttpServlet {
    private final List<Integer> yValues = Arrays.asList(-4, -3, -2, -1, 0, 1, 2, 3, 4);
    private final List<Integer> rValues = Arrays.asList(1, 2, 3, 4, 5);
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        long time = System.currentTimeMillis();
        ServletContext servletContext = getServletContext();
        Gson gson = new Gson();
        PrintWriter writer = resp.getWriter();
        try {
            double x = Double.parseDouble(req.getParameter("x"));
            int y = Integer.parseInt(req.getParameter("y"));
            int r = Integer.parseInt(req.getParameter("r"));
            if (!checkParams(x, y, r)) throw new NumberFormatException();
            Point point = new Point(x, y, r, checkInArea(x, y, r), System.currentTimeMillis() - time);
            savePoint(point, servletContext);
            resp.setContentType("application/json");
            writer.print(gson.toJson(point));
            writer.flush();        }
        catch (NullPointerException exception) {
            writer.print(exception);        }
        catch (NumberFormatException exception) {
            writer.print(exception);        }
    }
    private boolean checkParams(double x, int y, int r) {
        return x >= -3.0 && x <= 3.0 && yValues.contains(y) && rValues.contains(r);
    }
    private boolean checkInArea(Double x, Integer y, Integer r) {
        double newR = Double.parseDouble(r.toString());
        return (x <= 0 && y >= 0 && y <= (r / 2) && Math.abs(x) <= r) || (x >= 0 && y >= 0 && (x + y <= newR)) || (x >= 0 && y <= 0 && (x * x + y * y <= newR * newR));    }
    private void savePoint(Point p, ServletContext servletContext) {
        synchronized (servletContext) {
            if (servletContext.getAttribute("history") == null) {
                servletContext.setAttribute("history", new ArrayList<Point>());
            }
            ArrayList<Point> history = (ArrayList<Point>) servletContext.getAttribute("history");
            history.add(p);
            servletContext.setAttribute("history", history);
        }
    }
}
