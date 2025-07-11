// 모든 리소스(이미지, 비디오 등)가 로드된 후 실행
window.addEventListener('load', function() 
{
    // MainBackground 클래스를 가진 div 요소 선택
    var mainBackground = document.querySelector('.MainBackground');
    mainBackground.classList.add('loaded');
});
