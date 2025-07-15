// MainBackground
const mainBackground = document.querySelector('.MainBackground');
const spaceBackground = document.querySelector('.SpaceBackground');
const cameraShutterIcon = document.querySelector('.CameraShutterIcon');
const window_width = window.innerWidth;
const window_height = window.innerHeight;
var space_bg_center_x = window_width*0.5; // SpaceBackground 중심점
var space_bg_center_y = window_height*0.5;
debug_log(window_width + "x" + window_height);

// 기타 잡다한 변수 선언
var movingStars = []; // 생성된 별 요소 저장용
var diamond_stars_shape_info = [ // 다이아몬드 별 외형
        { points1 : "16,2 20,16 16,30 12,16", points2 : "2,16 16,12 30,16 16,20" },
        { points1 : "16,4 19,16 16,28 13,16", points2 : "4,16 16,13 28,16 16,19" },
        { points1 : "16,6 18,16 16,26 14,16", points2 : "6,16 16,14 26,16 16,18" }
    ];


// 모바일 체크
var isMobile = /Mobi|Android/i.test(navigator.userAgent);
debug_log("isMobile : " + isMobile);

// 모든 리소스 로드된 후 3초뒤 나머지 로드
window.addEventListener('load', () => setTimeout(loadSystems, 3000));

// load Systems
function loadSystems()
{
    //#region 로드된 요소들 css 애니메이션 재생
    mainBackground.classList.add("MainBackground--loaded");
    spaceBackground.classList.add("SpaceBackground--loaded");
    cameraShutterIcon.classList.add("CameraShutterIcon--loaded");
    //#endregion

    //#region Shutter Icon
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
    var space_width = window_width;
    var space_height = window_height;


    // 별 개수 비율 결정
    var tmp_ratio = (isMobile ? 0.15 : 1) * Math.pow(round(Math.max(space_width, space_height) / 450), 2);
    var diamond_stars_num = irandom_range(3, 7) * tmp_ratio * 0.5;
    var circle_stars_num = 20 * tmp_ratio;

    for (var i = 0; i < diamond_stars_num; i++)
    {
        create_star(true);
    }

    for (var i = 0; i < circle_stars_num; i++)
    {
        create_star(false);
    }

    // 별 위치 갱신 및 적용
    function move_stars()
    {
        var rect = spaceBackground.getBoundingClientRect();
        space_bg_center_x = rect.left + rect.width / 2;
        space_bg_center_y = rect.top + rect.height / 2;

        for (var i = 0; i < movingStars.length; i++)
        {
            var star = movingStars[i];
            var tmp_size = star.size;

            star.x += star.vx;
            star.y += star.vy;

            var check_outer_space = false;
            if (star.x <= -tmp_size * 2)
            {
                star.x = window_width + tmp_size * 2;
                check_outer_space = true;
            }
            else if (star.x >= window_width + tmp_size * 2)
            {
                star.x = -tmp_size * 2;
                check_outer_space = true;
            }
            if (star.y <= -tmp_size * 2)
            {
                star.y = window_height + tmp_size * 2;
                check_outer_space = true;
            }
            else if (star.y >= window_height + tmp_size * 2)
            {
                star.y = -tmp_size * 2;
                check_outer_space = true;
            }

            var rel_x = star.x - space_bg_center_x + rect.width / 2;
            var rel_y = star.y - space_bg_center_y + rect.height / 2;

            if (check_outer_space) debug_log("star repos : " + rel_x + "," + rel_y);

            star.el.style.left = rel_x + "px";
            star.el.style.top = rel_y + "px";
        }
        requestAnimationFrame(move_stars);
    }

    move_stars();
    //#endregion
    
    
    //#region 포토 카드 모양 생성
    create_photo_card("imgs/project_wak_preview.mp4", "ProjectName", "20xx.xx.xx");
    //#endregion

    debug_log("loaded!");
    debug_log("starsnum : " + movingStars.length);
}




//#region Scripts

    // 별 생성 script function
    function create_star(star_type)
    {
        // 별 생성 반경
        var radius = 500 * (isMobile ? 0.7 : 1);
        var left = space_bg_center_x + irandom_range(-radius, radius);
        var top = space_bg_center_y + irandom_range(-radius, radius);
        debug_log("star start pos : " + left + "," + top);

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        if (star_type)
        {
            var size = (isMobile ? 2 : 1) * 12 * irandom_range(60, 130) / 100;
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

            // 각도 및 속도를 통한 x, y 벡터 구하기
            var speed = irandom_range(1, 50) / 1000;
            var dir = irandom_range(0, 359) * Math.PI / 180;
            var [vx, vy] = get_speed_by_direction(dir, speed);

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
            var size = (isMobile ? 2 : 1) * irandom_range(10, 25) / 10;
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

            var speed = irandom_range(1, 50) / 1000;
            var dir = irandom_range(0, 359) * Math.PI / 180;
            var [vx, vy] = get_speed_by_direction(dir, speed);

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
    
    
    // 포토 카드 생성 script function
    function create_photo_card(src, cardname, carddate)
    {
        // PhotoCard(parents)
        var card = document.createElement('div');
        card.className = 'PhotoCard';

        // PhotoCardOuter
        var outer = document.createElement('div');
        outer.className = 'PhotoCardOuter';

        // PhotoCardTitle
        var title = document.createElement('div');
        title.className = 'PhotoCardTitle';
        title.textContent = cardname; // 사용자가 전달한 타이틀

        // PhotoCardDate
        var date = document.createElement('div');
        date.className = 'PhotoCardDate';
        date.textContent = carddate; // 사용자가 전달한 날짜

        outer.appendChild(title);
        outer.appendChild(date);
        card.appendChild(outer);

        // PhotoCardInner--outline
        var  outline = document.createElement('div');
        outline.className = 'PhotoCardInner--outline';
        card.appendChild(outline);

        // PhotoCardInner(video)
        const video = document.createElement('video');
        video.className = 'PhotoCardInner';
        video.src = src;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        card.appendChild(video);
        
        //create a full element
        document.body.appendChild(card);
        
        debug_log("card");
        return card;
    }
//#endregion




// 우주배경 테스트용
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


// PhotoCard 테스트용
document.addEventListener('click', function(event) {
  const card = document.querySelector('.PhotoCard');
  if (!card) return;

  // 마우스 좌표 얻기
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // 요소를 마우스 위치의 중앙에 맞춰 이동
  card.style.left = mouseX + 'px';
  card.style.top = mouseY + 'px';
});