// MainBackground
const mainBackground = document.querySelector('.MainBackground');


// 모든 리소스 로드된 후 실행
window.addEventListener('load', function() 
{
    // 배경색을 변경하는 클래스 추가
    mainBackground.classList.add('MainBackground--loaded');
    
    debug_log("loaded!");
});
