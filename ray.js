class Ray
{
    constructor(pos, angle)
    {
        this.pos = pos
        this.dir = Vector.fromAngle(angle);
    }

    lookAt(x,y)
    {
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir = Vector.Normalise(this.dir);
    }

    cast(wall)
    {
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;
        
        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        if (den == 0)
        {
            return;
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        if (0 < t && t < 1 && u > 0)
        {
            const pt = new Vector(0,0);
            pt.x = x1 + t*(x2-x1);
            pt.y = y1 + t * (y2-y1);
            return pt;
        }
        return;

    }

    draw(ctx)
    {
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(this.pos.x,this.pos.y);
        ctx.lineTo(this.pos.x + this.dir.x * 10,this.pos.y + this.dir.y * 10);
        ctx.stroke();
    }
}