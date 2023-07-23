//---------------DOM Events-----------------
// 1. Attribute events
// 2. Assign event using the element node: Gán sự kiện qua element Node
var h1Element = document.querySelectorAll('.assign');

//Cách tự làm
h1Element.forEach((element) => {
    element.onclick = function(){
        console.log(element.innerText);
    };
});
//Cách F8
for (var i = 0; i<h1Element.length; ++i){
    h1Element[i].onclick = function(event){
        console.log(event); //In ra xem trong event có những method gì
        console.log(event.target); //trả về cái element đã click vào bằng target 
        console.log(event.target.style);
    };
};

//VD sử dụng DOM Event trong thực tế
// 1. input / select : Lấy ra value những thẻ input
// 2. Key up / down: Xử lí khi bấm phím

var inputElement = document.querySelector('input[type="text"]');
inputElement.onchange = function(e){ //onchange là khi mà có sự thay đổi value mới hiển thị, thực thi
    //ban đầu thẻ input ko có gì nhập 123 thì phải click chuột ra ngoài mới thực thi onchange
    console.log(e.target.value);
}

//Nếu muốn gõ tới đâu thay đổi tới đó thì thay bằng sự kiện oninput
inputElement.oninput = function(e){
    console.log(e.target.value);
}

//Lấy trạng thái check chưa check
var checkboxElement = document.querySelector('input[type="checkbox"]');
var isCheck;
checkboxElement.onchange = function(e){
    isCheck = e.target.checked;
}

//Kiểm tra combo box trang có giá trị bao nhiêu
var selectElement = document.querySelector('select');
var value;
selectElement.onchange = function(e){
    value = e.target.value; // ở đây sẽ nhận giá trị trong value = "" 
}

//Keydown sự kiện nhấn bàn phím
//Phân biệt keyup và keydown: keyup là sẽ bị chậm 1 nhịp ví dụ nhập a xong phải nhập thêm 1 lần nữa mới nhận a
// còn keyup là khi nhấc phím lên thì sẽ nhận sự kiện liền
var keydownElement = document.querySelector('.keydown');
keydownElement.onkeyup = function(e){
    // console.log(e.target.value);
    console.log(e.which);
    // Cách xác định bấm 1 phím trên máy bằng event.which sẽ ra số tương ứng với nút đó
    switch(e.which){
        case 27: //đây là nút esc
            console.log('Nút esc');
            break;
        case 49:
            console.log('Số 1');
            break;
        case 50:
            console.log('Số 2');
            break;
        case 51:
            console.log('Số 3');
            break;
    }
}

//Lắng nghe phím ở cả website luôn chứ không cần phải chỉ ô input
//onkeypress có thể nhấn giữu
//2023: thì keyCode và which đã k còn sử dụng thay vào đó ta dùng code hoặc key để xem nút
document.onkeydown = function(e){
    console.log(e)
    switch(e.code){
        case 'KeyT': //đây là nút esc
            console.log('Nút T');
            break;
        case 'Escape':
            console.log('Nút esc');
            break;
        case 'KeyI':
            console.log('chữ I');
            break;
        case 'Digit1':
            console.log('Số 1');
            break;
    }
}

//1. preventDefault: ngăn chặn hành vi mặc định của trình duyệt
//2. stopPropagation: loại bỏ sự kiện nổi bọt

//Bài toán: link có chữ f8 thì mới chuyển trang còn ko có thì ko làm gì cả
var aElement = document.links;//lấy tất cả thẻ a hoặc có thể lấy bằng anchors nhưng phải đặt name cho thẻ a
for (var i = 0; i<aElement.length; ++i){
    aElement[i].onclick = function(e){
        if(!e.target.href.startsWith('https://f8.edu.vn')){ //startsWith trog ES6 để ktra 1 chuỗi
            e.preventDefault(); //không được di chuyển về url khác,
        }
    }
}

//Bài toán 2:
var ulElement = document.querySelector('ul');

ulElement.onmousedown = function(e){ // bắt sự kiện khi vừa nhấn chuột
    e.preventDefault();
}

ulElement.onclick = function(e){ // bắt sự kiện khi nhấn rồi thả chuột
    console.log(e.target);
}

// Sự kiện nổi bọt
var divElement = document.querySelector('div');
var buttonElement = document.querySelector('div button');
divElement.onclick = function(e){
    console.log('DIV');
}

buttonElement.onclick = function(e){
    e.stopPropagation(); //Ngăn chặn event nổi bọt từ thẻ con
    console.log('ClickMe!');
}

// Event Listener thường dùng cho nhiều sự kiện trong 1 thao tác hơn
// 1. Xử lí nhiều việc khi 1 event xảy ra
// 2. Lắng nghe / Hủy bỏ lắng nghe

//Ví dụ thực tế về việc thực hiện nhiều việc sau 1 lần thao tác
//Khi bấm bình luận: việc thứ 1: Gửi nội dung cmt lên máy chủ
//việc thứ 2: Ẩn đi giao diện bình luận, xóa bỏ cmt cũ trong ô input
//việc thứ 3: tạo 1 comment mới 

//Thực hiện nhiều việc bằng DOM event: gán 1 function cho việc click và bỏ tất cả công việc vào function đó
// Dù có tách thành nhiều function riêng nhưng vẫn phải bỏ chung vào 1 function gốc để thực thi

var buttonlistenerElement = document.getElementById('buttonevent');
buttonlistenerElement.onclick = function(e){ //onclick đang là 1 key của cái object btn hiện tại th nên có thể bị gán lại, ghi đè
    //Viec 1
    console.log('Viec 1');
    //Viec 2
    console.log('Viec 2');
    //Viec 3
    alert('Viec 3');
}

//Thực hiện lắng nghe/ hủy lắng nghe bằng DOM event:
//Bài toán là 3s đầu ko click đc 3s sau mới click bth
setTimeout(function (){
    // buttonlistenerElement.onclick = function(e){
    //     //Viec 1
    //     console.log('Viec 1');
    //     //Viec 2
    //     console.log('Viec 2');
    //     //Viec 3
    //     alert('Viec 3');
    // }
    //Ban đầu đang lắng nghe nhưng 3s sau ko muốn bấm đc nữa hủy lắng nghe
    buttonlistenerElement.onclick = function(){};
}, 3000);

//------------Event Listener-------------//
var btn = document.querySelector('#btn');

//1 việc sẽ add 1 lần nhưng vẫn sẽ thực thi theo thứ tự add
btn.addEventListener('click', function(e){// bỏ onclick thành click thôi
    console.log('Event 1');
});

btn.addEventListener('click', function(e){// bỏ onclick thành click thôi
    console.log('Event 2');
});

btn.addEventListener('click', function(e){// bỏ onclick thành click thôi
    console.log('Event 3');
});

// Hoặc cách khác là đặt function luôn cho rõ nghĩa
var viec4 = function (){
    console.log('Event 4');
}

btn.addEventListener('click', viec4);
//Sau 3s hủy lắng nghe việc 4 bằng removeEventListener
setTimeout(()=>{
    btn.removeEventListener('click', viec4);
}, 3000);

//Chung quy lại:
//------- DOM event để sử dụng khi lắng nghe 1 event đơn giản ko muốn gỡ bỏ nó đi (cú pháp đơn giản dễ code)
//------- Event Listener sử dụng khi xử lí nhiều việc khi 1 event xảy ra, bóc tách từng function ra đỡ rối
// và trường hợp phải SD listener là khi 1 event diễn ra và muốn hủy bỏ sự kiện của nó, có thể hủy bỏ cụ thể function nào