package servlets;
public class Point {
    private double x;
    private int y;
    private int r;
    private boolean hit;
    private long time;
    public Point(double x, int y, int r, boolean hit, long time) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
        this.time = time;
    }
    public double getX() {
        return this.x;
    }
    public int getY() {
        return this.y;
    }
    public int getR() {
        return this.r;
    }
    public boolean getHit() {
        return this.hit;
    }
    public long getTime() {
        return this.time;
    }
    public void setTime(Long time) {
        this.time = time;
    }
}