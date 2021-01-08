class Particle
{
    constructor(width,height)
    {
        this.pos = new Vector(width/2,height/2);
        this.rays = [];
        for (var i = 0; i < 360; i+= 1)
        {
            this.rays.push(new Ray(this.pos, i * Math.PI / 180));
        }
    }

    update(x,y)
    {
        this.pos.x = x;
        this.pos.y = y;
    }

    look(walls,ctx)
    {
        for (var i = 0; i < this.rays.length; i++)
        {
            let record = Infinity;
            let closest = null;

            for (let wall of walls)
            {
                const pt = this.rays[i].cast(wall);
                if (pt)
                {
                    const d = Vector.DistanceSquared(this.pos,pt);
                    if (d < record)
                    {
                        record = d;
                        closest = pt;
                    }
                }
            }
            
            if (closest)
            {
                ctx.strokeStyle = "#ffffff88";
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(this.pos.x,this.pos.y);
                ctx.lineTo(closest.x,closest.y);
                ctx.stroke();
                ctx.lineWidth = 2
            }
        }
    }

    draw(ctx)
    {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.pos.x,this.pos.y,5,0,2*Math.PI,true);
        ctx.fill();


        for (var i = 0; i < this.rays.length; i++)
        {
            this.rays[i].draw(ctx);
        }
    }
}