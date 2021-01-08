class Boundary
{
    constructor(x1,y1,x2,y2)
    {
        this.a = new Vector(x1,y1);
        this.b = new Vector(x2,y2);
    }

    draw(ctx)
    {
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(this.a.x,this.a.y);
        ctx.lineTo(this.b.x,this.b.y);
        ctx.stroke();
    }
}