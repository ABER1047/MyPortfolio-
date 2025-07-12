// MainBackground
const mainBackground = document.querySelector(".MainBackground");
const spaceBackground = document.querySelector(".SpaceBackground");
const cameraShutterIcon = document.querySelector(".CameraShutterIcon");
const window_width = window.innerWidth;
const window_height = window.innerHeight;
var space_bg_center_x = window_width*0.5; //SpaceBackground 중심점
var space_bg_center_y = window_height*0.5;
debug_log(window_width+"x"+window_height);

//모바일 체크
var isMobile = /Mobi|Android/i.test(navigator.userAgent);
debug_log("isMobile : "+isMobile);





// 모든 리소스 로드된 후 3초뒤 나머지 로드
window.addEventListener('load', () => setTimeout(loadSystems, 3000));

// load Systems
function loadSystems()
{
    // 메인 배경색을 변경
    mainBackground.classList.add("MainBackground--loaded");

    // SpaceBackground 크기 변경
    spaceBackground.classList.add("SpaceBackground--loaded");

    // CameraShutterIcon 크기 변경
    cameraShutterIcon.classList.add("CameraShutterIcon--loaded");
    

    
    //#region Shutter Icon
    // 셔터 모양(왼쪽)
    var svgNS = "http://www.w3.org/2000/svg";
    var leftArm = document.createElementNS(svgNS, "svg");
    leftArm.setAttribute("class", "shutter-arm left");
    leftArm.setAttribute("width", "60");
    leftArm.setAttribute("height", "60");
    leftArm.setAttribute("viewBox", "0 0 60 60");
    var nLine = document.createElementNS(svgNS, "polyline");
    nLine.setAttribute("points", "10,10 10,50 50,50");
    nLine.setAttribute("class", "shutter-corner");
    leftArm.appendChild(nLine);

    // 셔터 모양(오른쪽, 좌우반전)
    var rightArm = document.createElementNS(svgNS, "svg");
    rightArm.setAttribute("class", "shutter-arm right");
    rightArm.setAttribute("width", "60");
    rightArm.setAttribute("height", "60");
    rightArm.setAttribute("viewBox", "0 0 60 60");
    var gLine = document.createElementNS(svgNS, "polyline");
    gLine.setAttribute("points", "10,10 10,50 50,50");
    gLine.setAttribute("class", "shutter-corner");
    rightArm.appendChild(gLine);

    cameraShutterIcon.appendChild(leftArm);
    cameraShutterIcon.appendChild(rightArm);
    //#endregion




    //#region SpaceBackground(stars, background... etc)
    // 별 배경 생성
    var space_width = window_width;
    var space_height = window_height;

    // 다이아몬드 별 기본 세팅값
    var diamond_stars_shape_info = [
        { points1 : "16,2 20,16 16,30 12,16", points2 : "2,16 16,12 30,16 16,20" },
        { points1 : "16,4 19,16 16,28 13,16", points2 : "4,16 16,13 28,16 16,19" },
        { points1 : "16,6 18,16 16,26 14,16", points2 : "6,16 16,14 26,16 16,18" }
    ];

    
    var movingStars = []; // 별 객체

    // 별 생성 function
    function create_star(star_type)
    {
        // 절대 px 단위 위치로 생성
        var radius = 500*(isMobile ? 0.7 : 1);
        var left = space_bg_center_x + irandom_range(0, radius)*irandom_return();
        var top = space_bg_center_y + irandom_range(0, radius)*irandom_return();
        debug_log("star start pos : "+left+","+top);

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        if (star_type)
        {
            var size = (isMobile ? 2 : 1) * 12 * irandom_range(60, 130) / 100; // 7.2~15.6px
            var angle = irandom_range(0, 359);
            var shape = diamond_stars_shape_info[irandom_range(0, diamond_stars_shape_info.length - 1)];

            svg.setAttribute("class", "diamond-star");
            svg.setAttribute("width", size);
            svg.setAttribute("height", size);
            svg.setAttribute("viewBox", "0 0 32 32");
            svg.style.left = left + "px";
            svg.style.top = top + "px";
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
            var speed = irandom_range(1, 100) / 1000; // 0.001~0.1 px/frame
            var dir = irandom_range(0, 359) * Math.PI / 180;
            var vx = Math.cos(dir) * speed;
            var vy = Math.sin(dir) * speed;

            movingStars.push({
                el : svg,
                type : "diamond",
                size : size,
                angle : angle,
                x : left,
                y : top,
                vx : vx,
                vy : vy
            });
        }
        else
        {
            var size = (isMobile ? 2 : 1) * irandom_range(10, 25) / 10; // 1.0~2.5px
            svg.setAttribute("class", "circle-star");
            svg.setAttribute("width", size);
            svg.setAttribute("height", size);
            svg.style.left = left + "px";
            svg.style.top = top + "px";
            svg.style.animationDelay = (irandom_range(0, 300) / 100) + "s";

            var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", size / 2);
            circle.setAttribute("cy", size / 2);
            circle.setAttribute("r", size / 2);
            circle.setAttribute("fill", "#fffdfe");
            circle.setAttribute("opacity", irandom_range(70, 95) / 100);
            svg.appendChild(circle);

            spaceBackground.appendChild(svg);

            // 랜덤 방향/속도
            var speed = irandom_range(1, 100) / 1000;
            var dir = irandom_range(0, 359) * Math.PI / 180;
            var vx = Math.cos(dir) * speed;
            var vy = Math.sin(dir) * speed;

            movingStars.push({
                el : svg,
                type : "circle",
                size : size,
                x : left,
                y : top,
                vx : vx,
                vy : vy
            });
        }
    }



    


    // 다이아몬드 별 생성
    var tmp_ratio = (isMobile ? 0.15 : 1) * Math.pow(round(Math.max(space_width, space_height) / 450),2);
    var diamond_stars_num = irandom_range(3, 7) * tmp_ratio*0.5;
    for (var i = 0; i < diamond_stars_num; i++)
    {
        create_star(true);
    }

    // 원형 별 생성
    var circle_stars_num = 20 * tmp_ratio;
    for (var i = 0; i < circle_stars_num; i++)
    {
        create_star(false);
    }

    // 별 위치 갱신 및 적용
    function move_stars()
    {
        // SpaceBackground의 중심 좌표 계산
        var rect = spaceBackground.getBoundingClientRect();
        space_bg_center_x = rect.left + rect.width / 2;
        space_bg_center_y = rect.top + rect.height / 2;

        for (var i = 0; i < movingStars.length; i++)
        {
            var star = movingStars[i];
            var tmp_size = star.size;

            // 별 위치 이동 (절대 좌표)
            star.x += star.vx;
            star.y += star.vy;

            // 별이 화면 밖(브라우저 기준)으로 나가면 wrap-around
            var check_outter_space = false;
            if (star.x <= -tmp_size*2)
            {
                star.x = window_width+tmp_size*2;
                check_outter_space = true;
            }
            else if (star.x >= window_width+tmp_size*2) 
            {
                star.x = -tmp_size*2;
                check_outter_space = true;
            }
            
            if (star.y <= -tmp_size*2) 
            {
                star.y = window_height+tmp_size*2;
                check_outter_space = true;
            }
            else if (star.y >= window_height+tmp_size*2) 
            {
                star.y = -tmp_size*2;
                check_outter_space = true;
            }
            
            

            // SpaceBackground 중심 기준 상대 좌표로 변환해서 별 위치 적용
            var rel_x = star.x - space_bg_center_x + rect.width / 2;
            var rel_y = star.y - space_bg_center_y + rect.height / 2;
            
            if (check_outter_space)
            {
                debug_log("star repos : "+rel_x+","+rel_y);
            }

            star.el.style.left = rel_x + "px";
            star.el.style.top = rel_y + "px";
        }
        
        
        //show_fps(true); //테스트용
        requestAnimationFrame(move_stars);
    }

    move_stars();
    //#endregion

    

    debug_log("loaded!");
    debug_log("starsnum : "+movingStars.length);
}




// 테스트용
document.body.addEventListener('wheel', onWheel);

function onWheel(e)
{
    // SpaceBackground DOM 가져오기
    var minSize = 100;
    var maxSize = 1920;

    // 현재 크기
    var size = parseInt(getComputedStyle(spaceBackground).width,10);
    debug_log("size : "+size);

    if (e.deltaY < 0)
    {
        size = Math.min(size + 100, maxSize);
    }
    else
    {
        size = Math.max(size - 100, minSize);
    }

    spaceBackground.style.width = size + "px";
    spaceBackground.style.height = size + "px";
    cameraShutterIcon.style.width = size + "px";
    cameraShutterIcon.style.height = size + "px";
}