import './library/jquery.js';

$.ajax({
    type: "get",
    url: "../interface/getData.php",
    dataType: "json",
    success: function(res) {
        let temp = '';
        res.forEach((elm, i) => {
            let picture = JSON.parse(elm.picture);
            console.log(picture[0].src);
            temp += `
            <li id="brick-item_1" class="brick-item">
            <a href="./物品.html?id=${elm.id}">
                <div class="picture">
                    <img src="../${picture[0].src}" alt="">
                </div>
                <h3 class="title">${elm.title}</h3>
                <p class="desc">${elm.details}</p>
                <p class="price">${elm.price}<span>元起</span></p>
            </a>
        </li>`


            //     `<li class="brick-item">
            //     <a href="./product.html?id=${elm.id}">
            //         <div class="picture">
            //             <img src="../${picture[0].src}" alt="">
            //         </div>
            //         <h3 class="title">
            //             ${elm.title.slice(0,60)+' ...'}
            //         </h3>
            //         <p class="desc">${elm.details}</p>
            //         <p class="price">${elm.price}元起</p>
            //     </a>
            // </li>`;



        });

        $('#brick-list').append(temp);
    }
});