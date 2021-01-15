import './library/jquery.js';
import { cookie } from './library/cookie.js';

let id = location.search.split('=')[1];

$.ajax({
    type: "get",
    url: "../interface/getItem.php",
    data: {
        id: id
    },
    dataType: "json",
    success: function(res) {
        let picture = JSON.parse(res.picture);

        let temp = `
        <div class="data-img">
            <img src="../${picture[1].src}">
        </div>
        <div class="data-text">
            <h2 class="data-title">${res.title}</h2>
            <p class="data-particulars">${res.particulars}</p>
            <div class="p-num">
                 库存:${res.num}
            </div>
            <div class="data-price">
                ${res.price}<span>元</span>
            </div>
            <div class="selected">
                <div>${res.details}</div> 
            </div>
            <div class="rr">
                <input type="number" value="1" min="1" max="${res.num}" id="num">
                <input type="button" value="加入购物车" id="addItem">
            </div>
        </div>
        `
        let temp1 = `
            <h2 class="hair">${res.title}</h2>
        `

        let temp2 = `
                    <span>|</span>
                    <a href="">${res.title}</a>
        `


        $('.nm').append(temp1);
        $('.left').append(temp2);
        $()
        $('.st').append(temp).find('#addItem').on('click', function() {
            addItem(res.id, res.price, $('#num').val());
        });
    }
});


function addItem(id, price, num) {
    let shop = cookie.get('shop'); // 获得cookie数据
    let product = {
        id,
        price,
        num
    };

    if (shop) { // 判断购物车是否有添加过数据
        shop = JSON.parse(shop); //将JSON字符串转回数组

        // 判断购物车中是否存在该商品
        if (shop.some(elm => elm.id == id)) {
            // 修改数量
            shop.forEach(el => {
                el.id == id ? el.num = num : null;
            });
        } else {
            shop.push(product);
        }

    } else {
        shop = []; // 初始没有数据 初始化一个空数组
        shop.push(product); // 将第一个商品添加进数组
    }
    cookie.set('shop', JSON.stringify(shop), 1);
}