$(document).ready(async() => {
    let footerContent = await getFooterContent();

    document.getElementById('footer-left').innerHTML = footerContent.left;
    document.getElementById('footer-right').innerHTML = footerContent.right;
});

function getFooterContent(){
    return new Promise(resolve => {
        $.ajax({
            url: 'dependencies/footer.json',
            success: function (data){
                resolve(data);
            }
        });
    });
}