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