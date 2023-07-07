console.log("script Running");

document.querySelector('.cross').style.display ='none'; 
document.querySelector('.switch').addEventListener("click", ()=>{
    //from the class sidebar while on click event remove the sidebarGo or vice versa
    document.querySelector('.sidebar').classList.toggle('sidebarGo');
    if(document.querySelector('.sidebar').classList.contains('sidebarGo')){

        document.querySelector('.menu').style.display ='inline';
        document.querySelector('.cross').style.display ='none';
       
    }
    
    else{
        setTimeout(() => {
            document.querySelector('.cross').style.display ='inline';
            
        },300);
        document.querySelector('.menu').style.display ='none';
       
       
    }
})
function getDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month.toString().length == 1) {
            month = '0' + month;
    }
    if (day.toString().length == 1) {
            day = '0' + day;
    }
    if (hour.toString().length == 1) {
            hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
            minute = '0' + minute;
    }
    if (second.toString().length == 1) {
            second = '0' + second;
    }
    var dateTime = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
    return dateTime;
}
setInterval(()=>{
    let d = getDateTime()
    let c = document.getElementById('clock')
    c.innerHTML = d
})