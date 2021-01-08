
let DegreeSeparation = 1;
class Particle
{
    constructor(width,height)
    {
        this.fov = 60;
        this.pos = new Vector(width/2,height/2);
        this.rays = [];
        this.heading = 0;
        for (var i = -this.fov/2; i < this.fov/2 /*360*/; i+= DegreeSeparation)
        {
            this.rays.push(new Ray(this.pos, i * Math.PI / 180));
        }
    }

    updateFOV(fov)
    {
        this.fov = fov;
        this.rays = [];
        for (var i = -this.fov/2; i < this.fov/2 /*360*/; i+= DegreeSeparation)
        {
            this.rays.push(new Ray(this.pos, (i+this.heading) * Math.PI / 180));
        }
    }

    move(x)
    {
        let v = Vector.fromAngle(this.heading * Math.PI / 180);
        v = Vector.Scale(v,x);
        this.pos = Vector.Add(this.pos,v);
        for (var i = 0; i < this.rays.length; i++)
        {
            this.rays[i].pos = this.pos;
        }
    }

    rotate(angle)
    {
        this.heading += angle;
        var index = 0;
        for (var i = -this.rays.length/2; i < this.rays.length/2; i+= DegreeSeparation)
        {
            this.rays[index].setAngle((i+this.heading)* Math.PI / 180);
            index++;
        }
    }

    update(x,y)
    {
        this.pos.x = x;
        this.pos.y = y;
    }

   

    look(walls,ctx)
    {
        let tempscene = [];
        for (var i = 0; i < this.rays.length; i++)
        {
            let record = Infinity;
            let closest = null;

            for (let wall of walls)
            {
                const pt = this.rays[i].cast(wall);
                if (pt)
                {
                    let d = Vector.Distance(this.pos,pt);
                    const a = Vector.GetAngle(this.rays[i].dir) - this.heading * Math.PI / 180;
                    d *= Math.cos(a);
                    if (d < record)
                    {
                        record = d;
                        closest = pt;
                    }
                }
            }
            
            if (closest)
            {
                ctx.strokeStyle = "#ffffff33";
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(this.pos.x,this.pos.y);
                ctx.lineTo(closest.x,closest.y);
                ctx.stroke();
                ctx.lineWidth = 2
            }
            tempscene[i] = record;
        }
        return tempscene;
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