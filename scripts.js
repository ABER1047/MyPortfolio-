// MainBackground
const mainBackground = document.querySelector('.MainBackground');
const spaceBackground = document.querySelector(".SpaceBackground");


// 모든 리소스 로드된 후 실행
window.addEventListener('load', function() 
{
    // 배경색을 변경하는 클래스 추가
    mainBackground.classList.add('MainBackground--loaded');
    
    //별 배경 생성
    var Space_width = spaceBackground.offsetWidth;
    var Space_height = spaceBackground.offsetHeight;
    
        //다이아몬드 별 기본 세팅값
        var diamond_stars_shape_info = [
            { points1 : "16,2 20,16 16,30 12,16", points2 : "2,16 16,12 30,16 16,20" },
            { points1 : "16,4 19,16 16,28 13,16", points2 : "4,16 16,13 28,16 16,19" },
            { points1 : "16,6 18,16 16,26 14,16", points2 : "6,16 16,14 26,16 16,18" }
        ];
        
        // 다이아몬드 별 생성
        var diamond_stars_num = irandom_range(3, 7)*round(Math.max(Space_width,Space_height)/800);
        for (var i = 0; i < diamond_stars_num; i++)
        {
            // 위치
            var left = irandom_range(0, 1000) / 10;
            var top = irandom_range(0, 1000) / 10;

            // 크기
            var size = 12*irandom_range(60, 130) / 100;
            
            // 각도
            var angle = irandom_range(0, 359);
            
            // 도형 모양 랜덤 선택
            var shape = diamond_stars_shape_info[irandom_range(0, diamond_stars_shape_info.length - 1)];
            
            // 별들 반짝거림 효과가 동시에 반짝거리지 않도록 딜레이 적용
            var delay = (irandom_range(0, 270) / 100).toFixed(2); // 0.00 ~ 2.70초 랜덤

            var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("class", "diamond-star");
            svg.setAttribute("style","left : " + left + "%; top : " + top + "%; width : " + size + "px; height : " + size + "px; transform : rotate(" + angle + "deg); animation-delay : " + delay + "s;");
            svg.setAttribute("viewBox", "0 0 32 32");

            var poly1 = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            poly1.setAttribute("points", shape.points1);
            poly1.setAttribute("fill", "#e9e7ea");
            svg.appendChild(poly1);

            var poly2 = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            poly2.setAttribute("points", shape.points2);
            poly2.setAttribute("fill", "#e9e7ea");
            svg.appendChild(poly2);

            spaceBackground.appendChild(svg);
        }

        
        //원형 별 생성
        var cirlce_stars_num = 20*round(Math.max(Space_width,Space_height)/800);;
        for (var i = 0; i < cirlce_stars_num; i++)
        {
            var left = irandom_range(25, 975) / 10;   // 2.5~97.5%
            var top = irandom_range(25, 975) / 10;
            var size = irandom_range(10, 40) / 10;    // 1.0~4.0px
            var opacity = irandom_range(70, 95) / 100; // 0.70~0.95

            var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("class", "circle-star");
            svg.setAttribute("style", "left : " + left + "%; top : " + top + "%; width : " + size + "px; height : " + size + "px;");

            var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", (size / 2));
            circle.setAttribute("cy", (size / 2));
            circle.setAttribute("r", (size / 2));
            circle.setAttribute("fill", "#fff");
            circle.setAttribute("opacity", opacity);

            svg.appendChild(circle);
            spaceBackground.appendChild(svg);
        }

    
    debug_log("loaded!");
});


