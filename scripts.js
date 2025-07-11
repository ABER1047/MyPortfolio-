// MainBackground
const mainBackground = document.querySelector('.MainBackground');
const spaceBackground = document.querySelector(".SpaceBackground");


// 모든 리소스 로드된 후 실행
window.addEventListener('load', function()
{
    // 메인 배경색을 변경
    mainBackground.classList.add('MainBackground--loaded');
    
    //별 배경 생성
    var space_width = spaceBackground.offsetWidth;
    var space_height = spaceBackground.offsetHeight;

    //다이아몬드 별 기본 세팅값
    var diamond_stars_shape_info = [
        { points1 : "16,2 20,16 16,30 12,16", points2 : "2,16 16,12 30,16 16,20" },
        { points1 : "16,4 19,16 16,28 13,16", points2 : "4,16 16,13 28,16 16,19" },
        { points1 : "16,6 18,16 16,26 14,16", points2 : "6,16 16,14 26,16 16,18" }
    ];

    var diamond_stars_num = irandom_range(3, 7)*round(Math.max(space_width,space_height)/800);
    var circle_stars_num = 20*round(Math.max(space_width,space_height)/800);
    var movingStars = []; // 별 객체

    
    // 별 생성 function
    function create_star(star_type)
    {
        var left = irandom_range(0, 1000) / 10;
        var top = irandom_range(0, 1000) / 10;

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        if (star_type)
        {
            var size = 12 * irandom_range(60, 130) / 100; // 7.2~15.6px
            var angle = irandom_range(0, 359);
            var shape = diamond_stars_shape_info[irandom_range(0, diamond_stars_shape_info.length - 1)];

            svg.setAttribute("class", "diamond-star");
            svg.setAttribute("width", size);
            svg.setAttribute("height", size);
            svg.setAttribute("viewBox", "0 0 32 32");
            svg.style.left = left + "%";
            svg.style.top = top + "%";
            svg.style.transform = "rotate(" + angle + "deg)";
            svg.style.animationDelay = (irandom_range(0, 270) / 100) + "s";

            var poly1 = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            poly1.setAttribute("points", shape.points1);
            poly1.setAttribute("fill", "#e9e7ea");
            svg.appendChild(poly1);

            var poly2 = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            poly2.setAttribute("points", shape.points2);
            poly2.setAttribute("fill", "#e9e7ea");
            svg.appendChild(poly2);

            spaceBackground.appendChild(svg);

            // 랜덤 방향/속도
            var speed = irandom_range(1, 100) / 1000; // 0.10~1.00 px/frame
            var dir = irandom_range(0, 359) * Math.PI / 180;
            var vx = Math.cos(dir) * speed;
            var vy = Math.sin(dir) * speed;

            movingStars.push({
                el : svg,
                type : "diamond",
                size : size,
                angle : angle,
                x : left * space_width / 100,
                y : top * space_height / 100,
                vx : vx,
                vy : vy
            });
        }
        else
        {
            var size = irandom_range(10, 25) / 10; // 1.0~2.5px
            var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("class", "circle-star");
            svg.setAttribute("width", size);
            svg.setAttribute("height", size);
            svg.style.left = left + "%";
            svg.style.top = top + "%";
            svg.style.animationDelay = (irandom_range(0, 300) / 100) + "s";

            var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", size / 2);
            circle.setAttribute("cy", size / 2);
            circle.setAttribute("r", size / 2);
            circle.setAttribute("fill", "#fff");
            circle.setAttribute("opacity", irandom_range(70, 95) / 100);
            svg.appendChild(circle);

            spaceBackground.appendChild(svg);

            // 랜덤 방향/속도
            var speed = irandom_range(1, 100) / 1000;
            var dir = irandom_range(0, 359) * Math.PI / 180;
            var vx = Math.cos(dir) * speed;
            var vy = Math.sin(dir) * speed;

            movingStars.push
            ({
                el : svg,
                type : "circle",
                size : size,
                x : left * space_width / 100,
                y : top * space_height / 100,
                vx : vx,
                vy : vy
            });
        }
    }

    // 다이아몬드 별 생성
    for (var i = 0; i < diamond_stars_num; i++)
    {
        create_star(true);
    }
    
    // 원형 별 생성
    for (var i = 0; i < circle_stars_num; i++)
    {
        create_star(false);
    }

    // 별 이동 및 wrap-around
    function move_stars()
    {
        for (var i = 0; i < movingStars.length; i++)
        {
            var star = movingStars[i];
            star.x += star.vx;
            star.y += star.vy;

            var limit = 2 * star.size;

            // x축 wrap
            if (star.x < -limit)
            {
                star.x = space_width + limit + (star.x + limit);
            }
            else if (star.x > space_width + limit)
            {
                star.x = -limit + (star.x - (space_width + limit));
            }

            // y축 wrap
            if (star.y < -limit)
            {
                star.y = space_height + limit + (star.y + limit);
            }
            else if (star.y > space_height + limit)
            {
                star.y = -limit + (star.y - (space_height + limit));
            }

            // 위치 적용
            var leftPercent = (star.x / space_width) * 100;
            var topPercent = (star.y / space_height) * 100;

            if (star.type === "diamond")
            {
                star.el.style.left = leftPercent + "%";
                star.el.style.top = topPercent + "%";
                star.el.style.transform = "rotate(" + star.angle + "deg)";
            }
            else
            {
                star.el.style.left = leftPercent + "%";
                star.el.style.top = topPercent + "%";
            }
        }
        requestAnimationFrame(move_stars);
    }
    move_stars();
    
    debug_log("loaded!");
});